<script lang="ts" setup>
import { ConfirmDeleteLessonModal, MediaSlideover } from '#components'
import type { Editor } from '@tiptap/core'

const { $html2pdf } = useNuxtApp()
const lesson = defineModel()
const { editor } = defineProps<{ editor: Editor | string }>()
const { openCommentSlideover } = useCommentSlideover()
const emit = defineEmits(['comment:added', 'comment:deleted', 'comment:updated', 'comment:replied'])
const { get, patch } = useApi('lessons')
const localePath = useLocalePath()
const toast = useToast()
const { t } = useI18n()
const modal = useModal()
const slideover = useSlideover()
const isDraft = computed(() => lesson.value?.draft)
const isPrivate = computed(() => lesson.value?.private)
const pendingDraft = ref(false)
const pendingVisibility = ref(false)
const pendingDuplicate = ref(false)
const hideToolbar = ref(false)
const fileInput = useTemplateRef('fileInput')

const pendingNavigateLesson = reactive({
  previous: false,
  next: false
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

const onExport = (context: any) => {
  context?.download?.()
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
    loading: pendingDuplicate.value,
    click: async () => {
      pendingDuplicate.value = true
      
      try {
        const response = await get(`${lesson.value.id}/duplicate`)
        console.log('response', response)
        
        if (response) {
          toast.add({
            icon: 'i-heroicons-check-circle',
            title: 'Leçon dupliquée',
            description: 'Votre leçon a bien été dupliquée.',
            color: 'green',
            actions: [{
              label: 'Voir la leçon',
              click: () => localePath({ name: 'lesson_id', params: { id: response.id } })
            }]
          })
        }
      } catch {
        toast.add({
          icon: 'i-heroicons-x-circle',
          title: 'Erreur lors de la duplication',
          description: 'Une erreur est survenue lors de la duplication de votre leçon.',
          color: 'red'
        })
      } finally {
        pendingDuplicate.value = false
        }
    }
  }], [{
    label: 'Importer',
    icon: 'i-heroicons-arrow-down-tray',
    click: () => fileInput.value?.click()
  }, {
    label: 'Exporter en DOCX',
    icon: 'i-heroicons-document',
    click: () => {
      editor?.commands.export({ format: 'docx', onExport })
    }
  }, {
    label: 'Exporter en ODT',
    icon: 'i-heroicons-document',
    click: () => {
      editor?.commands.export({ format: 'odt', onExport })
    }
  }, {
    label: 'Exporter en Markdown',
    icon: 'i-heroicons-document',
    click: () => {
      editor?.commands.export({ format: 'md', onExport })
    }
  }, {
    label: 'Exporter en GitHub Markdown',
    icon: 'i-heroicons-document',
    click: () => {
      editor?.commands.export({ format: 'gfm', onExport })
    }
  }, {
    label: 'Exporter en PDF',
    icon: 'i-heroicons-document'
  }, {
    label: 'Exporter en HTML',
    icon: 'i-heroicons-cursor-arrow-rays',
    click: async () => {
      const dom = editor?.view?.dom
      const styles = Array.from(document.querySelectorAll('style, link')).map(style => style.outerHTML).join('');
      const additionalStyles = `
        <style>
          body, body * {
            color: #000 !important; /* Forcer la couleur noire */
            background: none !important; /* Supprimer les arrière-plans */
          }
        </style>
      `;
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `
        <html>
          <head>${styles}${additionalStyles}</head>
          <body>${dom.outerHTML}</body>
        </html>
      `;
      $html2pdf(wrapper, {
        filename: 'filename.pdf',
        html2canvas: {
          scale: 2,
          bottom: 20,
          useCORS: true
        },
        margin: 10,
        pageBreak: {
          mode: ['css']
        },
        image: {
          type: 'jpeg',
          quality: 0.98
        },
        jsPDF: {
          unit: 'mm',
          format: 'letter',
          orientation: 'portrait'
        },
        enableLinks: true
      })
    }
  }, {
    label: 'Imprimer',
    icon: 'i-heroicons-printer',
    click: () => {
      editor?.commands.print()
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

const handleFile = (e) => {
  const file = e.target.files?.[0]
  
  if (!file) return
  
  editor?.chain().import({
    file,
    onImport: (context: any) => {
      context?.setEditorContent?.()
    }
  }).run()
}

const navigateLesson = async (direction: 'previous' | 'next') => {
  if (pendingNavigateLesson.previous || pendingNavigateLesson.next) return
  pendingNavigateLesson[direction] = true
  const response = await get(`${lesson.value?.chapter.id}/${direction}?current_order=${lesson.value?.order}`)
  await navigateTo(localePath({ name: 'lesson_id', params: { id: response.id } }))
  pendingNavigateLesson[direction] = false
}

const handleDraft = async () => {
  pendingDraft.value = true
  const response = await patch({ id: lesson.value.id, draft: !isDraft.value })
  
  if (response) {
    toast.add({
      icon: 'i-heroicons-check-circle',
      title: `Leçon ${isDraft.value ? 'publiée' : 'mise en brouillon'} avec succès`,
      color: 'green'
    })
    lesson.value.draft = !isDraft.value
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
  const response = await patch({ id: lesson.value.id, private: !isPrivate.value })
  
  if (response) {
    toast.add({
      icon: 'i-heroicons-check-circle',
      title: `Leçon ${isPrivate.value ? 'rendu publique' : 'rendu privée'} avec succès`,
      color: 'green'
    })
    lesson.value.private = !isPrivate.value
    return pendingVisibility.value = false
  }
  
  toast.add({
    icon: 'i-heroicons-x-circle',
    title: `Erreur lors de la ${isPrivate.value ? 'mise en publique' : 'mise en privée'} de la leçon`,
    color: 'red'
  })
  return pendingVisibility.value = false
}

const handleDelete = () => {
  modal.open(ConfirmDeleteLessonModal, {
    lesson: lesson.value,
    redirect: true,
    onClose: () => modal.close()
  })
}

const handleSlideover = () => {
  slideover.open(MediaSlideover, {
    medias: lesson.value?.medias,
    overlay: false
  })
}

const handleComments = () => {
  openCommentSlideover({
    onAdded: (comment) => emit('comment:added', comment),
    onDeleted: (comment_id) => emit('comment:deleted', comment_id),
    onUpdated: (comment) => emit('comment:updated', comment),
    onReplied: ({ comment, reply }) => emit('comment:replied', { comment, reply })
  })
}
</script>

<template>
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
        <template v-if="lesson.chapter?.lessons_count">
          <div class="flex items-center gap-1">
            <UTooltip :popper="{ placement: 'bottom' }" text="Leçon précédente">
              <UButton
                :color="lesson.order === 1 ? 'white' : 'primary'"
                :disabled="(lesson.order === 1) || pendingNavigateLesson.previous"
                :loading="pendingNavigateLesson.previous"
                :padded="false"
                icon="i-heroicons-chevron-left-20-solid"
                size="sm"
                square
                variant="solid"
                @click="navigateLesson('previous')"
              />
            </UTooltip>
            <UKbd>
              {{ lesson.order }} / {{ lesson.chapter.lessons_count }}
            </UKbd>
            <UTooltip :popper="{ placement: 'bottom' }" text="Leçon suivante">
              <UButton
                :color="lesson.order === lesson.chapter.lessons_count ? 'white' : 'primary'"
                :disabled="(lesson.order === lesson.chapter.lessons_count) || pendingNavigateLesson.next"
                :loading="pendingNavigateLesson.next"
                :padded="false"
                icon="i-heroicons-chevron-right-20-solid"
                size="sm" square
                variant="solid" @click="navigateLesson('next')"
              />
            </UTooltip>
          </div>
          
          <UDivider :ui="{ border: { base: 'dark:border-gray-500' } }" class="h-[16px] ml-2" orientation="vertical" />
        </template>
        
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
          <input ref="fileInput" type="file" class="hidden" accept=".docx,.md,.odt,.rtf,.gfm" @change="handleFile" />
          
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
</template>
