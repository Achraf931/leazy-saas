<script lang="ts" setup>
import {
  CommonsModalLibrary,
  LessonsCommentsSlideover,
  LessonsDeleteLessonModal,
  LessonsMediaSlideover
} from '#components'
import { isEqual } from 'lodash-unified'

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
const editor = computed(() => tiptap.value?.editor)

const pending = ref(false)
const loading = ref(false)
const pendingDraft = ref(false)
const pendingVisibility = ref(false)
const pendingNavigateLesson = reactive({
  previous: false,
  next: false
})
const unsavedChanges = ref(false)
const showBackground = ref(false)
const titleError = ref(false)

const documentId = computed(() => useRoute().params.id)
const isDraft = computed(() => lesson.value?.draft)
const isPrivate = computed(() => lesson.value?.private)

const { data: lesson, refresh } = await useAsyncData('lesson', () => get(documentId.value))

// Temporary
const background = ref('https://www.notion.so/images/page-cover/gradients_5.png')

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
    icon: 'i-heroicons-document-duplicate-20-solid',
    click: () => {
      toast.add({
        icon: 'i-heroicons-check-circle',
        title: 'Leçon dupliquée',
        description: 'Votre leçon a bien été dupliquée',
        color: 'green',
        actions: [{
          label: 'Voir la leçon',
          click: () => localePath({ name: 'lesson_id', params: { id: documentId.value } })
        }]
      })
    }
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
    loading.value = true
    
    try {
      if (label.id && (label.id !== selectedChapter.value?.id)) {
        await patch({ id: documentId.value, chapter_id: label.id })
        await refresh()
        toast.add({
          icon: 'i-heroicons-check-circle',
          title: 'Chapitre mis à jour avec succès',
          color: 'green'
        })
        return loading.value = false
      }
      
      if (label.id) {
        loading.value = false
        return selectedChapter.value
      }
      
      const response = await post({
        name: label.name,
        theme_id: 1,
        image: 'https://excalidraw.com/og-image-2.png'
      }, 'chapters')
      
      const lessonResponse = await patch({ id: documentId.value, chapter_id: response.id })
      
      if (lessonResponse) await refresh()
      
      toast.add({
        icon: 'i-heroicons-check-circle',
        title: 'Chapitre créé et assigné avec succès',
        color: 'green'
      })
      
      loading.value = false
      selectedChapter.value = response
    } catch (error) {
      loading.value = false
      toast.add({
        icon: 'i-heroicons-x-circle',
        title: 'Une erreur est survenue',
        color: 'red'
      })
    }
  }
})

const navigateLesson = async (direction: 'previous' | 'next') => {
  if (pendingNavigateLesson.previous || pendingNavigateLesson.next) return
  pendingNavigateLesson[direction] = true
  const response = await get(`${lesson.value?.chapter.id}/${direction}?current_order=${lesson.value?.order}`)
  await navigateTo(localePath({ name: 'lesson_id', params: { id: response.id } }))
  pendingNavigateLesson[direction] = false
}

const handleSave = async () => {
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
    content: JSON.stringify(json),
    ...(background.value && { image: background.value })
  })
  
  pending.value = false
  
  if (response) {
    initialContent = JSON.parse(lesson.value?.content)
    unsavedChanges.value = false
    return toast.add({ icon: 'i-heroicons-check-circle', title: 'Leçon enregistrée avec succès', color: 'green' })
  }
}

const handleDraft = async () => {
  pendingDraft.value = true
  const response = await patch({ id: documentId.value, draft: !isDraft.value })
  
  if (response) {
    toast.add({
      icon: 'i-heroicons-check-circle',
      title: `Leçon ${isDraft.value ? 'publiée' : 'mise en brouillon'} avec succès`,
      color: 'green'
    })
    await refresh()
    return pendingDraft.value = false
  }
  
  toast.add({
    icon: 'i-heroicons-x-circle',
    title: `Erreur lors de la ${isDraft.value ? 'publication' : 'mise en brouillon'} de la leçon`,
    color: 'red'
  })
  return pendingDraft.value = false
}

const handleVisibility = async () => {
  pendingVisibility.value = true
  const response = await patch({ id: documentId.value, private: !isPrivate.value })
  
  if (response) {
    toast.add({
      icon: 'i-heroicons-check-circle',
      title: `Leçon ${isPrivate.value ? 'rendu publique' : 'rendu privée'} avec succès`,
      color: 'green'
    })
    await refresh()
    return pendingVisibility.value = false
  }
  
  toast.add({
    icon: 'i-heroicons-x-circle',
    title: `Erreur lors de la ${isPrivate.value ? 'mise en publique' : 'mise en privée'} de la leçon`,
    color: 'red'
  })
  return pendingVisibility.value = false
}

