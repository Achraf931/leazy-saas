<script lang="ts" setup>
import { MediaLibraryModal } from '#components'

definePageMeta({
  pageTransition: false
})

const { comments, syncComments, openCommentSlideover } = useCommentSlideover()
const modal = useModal()
const toast = useToast()
const { get, post, patch } = useApi('lessons')
const tiptap = useTemplateRef('tiptap')
const hideToolbar = ref(false)
const editor = computed(() => tiptap.value?.editor)

const pending = ref(false)
const loading = ref(false)

const showBackground = ref(false)
const titleError = ref(false)

const documentId = computed(() => useRoute().params.id)

const { data, refresh } = await useAsyncData('lesson', () => get(documentId.value))
const lesson = reactive(data)

// Temporary
const background = ref('https://www.notion.so/images/page-cover/gradients_5.png')

const showDescription = ref(lesson.value?.description)

const content = computed(() => JSON.parse(lesson.value?.content)?.value || {})

const initializeComments = () => {
  const commentsFromAPI = lesson.value?.content ? JSON.parse(lesson.value.content).comments : []
  Object.assign(comments, commentsFromAPI)
}

onMounted(() => {
  initializeComments()
})

const onDeleted = (comment_id) => {
  console.log('onDeleted => comment_id', comment_id)
  editor.value?.commands.unsetComment(comment_id)
  handleSave()
}

const onUpdated = (comment) => {
  syncComments([comment])
  handleSave()
}

const onReplied = () => {
  handleSave()
}

const onAdded = (comment) => {
  openCommentSlideover({
    onDeleted,
    onUpdated,
    onReplied
  })
  syncComments([comment])
  handleSave()
}

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

const chapter = computed({
  get: () => lesson.value?.chapter,
  set: async (label) => {
    loading.value = true
    
    try {
      if (label.id && (label.id !== lesson.value?.chapter_id)) {
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
        return lesson.value.chapter
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

const handleSave = async () => {
  await nextTick()
  if (!editor.value) return
  if (!lesson.value.name) return (titleError.value = true)
  if (titleError.value) titleError.value = false
  
  const updatedContent = {
    value: editor.value.getJSON(),
    comments
  }
  
  pending.value = true
  
  try {
    const payload = Object.fromEntries(
      Object.entries({
        ...lesson.value,
        id: documentId.value,
        name: lesson.value?.name,
        description: lesson.value?.description,
        content: JSON.stringify(updatedContent),
        ...(background.value && { image: background.value })
      }).filter(([_, value]) => value != null)
    )
    
    await patch(payload)
  } catch (error) {
    toast.add({ icon: 'i-heroicons-x-circle', title: 'Erreur lors de l\'enregistrement', color: 'red' })
  } finally {
    pending.value = false
  }
}

const handleLink = (url) => {
  background.value = url
  return modal.close()
}

const handleModal = (index) => {
  modal.open(MediaLibraryModal, {
    index,
    onSelect: ({ url }) => handleLink(url)
  })
}

const onUpdateTitle = (event: InputEvent) => {
  lesson.value.name = (event.target as HTMLDivElement).innerText
}

const onUpdateDescription = (event: InputEvent) => {
  lesson.value.description = (event.target as HTMLDivElement).innerText
}

useBeforeUnload(handleSave)
</script>

<template>
  <UDashboardPanel grow>
    <LessonToolbar
      v-model="lesson"
      :editor="editor"
      @comment:added="onAdded"
      @comment:updated="onUpdated"
      @comment:replied="onReplied"
      @comment:deleted="onDeleted"
    />
    
    <UDashboardPanelContent v-if="lesson" :ui="{ wrapper: 'p-0' }">
      <div v-if="showBackground" class="p-4 pb-0 aspect-[16/2.5] group grid grid-cols-12">
        <NuxtImg
          :src="background"
          alt="Discord"
          class="cursor-pointer transition-all duration-150 ease-in-out group-hover:brightness-50 w-full rounded-xl col-span-12 row-span-2 col-start-1 row-start-1 aspect-[16/2.5] object-cover"
          @click="handleModal('background')"
        />
        <div
          class="transition-all duration-150 ease-in-out hidden group-hover:block z-10 mt-4 mr-4 col-start-10 col-end-13 row-start-1"
        >
          <UButton block color="white" label="Modifier l'image" variant="solid" @click="handleModal('background')" />
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
              <template v-if="chapter">
                Chapitre: {{ chapter.name }}
              </template>
              <template v-else>
                Sélectionner un chapitre
              </template>
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
        ref="tiptap"
        v-model="content"
        :hide-toolbar="hideToolbar"
        class="flex-1"
        max-width="800"
        output="json"
        @comment:added="onAdded"
        @update:model-value="handleSave"
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
