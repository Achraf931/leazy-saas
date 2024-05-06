<script setup lang="ts">
import { Editor as EditorType } from '@tiptap/core'
import { useStorage } from '@vueuse/core'

definePageMeta({
  pageTransition: false
})

const toast = useToast()
const localePath = useLocalePath()
const client = useSanctumClient()
const { t } = useI18n()
const editor = ref<EditorType>()
const savePending = ref(false)

const documentId = computed(() => useRoute().params.id)

const { data, pending, error, refresh } = await useAsyncData(async () => {
  const [lesson, chapters] = await Promise.all([
    client(`/api/teacher/lessons/${documentId.value}`),
    client('/api/teacher/chapters')
  ])

  return {
    lesson,
    chapters: chapters.data
  }
})

const { lesson, chapters } = data.value

// const { data: lesson, pending, error, refresh } = await useAsyncData(() => client(`/api/teacher/lessons/${documentId.value}`))

let initialContent = JSON.stringify(lesson.content)

const content = computed(() => JSON.parse(lesson.content ?? '{}'))

const isContentUnsaved = computed(() => JSON.stringify(content.value) !== initialContent)

watch(() => content.value, () => {
  const data = useStorage(`leazy-editor-${documentId.value}`, '{}')
  data.value = JSON.stringify(content.value)
}, { deep: true, immediate: true })

const title = ref(lesson.name),
    description = ref(lesson.description)

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

  if (event.key === 'Enter') editor.value?.editor.commands.focus()

  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    const selection = window.getSelection()

    if (selection?.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const { endOffset } = range

      const textContent = event.currentTarget.textContent || ''

      if (endOffset >= textContent.length) {
        editor.value?.editor.commands.focus('start')

        event.preventDefault()
      }
    }
  }
};

const images = [
  {
    src: "https://images.unsplash.com/photo-1558637845-c8b7ead71a3e?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "image de test",
  }, {
    src: "https://images.unsplash.com/photo-1580757468214-c73f7062a5cb?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "image de test",
  }, {
    src: "https://images.unsplash.com/photo-1594568284297-7c64464062b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "image de test",
  }, {
    src: "https://images.unsplash.com/photo-1599454100789-b211e369bd04?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "image de test",
  }, {
    src: "https://images.unsplash.com/photo-1626593261859-4fe4865d8cb1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "image de test",
  }, {
    src: "https://images.unsplash.com/photo-1603486002664-a7319421e133?q=80&w=2142&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "image de test",
  }, {
    src: "https://images.unsplash.com/photo-1595835018349-198460e1d309?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "image de test",
  },
  {
    src: "https://images.unsplash.com/photo-1559511331-6a3a4e72f588?q=80&w=2147&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "image de test",
  },
  {
    src: "https://images.unsplash.com/photo-1599154456742-c82164d2dfb0?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "image de test",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1701757034308-0bd354a91537?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "image de test",
  },
  {
    src: "https://images.unsplash.com/photo-1605804097539-f7b052b4960d?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "image de test"
  },
  {
    src: "https://images.unsplash.com/photo-1603550489068-68e60062b3f9?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "image de test"
  },
  {
    src: "https://images.unsplash.com/photo-1602826347632-fc49a8675be6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "image de test"
  },
  {
    src: "https://images.unsplash.com/photo-1617391766038-970a91689241?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "image de test"
  },
  {
    src: "https://images.unsplash.com/flagged/photo-1556669546-b1f29875df1c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "image de test"
  }
]

const options = [
  [{
    label: 'Brouillon',
    icon: 'i-heroicons-archive-box',
    click: () => {
      console.log('Edit')
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
      editor.value?.editor.commands.print()
    }
  }], [{
    label: 'Supprimer',
    icon: 'i-heroicons-trash-20-solid'
  }]
]

const selectedChapter = ref(lesson.chapter || null)

const labels = computed({
  get: () => selectedChapter.value,
  set: async (label) => {
    if (label.id) {
      await client(`/api/teacher/lessons/${documentId.value}`, { method: 'PATCH', body: { chapter_id: label.id } })
      return await refresh()
    }

    const response = await client('/api/teacher/chapters', { method: 'POST', body: label })

    /*const response = {
      id: chapters.value.length + 1,
      name: label.name
    }*/

    chapters.value.push(response)

    return selectedChapter.value = response
  }
})

