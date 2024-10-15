<script setup lang="ts">
definePageMeta({
  pageTransition: false
})

const tiptap = useTemplateRef('tiptap')
const hideToolbar = ref(false)
const mediaInput = ref('')
const addMediaPending = ref(false)
const editor = computed(() => tiptap.value?.editor as EditorType)

const toast = useToast()
const localePath = useLocalePath()
const { get, post, patch, del } = useApi('lessons')
const { t } = useI18n()
const savePending = ref(false)
const pendingDraft = ref(false)
const pendingVisibility = ref(false)

const documentId = computed(() => useRoute().params.id)

let { data: lesson, refresh } = await useAsyncData('lesson', () => get(documentId.value))
let { data: chapters, refresh: refreshChapters } = await useAsyncData('chapters', () => get(null, { page: 1 }, 'chapters'))

let initialContent = JSON.stringify(lesson.value?.content)

const content = computed({
  get: () => JSON.parse(lesson.value?.content || '{}'),
  set: (value) => lesson.value.content = JSON.stringify(value)
})

const isContentUnsaved = computed(() => JSON.stringify(content.value) !== initialContent)

const title = ref(lesson.value?.name),
    description = ref(lesson.value?.description)

const panelOpened = ref(false)
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
    label: title.value
  }
])

watchEffect(() => {
  links.value[2].label = title.value || 'Sans titre'
})

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
};

const options = ref([
  [{
    label: lesson.value?.draft ? 'Publier' : 'Mettre en brouillon',
    icon: 'i-heroicons-archive-box',
    click: () => {
      handleDraft()
    }
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
    icon: 'i-heroicons-trash-20-solid'
  }]
])

const selectedChapter = ref(lesson.value?.chapter || null)

