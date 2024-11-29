<script lang="ts" setup>
import { useDebounce } from '@vueuse/core'

const {
  results,
  loading,
  fetchResults,
  getImageSource
} = useSearchMedia()

const searchQuery = ref('')
const debouncedQuery = useDebounce(searchQuery, 500)
const currentProvider = ref('unsplash')
const link = ref('')
const emit = defineEmits(['select'])

watch(debouncedQuery, async (newQuery) => {
  if (newQuery) await fetchResults(newQuery, currentProvider.value)
  else results.value = []
})

watch(currentProvider, async () => {
  if (debouncedQuery.value) await fetchResults(debouncedQuery.value, currentProvider.value)
})

const handleProviderChange = (provider: string) => {
  currentProvider.value = provider
}

const handleLink = (url: string) => {
  emit('select', { url })
}

const tabs = [
  {
    label: 'Unsplash',
    value: 'unsplash',
    icon: 'i-simple-icons-unsplash',
    click: () => handleProviderChange('unsplash')
  },
  {
    label: 'Pexels',
    value: 'pexels',
    icon: 'i-simple-icons-pexels',
    click: () => handleProviderChange('pexels')
  },
  {
    label: 'Pixabay',
    value: 'pixabay',
    icon: 'i-simple-icons-pixabay',
    click: () => handleProviderChange('pixabay')
  },
  {
    label: 'Giphy',
    value: 'giphy',
    icon: 'i-simple-icons-giphy',
    click: () => handleProviderChange('giphy')
  }
]
</script>

<template>
  <UModal>
    <div class="flex flex-col items-end justify-between border border-gray-200 dark:border-gray-700 rounded-md p-4">
      <UCard :ui="{ body: { padding: 'py-3 sm:p-3' } }" class="w-full">
        <div class="flex flex-col h-[350px] -p-1 overflow-hidden w-full">
          <UTabs
            :items="tabs" :ui="{ wrapper: 'px-1', list: { tab: { size: 'text-xs', height: 'h-6' }, height: 'h-8' } }"
          >
            <template #icon="{ item }">
              <UIcon :name="item.icon" class="w-3 h-3 flex-shrink-0 mr-2" />
            </template>
            <template #default="{ item, index, selected }">
              <div class="flex items-center gap-2 relative truncate" @click="item.click()">
                <span class="truncate">{{ item.label }}</span>
                
                <span
                  v-if="selected" class="absolute -right-4 w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400"
                />
              </div>
            </template>
          </UTabs>
          
          <div class="flex-1 p-1 max-h-full flex flex-col overflow-hidden">
            <UInput
              v-model="searchQuery" :loading="loading" icon="i-heroicons-magnifying-glass"
              placeholder="Rechercher un média" size="xs"
            >
              <template v-if="searchQuery !== ''" #trailing>
                <UIcon class="cursor-pointer pointer-events-auto" name="i-heroicons-x-mark" @click="searchQuery = ''" />
              </template>
            </UInput>
            
            <div v-if="results.length > 0" class="masonry overflow-y-auto mt-4">
              <div
                v-for="(item, index) in results" :key="index"
                class="not-prose mb-4 h-auto max-w-full break-inside-avoid"
              >
                <img
                  :alt="getImageSource(item, currentProvider).label"
                  :src="getImageSource(item, currentProvider).preview"
                  class="w-full rounded-sm" @click="handleLink(getImageSource(item, currentProvider).src)"
                />
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
          <UInput
            v-model="link" :ui="{ padding: { sm: 'pr-24' } }" class="flex-1" placeholder="URL de l'image" size="xs"
          />
          <UButton class="absolute right-0.5" label="Importer" size="2xs" type="submit" @click="handleLink(link)" />
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