const goPrevLesson = async () => {
  const response = await client(`/api/teacher/lessons/${lesson.chapter.id}/previous?current_order=${lesson.order}`)
  await navigateTo(localePath({ name: 'library-lessons-id', params: { id: response.id } }))
}

const goNextLesson = async () => {
  const response = await client(`/api/teacher/lessons/${lesson.chapter.id}/next?current_order=${lesson.order}`)
  await navigateTo(localePath({ name: 'library-lessons-id', params: { id: response.id } }))
}

const save = async () => {
  // if (!isContentUnsaved.value) return

  if (!editor.value?.editor) return

  savePending.value = true

  const json = editor.value?.editor.getJSON()

  console.log(title.value)
  const response = await client(`/api/teacher/lessons/${lesson.id}`, {
    method: 'PATCH',
    body: {
      name: title.value,
      // description: description.value,
      content: JSON.stringify(json),
      // chapter_id: selectedChapter.value.id
    }
  })

  savePending.value = false

  if (response) {
    await refresh()
    initialContent = JSON.stringify(lesson.content)
    return toast.add({ icon: 'i-heroicons-check-circle', title: 'Leçon enregistrée avec succès', color: 'green' })
  }

  return toast.add({ icon: 'i-heroicons-x-circle', title: 'Erreur lors de l\'enregistrement de la leçon', color: 'red' })
}
</script>

