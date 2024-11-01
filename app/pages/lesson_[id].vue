<script setup lang="ts">
import { LessonsDeleteLessonModal, LessonsMediaSlideover, LessonsCommentsSlideover } from '#components'
import { isEqual } from 'lodash'

definePageMeta({
  pageTransition: false
})

const modal = useModal()
const toast = useToast()
const localePath = useLocalePath()
const { t } = useI18n()
const { get, post, patch } = useApi('lessons')
const slideover = useSlideover()
const tiptap = useTemplateRef('tiptap')
const hideToolbar = ref(false)
const editor: EditorType = computed(() => tiptap.value?.editor)

const pending = ref(false)
const loading = ref(false)
const pendingDraft = ref(false)
const pendingVisibility = ref(false)
const unsavedChanges = ref(false)
const showBackground = ref(false)
const titleError = ref(false)

const documentId = computed(() => useRoute().params.id)

const { data: lesson, refresh } = await useAsyncData('lesson', () => get(documentId.value))

const initialName = lesson.value?.name
const initialDescription = lesson.value?.description
let initialContent = JSON.parse(lesson.value?.content)
const showDescription = ref(lesson.value?.description)

const content = computed({
  get: () => JSON.parse(lesson.value?.content || '{}'),
  set: (value) => lesson.value.content = JSON.stringify(value)
})

const links = ref([
  {
    label: t('drawer.library.label'),
    to: localePath({ name: 'library' })
  },
  {
    label: t('drawer.library.lessons'),
    to: localePath({ name: 'library-lessons' })
  },
  {
    label: lesson.value?.name
  }
])

const search = async (q: string) => {
  if (loading.value) return

  loading.value = true

  const items: any[] = await get(null, { q }, 'chapters')

  loading.value = false

  return 'data' in items ? items.data : items
}

const handleTitleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
  if (event.shiftKey) return

  if (event.key === 'Enter') editor.value?.commands.focus()

  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    const selection = window.getSelection()

    if (selection?.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const { endOffset } = range

      const textContent = event.currentTarget.textContent || ''

      if (endOffset >= textContent.length) {
        editor.value?.commands.focus('start')

        event.preventDefault()
      }
    }
  }
}

const options = ref([
  [{
    id: 'hide-toolbar',
    label: 'Cacher le menu',
    icon: 'i-heroicons-eye-slash',
    type: 'toggle'
  }, {
    id: 'draft',
    label: 'Brouillon',
    icon: 'i-fluent-drafts-20-regular',
    type: 'toggle'
  }, {
    id: 'private',
    label: 'Privée',
    icon: 'i-heroicons-lock-closed',
    type: 'toggle'
  }, {
    label: 'Dupliquer',
    icon: 'i-heroicons-document-duplicate-20-solid'
  }], [{
    label: 'Importer',
    icon: 'i-heroicons-arrow-down-tray'
  }, {
    label: 'Exporter en PDF',
    icon: 'i-heroicons-document'
  }, {
    label: 'Exporter en HTML',
    icon: 'i-heroicons-cursor-arrow-rays'
  }, {
    label: 'Imprimer',
    icon: 'i-heroicons-printer',
    click: () => {
      editor.value?.commands.print()
    }
  }], [{
    label: 'Supprimer',
    icon: 'i-heroicons-trash-20-solid',
    click: () => handleDelete()
  }], [{
    slot: 'words',
    label: '',
    disabled: true
  }, {
    slot: 'last-edited',
    label: '',
    disabled: true
  }]
])

const selectedChapter = computed({
  get: () => lesson.value?.chapter,
  set: (value) => lesson.value.chapter = value
})

const chapter = computed({
  get: () => selectedChapter.value,
  set: async (label) => {
    if (label.id) {
      await patch({ id: documentId.value, chapter_id: label.id })
      return refresh()
    }

    const response = await post({ name: label.name, theme_id: 1, image: 'https://excalidraw.com/og-image-2.png' }, 'chapters')
    const lessonResponse = await patch({ id: documentId.value, chapter_id: response.id })

    if (lessonResponse) await refresh()

    return selectedChapter.value = response
  }
})

const goPrevLesson = async () => {
  const response = await get(`${lesson.value?.chapter.id}/previous?current_order=${lesson.value?.order}`)
  await navigateTo(localePath({ name: 'lesson_id', params: { id: response.id } }))
}

const goNextLesson = async () => {
  const response = await get(`${lesson.value?.chapter.id}/next?current_order=${lesson.value?.order}`)
  await navigateTo(localePath({ name: 'lesson_id', params: { id: response.id } }))
}

const save = async (auto: boolean = false) => {
  if (!editor.value || !unsavedChanges.value) return
  if (!lesson.value.name) return titleError.value = true
  if (titleError.value) titleError.value = false

  pending.value = true

  const json = editor.value?.getJSON()

  const response = await patch({
    ...lesson.value,
    id: documentId.value,
    name: lesson.value?.name,
    description: lesson.value?.description,
    content: JSON.stringify(json)
  })

  pending.value = false

  if (response) {
    initialContent = JSON.parse(lesson.value?.content)
    unsavedChanges.value = false
    if (!auto) return toast.add({ icon: 'i-heroicons-check-circle', title: 'Leçon enregistrée avec succès', color: 'green' })
  }
}