const labels = computed({
  get: () => selectedChapter.value,
  set: async (label) => {
    if (label.id) return lesson = await patch({ id: documentId.value, chapter_id: label.id })

    const response = await post({ name: label.name, theme_id: 1, image: 'https://excalidraw.com/og-image-2.png' }, 'chapters')
    lesson = await patch({ id: documentId.value, chapter_id: response.id })

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

const save = async () => {
  if (!editor.value) return

  savePending.value = true

  const json = editor.value?.getJSON()

  const response = await patch({
    ...lesson.value,
    id: documentId.value,
    name: title.value,
    description: description.value,
    content: JSON.stringify(json)
  })

  savePending.value = false

  if (response) {
    lesson = response
    initialContent = JSON.stringify(lesson.value?.content)
    return toast.add({ icon: 'i-heroicons-check-circle', title: 'Leçon enregistrée avec succès', color: 'green' })
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

const addMedia = async () => {
  if (!mediaInput.value) return
  addMediaPending.value = true
  const metadata = await $fetch('/api/opengraph', {
    method: 'POST',
    body: {
      url: mediaInput.value
    }
  })

  if (metadata) {
    const response = await post({
        lesson_id: documentId.value,
        title: metadata.title || metadata.site_title || '',
        description: metadata.description || metadata.site_description || '',
        image: metadata.image || '',
        url: mediaInput.value,
        type: 'link'}, 'media')

    if (response) {
      await refresh()
      toast.add({ icon: 'i-heroicons-check-circle', title: 'Média ajouté avec succès', color: 'green' })
      mediaInput.value = ''
      return addMediaPending.value = false
    }

    toast.add({ icon: 'i-heroicons-x-circle', title: 'Erreur lors de l\'ajout du média', color: 'red' })
    return addMediaPending.value = false
  }

  toast.add({ icon: 'i-heroicons-x-circle', title: 'Erreur lors de la récupération des métadonnées', color: 'red' })
  return addMediaPending.value = false
}

const deleteMedia = async (id) => {
  const response = await del(id, 'media')

  if (response) {
    lesson.medias = lesson.medias.filter(media => media.id !== id)
    return toast.add({ icon: 'i-heroicons-check-circle', title: 'Média supprimé avec succès', color: 'green' })
  }

  return toast.add({ icon: 'i-heroicons-x-circle', title: 'Erreur lors de la suppression du média', color: 'red' })
}
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
          <template v-if="lesson.chapter?.lessons_count">
            <p class="pr-1.5 tracking-wider text-sm">{{ lesson.order + 1 }}/{{ lesson.chapter.lessons_count }}</p>
            <UButton :disabled="(lesson.order + 1) === 1" @click="goPrevLesson" size="2xs" variant="solid" :color="(lesson.order + 1) === 1 ? 'white' : 'primary'" square>
              <UIcon name="i-heroicons-chevron-left" />
            </UButton>
            <UButton :disabled="(lesson.order + 1) === lesson.chapter.lessons_count" @click="goNextLesson" size="2xs" variant="solid" :color="(lesson.order + 1) === lesson.chapter.lessons_count ? 'white' : 'primary'" square>
              <UIcon name="i-heroicons-chevron-right" />
            </UButton>
          </template>
          <div class="border-l border-gray-200 dark:border-gray-500 pl-2.5 ml-2 flex items-center h-full cursor-pointer">
            <UIcon @click="panelOpened = !panelOpened" dynamic :name="`i-fluent-panel-right-32-${panelOpened ? 'filled' : 'regular'}`" class="w-4 h-4 text-gray-500 dark:text-gray-200" />
          </div>
        </div>
      </template>
    </UDashboardNavbar>

    <UDashboardPanelContent v-if="lesson" :ui="{ wrapper: 'p-0' }">
      <div contenteditable @input="title = $event.target.innerText" data-placeholder="Titre de la leçon" class="empty:before:content-['Titre de la leçon'] empty:before:pointer-events-none empty:before:text-[#adb5bd] font-bold px-4 lg:px-[calc((100%_-_(750px))_/_2)] mt-[25px] mb-5 text-3xl tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl outline-none ring-none" @keydown="handleTitleKeyDown">
        {{ title }}
      </div>

      <LeazyEditor ref="tiptap" v-model="content" :hide-toolbar="hideToolbar" class="flex-1" max-width="800" />
    </UDashboardPanelContent>

    <UDashboardToolbar :ui="{ wrapper: 'bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-10', left: 'items-center gap-2 relative' }">
      <template v-if="editor" #left>
        <UCheckbox v-model="hideToolbar" label="Cacher les options" class="cursor-pointer" name="hideToolbar" />

        <UDivider orientation="vertical" class="h-4" />

        <p class="text-sm">{{ new Intl.NumberFormat('fr-FR').format(editor.storage.characterCount.words()).replace(/\s/g, '&nbsp;') }} mots</p>
      </template>

      <template #right>
        <UButton :disabled="!isContentUnsaved" @click="save" :loading="savePending" icon="i-heroicons-check" :label="isContentUnsaved ? 'Enregistrer' : 'Enregistré'" />
      </template>
    </UDashboardToolbar>
  </UDashboardPanel>

  <USlideover v-model="panelOpened" side="right" :overlay="false" :ui="{ wrapper: 'top-[--header-height] h-[calc(100vh-var(--header-height))]', width: 'max-w-max' }">
    <UDashboardSidebar class="max-w-72 border-l border-gray-200 dark:border-gray-800" :ui="{ container: 'text-sm', body: 'gap-4', footer: 'grid grid-cols-2 gap-2' }">
      <template #header>
        <UIcon @click="panelOpened = false" name="i-heroicons-x-mark" class="w-4 h-4 text-gray-600 ml-auto cursor-pointer" />
      </template>
      <template #default>
        <div class="grid grid-cols-2 gap-2">
          <UFormGroup label="Publier/Brouillon">
            <UButton block icon="i-heroicons-pencil-square" :loading="pendingDraft" :label="lesson.draft ? 'Publier' : 'Brouillon'" :color="lesson.draft ? 'green' : 'orange'" size="xs" variant="soft" @click="handleDraft" />
          </UFormGroup>

          <UFormGroup label="Publique/Privée">
            <UButton block :icon="lesson.private ? 'i-heroicons-eye' : 'i-heroicons-eye-slash'" :loading="pendingVisibility" :label="lesson.private ? 'Publique' : 'Privée'" :color="lesson.private ? 'green' : 'orange'" size="xs" variant="soft" @click="handleVisibility" />
          </UFormGroup>
        </div>

        <UFormGroup label="Titre">
          <UInput v-model="title" placeholder="Titre de la leçon" variant="outline" padded />
        </UFormGroup>

        <UFormGroup label="Description">
          <UTextarea v-model="description" placeholder="Description de la leçon" variant="outline" padded />
        </UFormGroup>

        <UFormGroup label="Chapitre associé">
          <ClientOnly>
            <USelectMenu
                v-model="labels"
                by="id"
                name="labels"
                :options="chapters"
                option-attribute="name"
                searchable-placeholder="Rechercher un chapitre"
                searchable
                creatable
                clear-search-on-close
            >
              <template #option="{ option }">
                <span class="truncate">{{ option.name }}</span>
              </template>

              <template #option-create="{ option }">
                <UIcon name="i-heroicons-plus" class="w-4 h-4" />
                <span class="block truncate">{{ option.name }}</span>
              </template>
            </USelectMenu>
          </ClientOnly>
        </UFormGroup>

        <UAccordion :items="[{ label: `Médias associés (${lesson?.medias?.length ?? 0})` }]" :ui="{ wrapper: 'mt-2 flex-1 overflow-hidden max-w-[287px] w-full', container: 'overflow-y-auto', item: { padding: 'pt-2.5' } }">
          <template #item>
            <UBlogList orientation="horizontal" :ui="{ wrapper: 'overflow-y-auto gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2' }">
              <ClientOnly>
                <UPopover :ui="{ trigger: 'h-full', base: 'flex gap-1 p-1' }">
                  <div class="rounded-lg border border-solid dark:border-gray-700 flex flex-col items-center justify-center p-2 text-xs">
                    <UIcon name="i-heroicons-plus" class="w-6 h-6" />
                    <p>Ajouter un média</p>
                  </div>

                  <template #panel>
                    <UInput placeholder="Insérer une URL" v-model="mediaInput" size="xs" @keyup.enter="addMedia" />
                    <UButton @click="addMedia" size="xs" :loading="addMediaPending" trailing-icon="i-heroicons-chevron-right-20-solid" square />
                  </template>
                </UPopover>
              </ClientOnly>
              <UBlogPost v-for="(item, index) in lesson.medias" :key="index" :ui="{ wrapper: 'gap-y-0.5', title: 'text-sm', date: 'text-xs', authors: { wrapper: 'mt-0' }, image: { wrapper: 'pointer-events-auto' } }">
                <template #image>
                  <img @click="imgOpened = true; currentMedia = { src: item.image, label: item.title }" class="cursor-pointer block object-cover object-top w-full h-full transform transition-transform duration-200 hover:scale-105" :src="item.image" :alt="item.title">
                </template>
                <template #default>
                  <div class="flex items-center justify-between">
                    <div>
                      <h2 class="text-gray-900 dark:text-white font-semibold group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200 text-xs line-clamp-1">
                        {{ item.title }}
                      </h2>
                      <p class="text-gray-400 text-[10px] line-clamp-1">
                        {{ item.description }}
                      </p>
                    </div>
                    <UDropdown :ui="{ item: { size: 'text-xs' }, width: 'w-auto' }" :items="[[{ label: 'Renommer', icon: 'i-heroicons-pencil-square' }, { label: 'Supprimer', icon: 'i-heroicons-trash', color: 'red', click: () => deleteMedia(item.id) }]]" :popper="{ placement: 'bottom-end' }">
                      <UButton icon="i-heroicons-ellipsis-vertical" variant="link" size="xs" :padded="false" />
                    </UDropdown>
                  </div>
                </template>
              </UBlogPost>
            </UBlogList>
          </template>
        </UAccordion>
      </template>

      <template #footer>
        <UButton :disabled="!isContentUnsaved" @click="save" :loading="savePending" icon="i-heroicons-check" :label="isContentUnsaved ? 'Enregistrer' : 'Enregistré'" />
        <UDropdown :items="options" :ui="{ item: { size: 'text-xs' }, width: 'w-auto' }" :popper="{ placement: 'top-end' }">
          <UButton block icon="i-heroicons-bolt" trailing-icon="i-heroicons-ellipsis-vertical" color="gray" label="Actions" />
        </UDropdown>
      </template>
    </UDashboardSidebar>
  </USlideover>
</template>