<template>
  <UDashboardPanel grow>
    <UDashboardNavbar :ui="{ wrapper: 'z-10 bg-white dark:bg-zinc-900' }">
      <template #title>
        <ToggleDrawer />
        <UBreadcrumb :links="links" :ui="{ active: 'truncate w-full max-w-32' }" />
      </template>

      <template #badge>
        <UBadge variant="subtle" size="xs" :color="lesson.draft ? 'primary' : 'green'">{{ lesson.draft ? 'Brouillon' : 'Publié' }}</UBadge>
      </template>

      <template #right>
        <div class="flex items-center justify-end gap-1">
          <template v-if="lesson.chapter?.lessons_count">
            <p class="pr-1.5 tracking-wider text-sm">{{ lesson.order }}/{{ lesson.chapter.lessons_count }}</p>
            <UButton :disabled="lesson.order === 1" @click="goPrevLesson" size="2xs" variant="soft" :color="lesson.order === 1 ? 'gray' : 'primary'" square>
              <UIcon name="i-heroicons-chevron-left" />
            </UButton>
            <UButton :disabled="lesson.order === lesson.chapter.lessons_count" @click="goNextLesson" size="2xs" variant="soft" :color="lesson.order === lesson.chapter.lessons_count ? 'gray' : 'primary'" square>
              <UIcon name="i-heroicons-chevron-right" />
            </UButton>
          </template>
          <div class="border-l border-gray-200 pl-2.5 ml-2 flex items-center h-full cursor-pointer">
            <UIcon @click="panelOpened = !panelOpened" dynamic :name="`i-fluent-panel-right-32-${panelOpened ? 'filled' : 'regular'}`" class="w-4 h-4 text-gray-500 dark:text-gray-200" />
          </div>
        </div>
      </template>
    </UDashboardNavbar>
    <UDashboardPanelContent v-if="lesson">
      <div contenteditable @input="title = $event.target.innerText" data-placeholder="Titre de la leçon" class="empty:before:content-['Titre de la leçon'] empty:before:pointer-events-none empty:before:text-[#adb5bd] font-bold px-[calc((100%_-_(750px))_/_2)] mt-[25px] text-3xl tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl outline-none ring-none" @keydown="handleTitleKeyDown">
        {{ title }}
      </div>
      <LeazyEditor ref="editor" :default-value="content" :storage-key="`leazy-editor-${documentId}`" />
    </UDashboardPanelContent>

    <UDashboardToolbar :ui="{ wrapper: 'bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-10', left: 'items-center gap-2 relative' }">
      <template #left>
        <UPopover :popper="{ placement: 'top-start' }">
          <UButton icon="i-heroicons-check" size="xs" leading-icon="i-lucide-wand-sparkles" label="IA Commandes" variant="soft" />
        </UPopover>

        <template v-if="editor?.editor">
          <div class="flex items-center justify-start gap-1 px-2 border-gray-200 dark:border-gray-800 h-full border-x border-solid">
            <UButton @click="editor?.editor.chain().focus().undo().run()" :disabled="!editor?.editor.can().undo()" icon="i-lucide-undo" variant="soft" size="xs" :color="editor?.editor.can().undo() ? 'primary' : 'gray'" />
            <UButton @click="editor?.editor.chain().focus().redo().run()" :disabled="!editor?.editor.can().redo()" icon="i-lucide-redo" variant="soft" size="xs" :color="editor?.editor.can().redo() ? 'primary' : 'gray'" />
          </div>
          <p class="text-xs">{{ new Intl.NumberFormat('fr-FR').format(editor.editor.storage.characterCount.words()).replace(/\s/g, '&nbsp;') }} mots</p>
        </template>

      </template>

      <template #right>
        <UButton :disabled="!isContentUnsaved" size="xs" @click="save" :loading="savePending" icon="i-heroicons-check" :label="isContentUnsaved ? 'Enregistrer' : 'Enregistré'" />
      </template>
    </UDashboardToolbar>
  </UDashboardPanel>

  <USlideover v-model="panelOpened" side="right" :overlay="false" :ui="{ wrapper: 'top-[--header-height] h-[calc(100vh-var(--header-height))]', width: 'max-w-max' }">
    <UDashboardSidebar class="max-w-72 border-l border-gray-200" :ui="{ container: 'text-sm', body: 'gap-4', footer: 'grid grid-cols-2 gap-2' }">
      <template #header>
        <UIcon @click="panelOpened = false" name="i-heroicons-x-mark" class="w-4 h-4 text-gray-600 ml-auto cursor-pointer" />
      </template>
      <template #default>
        <UFormGroup label="Titre">
          <UInput v-model="title" placeholder="Titre de la leçon" variant="outline" padded />
        </UFormGroup>

        <UFormGroup label="Description">
          <UTextarea v-model="description" placeholder="Description de la leçon" variant="outline" padded />
        </UFormGroup>

        <UFormGroup label="Chapitre associé">
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
        </UFormGroup>

        <UAccordion :items="[{ label: `Médias associés (${images.length})` }]" :ui="{ wrapper: 'mt-2 flex-1 overflow-hidden max-w-[287px] w-full', container: 'overflow-y-auto', item: { padding: 'pt-2.5' } }">
          <template #item>
            <UBlogList orientation="horizontal" :ui="{ wrapper: 'overflow-y-auto gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2' }">
              <UBlogPost v-for="(item, index) in images" :key="index" :ui="{ wrapper: 'gap-y-0.5', title: 'text-sm', date: 'text-xs', authors: { wrapper: 'mt-0' }, image: { wrapper: 'pointer-events-auto' } }">
                <template #image>
                  <img @click="imgOpened = true; currentMedia = { src: item.src, label: item.label }" class="cursor-pointer block object-cover object-top w-full h-full transform transition-transform duration-200 hover:scale-105" :src="item.src" :alt="item.label">
                </template>
                <template #default>
                  <div class="flex items-center justify-between">
                    <div>
                      <h2 class="text-gray-900 dark:text-white font-semibold truncate group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200 text-xs">image de test</h2>
                      <p class="text-gray-400 text-[10px]">PNG · Dec 25, 2023</p>
                    </div>
                    <UDropdown :ui="{ item: { size: 'text-xs' }, width: 'w-auto' }" :items="[[{ label: 'Renommer', icon: 'i-heroicons-pencil-square' }, { label: 'Supprimer', icon: 'i-heroicons-trash', color: 'red' }]]" :popper="{ placement: 'bottom-end' }">
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
        <UButton disabled block label="Enregistrer" icon="i-heroicons-check" />
        <UDropdown :items="options" :ui="{ item: { size: 'text-xs' }, width: 'w-auto' }" :popper="{ placement: 'top-end' }">
          <UButton block icon="i-heroicons-bolt" trailing-icon="i-heroicons-ellipsis-vertical" color="gray" label="Actions" />
        </UDropdown>
      </template>
    </UDashboardSidebar>
  </USlideover>
</template>
