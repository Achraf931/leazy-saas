<script setup lang="ts">
const localePath = useLocalePath()
const { t } = useI18n()
const editor = ref(null)
const title = ref('Explication d\'Excalidraw'),
    description = ref('Description de la leçon 1')


onMounted(() => {
  if (editor.value?.titleContent) title.value = editor.value?.titleContent?.content?.[0]?.content?.[0]?.text || 'Explication d\'Excalidraw'
})

watchEffect(() => {
  if (editor.value?.titleContent) title.value = editor.value?.titleContent?.content?.[0]?.content?.[0]?.text || 'Explication d\'Excalidraw'
})

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
    label: title.value || 'Explication d\'Excalidraw'
  }
])

watchEffect(() => {
  links.value[2].label = title.value || 'Explication d\'Excalidraw'
})

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
  }], [{
    label: 'Supprimer',
    icon: 'i-heroicons-trash-20-solid'
  }]
]

const chapters = [
  {
    id: 1,
    label: 'Chapitre 1'
  },
  {
    id: 2,
    label: 'Chapitre 2'
  },
  {
    id: 3,
    label: 'Chapitre 3'
  }
]

const selectedChapter = ref(chapters[0])
</script>

<template>
  <UDashboardPanel grow>
    <UDashboardNavbar badge="Brouillon" :ui="{ wrapper: 'z-10 bg-white dark:bg-zinc-900' }">
      <template #title>
        <ToggleDrawer />
        <UBreadcrumb :links="links" />
      </template>

      <template #right>
        <div class="flex items-center justify-end gap-1">
          <p class="pr-1.5 tracking-wider text-sm">4/11</p>
          <UButton size="2xs" variant="ghost" color="white" square>
            <UIcon name="i-heroicons-chevron-left" />
          </UButton>
          <UButton size="2xs" variant="ghost" color="white" square>
            <UIcon name="i-heroicons-chevron-right" />
          </UButton>
          <div class="border-l border-gray-200 pl-2.5 ml-2 flex items-center h-full cursor-pointer">
            <UIcon @click="panelOpened = !panelOpened" dynamic :name="`i-fluent-panel-right-32-${panelOpened ? 'filled' : 'regular'}`" class="w-4 h-4 text-gray-500 dark:text-gray-200" />
          </div>
        </div>
      </template>
    </UDashboardNavbar>
    <UDashboardPanelContent>
      <LeazyEditor ref="editor" />
    </UDashboardPanelContent>
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
          <UInputMenu v-model="selectedChapter" :options="chapters" placeholder="Sélectionner un chapitre" by="id" option-attribute="label" :search-attributes="['label']" />
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
