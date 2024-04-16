<script setup lang="ts">
import { useDebounce } from '@vueuse/core'

const route = useRoute()
const localePath = useLocalePath()
const { t } = useI18n()

const panelOpened = ref(false)

const title = ref('Leçon 1'),
  description = ref('Description de la leçon 1')

const links = [
  {
    label: t('drawer.library.label'),
    to: localePath({ name: 'library' })
  },
  {
    label: t('drawer.library.lessons'),
    to: localePath({ name: 'library-lessons' })
  },
  {
    label: `${route.params.id}_${route.params.slug}`
  }
]

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
const isModalOpen = ref(false)
const currentProvider = ref('unsplash')
const searchQuery = ref('')
const isLoading = ref(false)
const debounced = useDebounce(searchQuery, 1000)
const results = ref([])

watch(debounced, async () => {
  isLoading.value = true
  const { results: resultsQuery } = await useSearchMedia(currentProvider.value, searchQuery.value, null)
  results.value = resultsQuery.value
  isLoading.value = false
})

const handleProvider = async (provider) => {
  currentProvider.value = provider
  if (searchQuery.value !== '') {
    isLoading.value = true
    const { results: resultsQuery } = await useSearchMedia(provider, searchQuery.value, null)
    results.value = resultsQuery.value
    isLoading.value = false
  }
}

const getImageSource = (item) => {
  if (currentProvider.value === 'unsplash') {
    return { src: item?.urls?.thumb, label: item?.alt_description, author: { url: item?.user?.links?.html, name: item?.user?.name } }
  } else if (currentProvider.value === 'pexels') {
    return { src: item?.src?.tiny, label: item?.alt, author: { url: item?.photographer_url, name: item?.photographer } }
  } else if (currentProvider.value === 'pixabay') {
    return { src: item?.previewURL, label: item?.tags, author: { url: item?.pageURL, name: item?.user } }
  } else if (currentProvider.value === 'giphy') {
    return { src: item?.images?.preview_gif?.url, label: item?.title, author: { url: item?.user?.profile_url, name: item?.user?.username } }
  }
}
</script>

<template>
  <UDashboardPanel grow>
    <UDashboardNavbar badge="Brouillon">
      <template v-slot:title>
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
          <div class="border-l border-gray-200 pl-2.5 ml-2 flex items-center h-full">
            <UIcon @mouseover="panelOpened = true" @click="panelOpened = true" dynamic :name="`i-fluent-panel-right-32-${panelOpened ? 'filled' : 'regular'}`" class="w-4 h-4 text-gray-500 dark:text-gray-200 cursor-pointer" />
          </div>
        </div>
      </template>
    </UDashboardNavbar>
    <UDashboardPanelContent>
      <ClientOnly>
        <LeazyEditor />
      </ClientOnly>
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

  <UModal v-model="isModalOpen" :ui="{ width: 'sm:max-w-xl' }">
    <div class="p-4 flex items-start justify-center h-[350px] overflow-hidden w-full">
      <div class="flex flex-col justify-between h-full min-w-36 pr-4 border-r border-gray-200">
        <p class="text-gray-400 text-xs mb-2">Intégrations</p>
        <UButton @click.native="handleProvider('unsplash')" :class="{ 'text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white bg-gray-50 dark:bg-gray-800': currentProvider === 'unsplash' }" class="w-full" square size="xs" label="Unsplash" color="gray" variant="ghost" icon="i-simple-icons-unsplash" />
        <UButton @click.native="handleProvider('pexels')" :class="{ 'text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white bg-gray-50 dark:bg-gray-800': currentProvider === 'pexels' }" class="w-full" square size="xs" label="Pexels" variant="ghost" color="gray" icon="i-simple-icons-pexels" />
        <UButton @click.native="handleProvider('pixabay')" :class="{ 'text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white bg-gray-50 dark:bg-gray-800': currentProvider === 'pixabay' }" class="w-full" square size="xs" label="Pixabay" variant="ghost" color="gray" icon="i-simple-icons-pixabay" />
        <UButton @click.native="handleProvider('giphy')" :class="{ 'text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white bg-gray-50 dark:bg-gray-800': currentProvider === 'giphy' }" class="w-full" square size="xs" label="Giphy" variant="ghost" color="gray" icon="i-simple-icons-giphy" />
        <UButton size="xs" icon="i-heroicons-arrow-up-tray" block label="Importer" @click="isModalOpen = false" />
      </div>

      <div class="pl-4 flex-1 max-h-full flex flex-col min-w-[70%]">
        <UInput :loading="isLoading" v-model="searchQuery" placeholder="Rechercher un média" icon="i-heroicons-magnifying-glass" size="xs">
          <template v-if="searchQuery !== ''" #trailing>
            <UIcon class="cursor-pointer pointer-events-auto" name="i-heroicons-x-mark" @click="searchQuery = ''" />
          </template>
        </UInput>

        <div v-if="results.length > 0" class="max-h-full masonry overflow-y-auto mt-2">
          <div class="h-auto max-w-full break-inside-avoid py-2" v-for="(item, index) in results" :key="index">
            <img class="w-full rounded-sm" :src="getImageSource(item).src" :alt="getImageSource(item).label" />
            <div class="flex items-center justify-between mt-px">
              <p v-if="getImageSource(item).author.url" class="text-[9px]">by <ULink class="underline font-bold" target="_blank" :to="getImageSource(item).author.url">{{ getImageSource(item).author.name }}</ULink></p>
              <UIcon class="w-3.5 cursor-pointer ml-auto" name="i-heroicons-bookmark-solid" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </UModal>
</template>
