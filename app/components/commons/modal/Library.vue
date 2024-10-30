<script setup lang="ts">
import { useDebounce } from '@vueuse/core'

const { index } = defineProps({
  index: {
    type: Number,
    required: true
  }
})
const link = ref<string>('')
const loading = ref<boolean>(false)
const results = ref([])
const currentProvider = ref('unsplash')
const searchQuery = ref('')
const debounced = useDebounce(searchQuery, 1000)
const emit = defineEmits(['select'])

watch(debounced, async () => {
  loading.value = true
  const { results: resultsQuery } = await useSearchMedia(currentProvider.value, searchQuery.value, null)
  results.value = resultsQuery.value
  loading.value = false
})

const handleProvider = async (provider) => {
  currentProvider.value = provider
  if (searchQuery.value !== '') {
    loading.value = true
    const { results: resultsQuery } = await useSearchMedia(provider, searchQuery.value, null)
    results.value = resultsQuery.value
    loading.value = false
  }
}

const getImageSource = (item) => {
  if (currentProvider.value === 'unsplash') {
    return { preview: item?.urls?.thumb, src: item?.urls?.full, label: item?.alt_description, label: item?.alt_description, author: { url: item?.user?.links?.html, name: item?.user?.name } }
  } else if (currentProvider.value === 'pexels') {
    return { preview: item?.src?.tiny, src: item?.src?.original, label: item?.alt, label: item?.alt, author: { url: item?.photographer_url, name: item?.photographer } }
  } else if (currentProvider.value === 'pixabay') {
    return { preview: item?.previewURL, src: item?.largeImageURL, label: item?.tags, author: { url: item?.pageURL, name: item?.user } }
  } else if (currentProvider.value === 'giphy') {
    return { preview: item?.images?.preview_gif?.url, src: item?.images?.original?.url, label: item?.title, author: { url: item?.user?.profile_url, name: item?.user?.username } }
  }
}

const tabs = [
  { label: 'Unsplash', value: 'unsplash', icon: 'i-simple-icons-unsplash', click: () => handleProvider('unsplash')},
  { label: 'Pexels', value: 'pexels', icon: 'i-simple-icons-pexels', click: () => handleProvider('pexels')},
  { label: 'Pixabay', value: 'pixabay', icon: 'i-simple-icons-pixabay', click: () => handleProvider('pixabay')},
  { label: 'Giphy', value: 'giphy', icon: 'i-simple-icons-giphy', click: () => handleProvider('giphy')}
]

const handleLink = (url) => {
  emit('select', { index, url })
}
</script>

<template>
  <UModal>
    <div class="flex flex-col items-end justify-between border border-gray-200 dark:border-gray-700 rounded-md p-4">
      <UCard :ui="{ body: { padding: 'py-3 sm:p-3' } }" class="w-full">
        <div class="flex flex-col h-[350px] -p-1 overflow-hidden w-full">
          <UTabs :items="tabs" :ui="{ wrapper: 'px-1', list: { tab: { size: 'text-xs', height: 'h-6' }, height: 'h-8' } }">
            <template #icon="{ item }">
              <UIcon :name="item.icon" class="w-3 h-3 flex-shrink-0 mr-2" />
            </template>
            <template #default="{ item, index, selected }">
              <div @click="item.click()" class="flex items-center gap-2 relative truncate">
                <span class="truncate">{{ item.label }}</span>

                <span v-if="selected" class="absolute -right-4 w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400" />
              </div>
            </template>
          </UTabs>

          <div class="flex-1 p-1 max-h-full flex flex-col overflow-hidden">
            <UInput :loading="loading" v-model="searchQuery" placeholder="Rechercher un média" icon="i-heroicons-magnifying-glass" size="xs">
              <template v-if="searchQuery !== ''" #trailing>
                <UIcon class="cursor-pointer pointer-events-auto" name="i-heroicons-x-mark" @click="searchQuery = ''" />
              </template>
            </UInput>

            <div v-if="results.length > 0" class="masonry overflow-y-auto mt-4">
              <div class="not-prose mb-4 h-auto max-w-full break-inside-avoid" v-for="(item, index) in results" :key="index">
                <img @click="handleLink(getImageSource(item).src)" class="w-full rounded-sm" :src="getImageSource(item).preview" :alt="getImageSource(item).label" />
              </div>
            </div>
          </div>
        </div>
      </UCard>

      <div class="flex items-center align-center text-center w-full flex-row my-2.5">
        <div class="flex border-gray-200 dark:border-gray-800 w-full border-t border-solid" />
        <div class="font-medium text-gray-700 dark:text-gray-200 flex mx-3 whitespace-nowrap">
          <span class="text-sm">ou</span>
        </div>
        <div class="flex border-gray-200 dark:border-gray-800 w-full border-t border-solid" />
      </div>

      <div class="w-full flex items-center gap-4">
        <div class="relative flex items-center justify-start flex-1">
          <UInput placeholder="URL de l'image" size="xs" class="flex-1" :ui="{ padding: { sm: 'pr-24' } }" v-model="link"/>
          <UButton type="submit" class="absolute right-0.5" size="2xs" @click="handleLink" label="Importer" />
        </div>
      </div>
    </div>
  </UModal>
</template>

<style scoped>
.masonry {
  column-count: 3;
}
</style>