const handleDraft = async () => {
  pendingDraft.value = true
  const response = await patch({ id: documentId.value, draft: !lesson.value?.draft })

  if (response) {
    toast.add({ icon: 'i-heroicons-check-circle', title: `Leçon ${lesson.value?.draft ? 'publiée' : 'mise en brouillon'} avec succès`, color: 'green' })
    await refresh()
    return pendingDraft.value = false
  }

  toast.add({ icon: 'i-heroicons-x-circle', title: `Erreur lors de la ${lesson.value?.draft ? 'publication' : 'mise en brouillon'} de la leçon`, color: 'red' })
  return pendingDraft.value = false
}

const handleVisibility = async () => {
  pendingVisibility.value = true
  const response = await patch({ id: documentId.value, private: !lesson.value?.private })

  if (response) {
    toast.add({ icon: 'i-heroicons-check-circle', title: `Leçon ${lesson.value?.private ? 'rendu publique' : 'rendu privée'} avec succès`, color: 'green' })
    await refresh()
    return pendingVisibility.value = false
  }

  toast.add({ icon: 'i-heroicons-x-circle', title: `Erreur lors de la ${lesson.value?.private ? 'mise en publique' : 'mise en privée'} de la leçon`, color: 'red' })
  return pendingVisibility.value = false
}

const onUpdate = (content) => {
  unsavedChanges.value = !isEqual(content, initialContent)
}

const handleDelete = () => {
  modal.open(LessonsDeleteLessonModal, {
    lesson: lesson.value,
    redirect: true,
    onClose: () => modal.close()
  })
}

const handleSlideover = () => {
  slideover.open(LessonsMediaSlideover, {
    medias: lesson.value?.medias,
    overlay: false
  })
}

const handleComments = () => {
  slideover.open(LessonsCommentsSlideover, {
    lesson: lesson.value,
    overlay: false
  })
}

const onUpdateTitle = (event: InputEvent) => {
  lesson.value.name = (event.target as HTMLDivElement).innerText
  unsavedChanges.value = lesson.value.name !== initialName
}

const onUpdateDescription = (event: InputEvent) => {
  lesson.value.description = (event.target as HTMLDivElement).innerText
  unsavedChanges.value = lesson.value.description !== initialDescription
}

const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  if (unsavedChanges.value) {
    event.returnValue = 'Vous avez des modifications non enregistrées. Êtes-vous sûr de vouloir quitter ?'
    save()
  }
  else delete event.returnValue
}

onBeforeMount(() => {
  window.addEventListener('beforeunload', handleBeforeUnload)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})
</script>