const onUpdate = (content) => {
  unsavedChanges.value = !isEqual(content, initialContent)
}

const handleLink = (url) => {
  background.value = url
  return modal.close()
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

const handleModal = (index) => {
  modal.open(CommonsModalLibrary, {
    index,
    onSelect: ({ url }) => handleLink(url)
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
    handleSave()
  } else delete event.returnValue
}

const handleWindowEvent = (event: string, callback: (event: BeforeUnloadEvent) => void) => {
  window.addEventListener(event, callback)
}

onBeforeMount(() => handleWindowEvent('beforeunload', handleBeforeUnload))
onBeforeUnmount(() => window.removeEventListener('beforeunload', handleBeforeUnload))
</script>

<template>
  <UDashboardPanel grow>
    <UDashboardNavbar>
      <template #title>
        <ToggleDrawer />
        <UBreadcrumb :links="links" :ui="{ active: 'truncate w-full max-w-32' }" />
      </template>
      
      <template #badge>
        <UPopover :popper="{ placement: 'bottom-end' }">
          <UBadge :color="isDraft ? 'orange' : 'green'" size="xs" variant="subtle">
            {{ isDraft ? 'Brouillon' : 'Publié' }}
            <UIcon class="w-4 h-4" name="i-heroicons-chevron-down-20-solid" />
          </UBadge>
          
          <template #panel>
            <div class="flex items-center justify-center">
              <UButton
                :label="isDraft ? 'Publier' : 'Mettre en brouillon'" color="gray" icon="i-heroicons-pencil-square"
                size="2xs" variant="ghost" @click="handleDraft"
              />
            </div>
          </template>
        </UPopover>
      </template>
      
      <template #right>
        <div class="flex items-center justify-end gap-1">
          <UButton
            :color="unsavedChanges ? 'primary' : 'white'" :disabled="!unsavedChanges"
            :icon="unsavedChanges ? 'i-lucide-save' : 'i-heroicons-check'"
            :label="unsavedChanges ? 'Enregistrer' : 'Enregistré'" :loading="pending"
            size="xs"
            variant="soft" @click="handleSave"
          />
          
          <template v-if="lesson.chapter?.lessons_count">
            <div class="flex items-center gap-1">
              <UKbd>
                {{ lesson.order }} / {{ lesson.chapter.lessons_count }}
              </UKbd>
              <UTooltip :popper="{ placement: 'bottom' }" text="Leçon précédente">
                <UButton
                  :color="lesson.order === 1 ? 'white' : 'primary'"
                  :disabled="(lesson.order === 1) || pendingNavigateLesson.previous"
                  :padded="false"
                  :loading="pendingNavigateLesson.previous"
                  icon="i-heroicons-chevron-left-20-solid"
                  size="sm"
                  square
                  variant="solid"
                  @click="navigateLesson('previous')"
                />
              </UTooltip>
              <UTooltip :popper="{ placement: 'bottom' }" text="Leçon suivante">
                <UButton
                  :color="lesson.order === lesson.chapter.lessons_count ? 'white' : 'primary'"
                  :disabled="(lesson.order === lesson.chapter.lessons_count) || pendingNavigateLesson.next"
                  :padded="false"
                  :loading="pendingNavigateLesson.next"
                  icon="i-heroicons-chevron-right-20-solid"
                  size="sm" square
                  variant="solid" @click="navigateLesson('next')"
                />
              </UTooltip>
            </div>
          </template>
          
          <UDivider :ui="{ border: { base: 'dark:border-gray-500' } }" class="h-[16px] ml-2" orientation="vertical" />
          
          <UTooltip :popper="{ placement: 'bottom' }" text="Commentaires">
            <UButton
              color="gray" icon="i-heroicons-chat-bubble-bottom-center-text" square variant="ghost"
              @click="handleComments"
            />
          </UTooltip>
          
          <UTooltip :popper="{ placement: 'bottom' }" text="Médias associés">
            <UButton color="gray" icon="i-heroicons-rectangle-stack" square variant="ghost" @click="handleSlideover" />
          </UTooltip>
          <UDropdown
            :items="options" :popper="{ placement: 'bottom-start' }"
            :ui="{ item: { disabled: 'cursor-text select-text' } }"
          >
            <UButton color="gray" trailing-icon="i-heroicons-ellipsis-horizontal-20-solid" variant="ghost" />
            
            <template #item="{ item }">
              <UIcon :name="item.icon" class="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <span class="truncate">{{ item.label }}</span>
              <template v-if="item.type === 'toggle'">
                <UToggle v-if="item.id === 'hide-toolbar'" v-model="hideToolbar" class="ms-auto" size="sm" />
                <UToggle
                  v-else-if="item.id === 'draft'" :loading="pendingDraft" :model-value="lesson.draft" class="ms-auto"
                  size="sm" @change="handleDraft"
                />
                <UToggle
                  v-else-if="item.id === 'private'" :loading="pendingVisibility" :model-value="lesson.private"
                  class="ms-auto" size="sm" @change="handleVisibility"
                />
              </template>
            </template>
            <template #words>
              <p class="text-xs">Nombre de mots :{{
                  new Intl.NumberFormat('fr-FR').format(editor.storage.characterCount.words()).replace(/\s/g, '&nbsp;')
                }}</p>
            </template>
            <template #last-edited>
              <p class="text-xs text-left">Dernière modification : {{
                  new Date(lesson.updated_at).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric'
                  })
                }}</p>
            </template>
          </UDropdown>
        </div>
      </template>
    </UDashboardNavbar>
    
    <UDashboardPanelContent v-if="lesson" :ui="{ wrapper: 'p-0' }">
      <div v-if="showBackground" class="p-4 pb-0 aspect-[16/2.5] group grid grid-cols-12">
        <NuxtImg
          alt="Discord"
          class="cursor-pointer transition-all duration-150 ease-in-out group-hover:brightness-50 w-full rounded-xl col-span-12 row-span-2 col-start-1 row-start-1 aspect-[16/2.5] object-cover"
          :src="background"
          @click="handleModal('background')"
        />
        <div class="transition-all duration-150 ease-in-out hidden group-hover:block z-10 mt-4 mr-4 col-start-10 col-end-13 row-start-1">
          <UButton label="Modifier l'image" color="white" variant="solid" @click="handleModal('background')" block />
        </div>
      </div>
      
      <div class="pt-8 lg:px-[calc((100%_-_(750px))_/_2)]">
        <div class="flex items-center gap-2 mb-4">
          <USelectMenu
            v-model="chapter"
            :loading="loading"
            :searchable="search"
            :searchable-lazy="true"
            by="id"
            clear-search-on-close
            creatable
            name="chapter"
            option-attribute="name"
            placeholder="Sélectionner un chapitre"
            searchable
            searchable-placeholder="Rechercher un chapitre"
            trailing
          >
            <UButton
              :loading="loading"
              class="truncate"
              color="gray"
              leading-icon="i-lucide-notebook-text"
              size="xs"
              trailing-icon="i-heroicons-chevron-down-20-solid"
              variant="ghost"
            >
              Chapitre: {{ selectedChapter.name }}
            </UButton>
            
            <template #option="{ option }">
              <span class="truncate">{{ option.name }}</span>
            </template>
            
            <template #option-create="{ option }">
              <UIcon class="w-4 h-4" name="i-heroicons-plus" />
              <span class="block truncate">{{ option.name }}</span>
            </template>
          </USelectMenu>
          <UButton
            v-if="!showDescription" color="gray" label="Ajouter une description" leading-icon="i-lucide-text"
            size="xs" variant="ghost" @click="showDescription = true"
          />
          <UButton
            v-if="!showBackground" color="gray" label="Ajouter une couverture" leading-icon="i-lucide-image"
            size="xs" variant="ghost" @click="showBackground = true"
          />
        </div>
        <div
          :class="{ 'empty:before:!text-red-400': titleError }"
          class="inline-block w-full placeholder font-bold mb-5 text-3xl whitespace-pre-wrap tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl outline-none ring-none"
          contenteditable
          data-placeholder="Titre de la leçon"
          @blur="handleSave"
          @input="onUpdateTitle"
          @keydown="handleTitleKeyDown"
        >
          {{ lesson.name }}
        </div>
        <UTextarea
          v-if="showDescription" v-model="lesson.description" padded placeholder="Description de la leçon"
          variant="outline" @blur="handleSave" @input="onUpdateDescription"
        />
      </div>
      
      <LeazyEditor
        ref="tiptap" v-model="content" :hide-toolbar="hideToolbar" class="flex-1" max-width="800" output="json"
        @blur="handleSave" @update:model-value="onUpdate"
      />
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
