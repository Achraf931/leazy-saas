<script setup>
import { useDebounce } from '@vueuse/core'
import { sub, formatDistanceToNow } from 'date-fns'
import frLocale from 'date-fns/locale/fr'

const client = useSanctumClient()
const toast = useToast()

const { data: chapters, pending, error, refresh } = await useAsyncData('chapters', () => client('/api/teacher/chapters'))
const localePath = useLocalePath()

const q = ref('')

const isOpen = ref(false)

const links = [
  {
    label: 'Bibliothèque',
    to: localePath({ name: 'library' })
  },
  {
    label: 'Chapitres',
    to: localePath({ name: 'library-chapters' })
  }
]

const isDeleteChapterModalOpen = ref({ open: false, chapter: null, refresh })
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

const range = ref({ start: sub(new Date(), { days: 14 }), end: new Date() })
const period = ref('daily')

const filteredChapters = computed(() => {
  return chapters.value?.data.filter(chapter => {
    return chapter.name.search(new RegExp(q.value, 'i')) !== -1
  })
})

const handleDelete = chapter => {
  isDeleteChapterModalOpen.value.open = true
  isDeleteChapterModalOpen.value.chapter = chapter
}

const fields = reactive({
  name: undefined,
  theme_id: 1,
  image: 'https://excalidraw.com/og-image-2.png'
})

const validate = (state) => {
  const errors = []

  if (!state.name) errors.push({ path: 'name', message: 'Le titre est requis' })

  return errors
}

const onSubmit = async (state) => {
  isLoading.value = true
  const response = await client('/api/teacher/chapters', { method: 'POST', body: state.data })

  if (response) setTimeout(async () => {
    isLoading.value = false
    isOpen.value = false
    await refresh()
    toast.add({ icon: 'i-heroicons-check-circle', title: 'Nouveau chapitre crée', color: 'green' })
  }, 2000)
  else isLoading.value = false
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar>
        <template #title>
          <ToggleDrawer />
          <UBreadcrumb :links="links" />
        </template>
        <template #right>
          <UButton trailing-icon="i-heroicons-plus" @click="isOpen = true" label="Créer un chapitre" />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <UInput v-model="q" icon="i-heroicons-magnifying-glass" placeholder="Rechercher un chapitre" />

          <!-- ~/components/home/HomeDateRangePicker.vue -->
          <HomeDateRangePicker v-model="range" class="ml-2.5" />
        </template>
      </UDashboardToolbar>

      <template v-if="!pending">
        <UDashboardPanelContent>
          <UBlogList v-if="filteredChapters.length" orientation="horizontal" :ui="{ wrapper: 'p-px overflow-y-auto gap-4 sm:grid sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5' }">
            <UBlogPost v-for="chapter in filteredChapters" :key="chapter.id" :to="localePath({ name: 'library-chapters-id', params: { id: chapter.id } })" :ui="{ wrapper: 'gap-y-1', title: 'text-sm', date: 'text-xs', authors: { wrapper: 'mt-0' }, image: { wrapper: 'pointer-events-auto' }, badge: { wrapper: 'absolute top-2 left-2.5 mb-0 py-0' } }">
              <template #image>
                <img class="cursor-pointer block object-cover object-top w-full h-full transform transition-transform duration-200 hover:scale-105" :src="chapter.image" :alt="chapter.name">
              </template>
              <template #default>
                <div class="flex items-center justify-between">
                  <div>
                    <h2 class="text-gray-900 dark:text-white font-semibold line-clamp-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200 text-sm">{{ chapter.name }}</h2>
                    <!-- <p class="line-clamp-2 text-gray-400 text-xs mt-0.5">{{ chapter.description || 'Description de test temporaire' }}</p> -->
                    <div class="flex items-center justify-start gap-1 mt-1">
                      <UIcon name="i-heroicons-clock" class="w-3.5 h-3.5 text-gray-400 dark:text-white" />
                      <p class="text-gray-400 text-xs">{{ chapter.updated_at === chapter.created_at ? 'Créé' : 'Modifié' }} {{ formatDistanceToNow(new Date(chapter.updated_at), { locale: frLocale, addSuffix: true }) }}</p>
                    </div>
                  </div>
                  <UDropdown :ui="{ wrapper: 'absolute top-2.5 right-2.5', item: { size: 'text-xs' }, width: 'w-auto' }" :items="[[{ label: 'Renommer', icon: 'i-heroicons-pencil-square' }, { label: 'Supprimer', icon: 'i-heroicons-trash', color: 'red', click: () => handleDelete(chapter) }]]" :popper="{ placement: 'bottom-end' }">
                    <UButton icon="i-heroicons-ellipsis-horizontal" variant="soft" color="gray" :padded="false" />
                  </UDropdown>
                </div>
              </template>
            </UBlogPost>
          </UBlogList>
          <p v-else class="text-center text-gray-400 dark:text-white text-sm mt-4">Aucun chapitre trouvé</p>
        </UDashboardPanelContent>

        <div class="p-2.5 flex items-center justify-center border-t border-gray-200">
          <UPagination size="xs" show-first show-last :page-count="chapters.per_page" :total="chapters.total" v-model="chapters.current_page" :max="5" />
        </div>
      </template>
    </UDashboardPanel>

    <UDashboardModal prevent-close v-model="isOpen" title="Créer un chapitre" :ui="{ width: 'sm:max-w-md' }">
      <UForm class="space-y-4" :state="fields" :validate="validate" @submit="onSubmit">
        <UFormGroup label="Titre" name="name">
          <UInput type="text" placeholder="Titre du chapitre" autofocus v-model="fields.name" />
        </UFormGroup>

        <div class="flex justify-end gap-3">
          <UButton label="Annuler" color="gray" variant="ghost" @click="isOpen = false" />
          <UButton :loading="isLoading" type="submit" label="Créer" color="black" />
        </div>
      </UForm>
    </UDashboardModal>

    <ChaptersDeleteChapterModal v-model="isDeleteChapterModalOpen" />
  </UDashboardPage>
</template>