<template>
  <UDashboardPanel grow>
    <UDashboardNavbar>
      <template #title>
        <ToggleDrawer />
        <UBreadcrumb divider="/" :links="links" :ui="{ active: 'truncate w-full max-w-32' }" />
      </template>

      <template #badge>
        <ClientOnly>
          <UPopover :popper="{ placement: 'bottom-end' }">
            <UBadge variant="subtle" size="xs" :color="lesson.draft ? 'orange' : 'green'">
              {{ lesson.draft ? 'Brouillon' : 'Publié' }}
              <UIcon name="i-heroicons-chevron-down-20-solid" class="w-4 h-4" />
            </UBadge>

            <template #panel>
              <div class="flex items-center justify-center">
                <UButton icon="i-heroicons-pencil-square" :label="lesson.draft ? 'Publier' : 'Mettre en brouillon'" color="gray" size="2xs" variant="ghost" @click="handleDraft" />
              </div>
            </template>
          </UPopover>
        </ClientOnly>
      </template>

      <template #right>
        <div class="flex items-center justify-end gap-1">
          <UButton @click="save" size="xs" :disabled="!unsavedChanges" :loading="pending" variant="soft" :label="unsavedChanges ? 'Enregistrer' : 'Enregistré'" :icon="unsavedChanges ? 'i-lucide-save' : 'i-heroicons-check'" :color="unsavedChanges ? 'primary' : 'white'" />

          <template v-if="lesson.chapter?.lessons_count">
            <div class="flex items-center gap-1">
              <p class="pr-1.5 tracking-wider text-sm">{{ lesson.order + 1 }}/{{ lesson.chapter.lessons_count }}</p>
              <UTooltip text="Leçon précédente" :popper="{ placement: 'bottom' }">
                <UButton icon="i-heroicons-chevron-left-20-solid" :disabled="(lesson.order + 1) === 1" @click="goPrevLesson" size="sm" variant="solid" :color="(lesson.order + 1) === 1 ? 'white' : 'primary'" :padded="false" square />
              </UTooltip>
              <UTooltip text="Leçon suivante" :popper="{ placement: 'bottom' }">
                <UButton icon="i-heroicons-chevron-right-20-solid" :disabled="(lesson.order + 1) === lesson.chapter.lessons_count" @click="goNextLesson" size="sm" variant="solid" :color="(lesson.order + 1) === lesson.chapter.lessons_count ? 'white' : 'primary'" :padded="false" square />
              </UTooltip>
            </div>
          </template>

          <UTooltip text="Commentaires" :popper="{ placement: 'bottom' }">
            <UButton @click="handleComments" icon="i-lucide-message-square-text" variant="ghost" color="gray" :square />
          </UTooltip>

          <UTooltip text="Médias associés" :popper="{ placement: 'bottom' }">
            <UButton @click="handleSlideover" icon="i-lucide-image-play" variant="ghost" color="gray" :square />
          </UTooltip>
          <ClientOnly>
            <UDropdown :items="options" :popper="{ placement: 'bottom-start' }" :ui="{ item: { disabled: 'cursor-text select-text' } }">
              <UButton color="gray" variant="ghost" trailing-icon="i-heroicons-ellipsis-horizontal-20-solid" />

              <template #item="{ item }">
                <UIcon :name="item.icon" class="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-gray-500" />
                <span class="truncate">{{ item.label }}</span>
                <template v-if="item.type === 'toggle'">
                  <UToggle v-if="item.id === 'hide-toolbar'" v-model="hideToolbar" class="ms-auto" size="sm" />
                  <UToggle v-else-if="item.id === 'draft'" @change="handleDraft" :model-value="lesson.draft" class="ms-auto" size="sm" :loading="pendingDraft" />
                  <UToggle v-else-if="item.id === 'private'" @change="handleVisibility" :model-value="lesson.private" class="ms-auto" size="sm" :loading="pendingVisibility" />
                </template>
              </template>
              <template #words>
                <p class="text-xs">Nombre de mots :{{ new Intl.NumberFormat('fr-FR').format(editor.storage.characterCount.words()).replace(/\s/g, '&nbsp;') }}</p>
              </template>
              <template #last-edited>
                <p class="text-xs text-left">Dernière modification : {{ new Date(lesson.updated_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric' }) }}</p>
              </template>
            </UDropdown>
          </ClientOnly>
        </div>
      </template>
    </UDashboardNavbar>

    <UDashboardPanelContent v-if="lesson" :ui="{ wrapper: 'p-0' }">
      <div v-if="showBackground" class="p-4 pb-0 aspect-[16/2.5] opacity-50">
        <NuxtImg src="https://www.notion.so/images/page-cover/gradients_5.png" alt="Discord" class="aspect-[16/2.5] w-full h-full rounded-xl" />
      </div>

      <div class="pt-8 lg:px-[calc((100%_-_(750px))_/_2)]">
        <div class="flex items-center gap-2 mb-4">
          <ClientOnly>
            <USelectMenu
              v-model="chapter"
              by="id"
              name="chapter"
              :searchable="search"
              option-attribute="name"
              searchable-placeholder="Rechercher un chapitre"
              placeholder="Sélectionner un chapitre"
              searchable
              creatable
              trailing
              clear-search-on-close
              :searchable-lazy="true"
              :loading
            >
              <UButton :label="selectedChapter.name" size="xs" leading-icon="i-lucide-notebook-text" trailing-icon="i-heroicons-chevron-down-20-solid" color="gray" variant="ghost" />

              <template #option="{ option }">
                <span class="truncate">{{ option.name }}</span>
              </template>

              <template #option-create="{ option }">
                <UIcon name="i-heroicons-plus" class="w-4 h-4" />
                <span class="block truncate">{{ option.name }}</span>
              </template>
            </USelectMenu>
          </ClientOnly>
          <UButton v-if="!showDescription" @click="showDescription = true" label="Ajouter une description" size="xs" leading-icon="i-lucide-text" color="gray" variant="ghost" />
          <UButton v-if="!showBackground" label="Ajouter une couverture" @click="showBackground = true" size="xs" leading-icon="i-lucide-image" color="gray" variant="ghost" />
        </div>
        <div
          contenteditable
          @input="onUpdateTitle"
          data-placeholder="Titre de la leçon"
          class="inline-block w-full placeholder font-bold mb-5 text-3xl whitespace-pre-wrap tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl outline-none ring-none"
          :class="{ 'empty:before:!text-red-400': titleError }"
          @keydown="handleTitleKeyDown"
          @blur="save(true)"
        >
          {{ lesson.name }}
        </div>
        <UTextarea v-if="showDescription" v-model="lesson.description" placeholder="Description de la leçon" variant="outline" @input="onUpdateDescription" @blur="save(true)" padded />
      </div>

      <LeazyEditor ref="tiptap" v-model="content" output="json" :hide-toolbar="hideToolbar" class="flex-1" max-width="800" @update:model-value="onUpdate" @blur="save(true)" />
    </UDashboardPanelContent>
  </UDashboardPanel>
</template>

<style scoped>
.placeholder:empty:before {
  content: attr(data-placeholder);
  pointer-events: none;
  color: #adb5bd;
}
</style>