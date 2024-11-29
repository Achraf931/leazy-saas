<script lang="ts" setup>
import { CreateChapterModal } from '#components'
import { sub } from 'date-fns'

definePageMeta({
  title: 'Chapitres'
})

const localePath = useLocalePath()
const toast = useToast()
const modal = useModal()
const { setBreadcrumbs } = useDashboard()
const { get } = useApi('chapters')
const page = ref(1)
const range = ref<Range>({ start: sub(new Date(), { days: 14 }), end: new Date() })
const themes = ref([])

const {
  data: chapters,
  status,
  refresh,
  error
} = await useLazyAsyncData('chapters', () => get(null, { page: page.value }), { watch: [page] })

if (error.value) toast.add({
  icon: 'i-heroicons-exclamation-circle',
  title: 'Erreur',
  description: 'Une erreur est survenue lors du chargement des chapitres',
  color: 'red',
  actions: [{ label: 'Réessayer', click: () => refresh() }]
})

setBreadcrumbs([
  {
    label: 'Bibliothèque',
    to: localePath({ name: 'library' })
  },
  {
    label: 'Chapitres'
  }
])

const q = ref('')

const filteredChapters = computed(() => {
  return chapters.value?.filter(chapter => {
    return chapter.name.search(new RegExp(q.value, 'i')) !== -1
  }) || []
})

const handleModal = () => {
  modal.open(CreateChapterModal, {
    refresh,
    onClose: () => modal.close()
  })
}
</script>

<template>
  <UDashboardPage :ui="{  wrapper: 'overflow-hidden'}">
    <UDashboardPanel grow>
      <UDashboardToolbar>
        <template #left>
          <UInput v-model="q" icon="i-heroicons-magnifying-glass" placeholder="Rechercher un chapitre" />
          
          <DateRangePicker v-model="range" class="ml-2.5" />
        </template>
        
        <template #right>
          <Suspense>
            <FilterSelectMenu endpoint="themes" placeholder="Thèmes" @update:model-value="themes = $event" />
          </Suspense>
          
          <UButton label="Créer un chapitre" trailing-icon="i-heroicons-plus" @click="handleModal" />
        </template>
      </UDashboardToolbar>
      
      <UDashboardPanelContent>
        <p
          v-if="status !== 'pending' && !filteredChapters.length"
          class="text-center text-gray-400 dark:text-white text-sm mt-4"
        >Aucun chapitre trouvé</p>
        <UBlogList
          :ui="{ wrapper: 'p-px overflow-y-auto gap-4 sm:grid sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' }"
          orientation="horizontal"
        >
          <template v-if="status === 'pending'">
            <USkeleton v-for="n in 5" :key="n" class="rounded-lg w-full h-40 sm:h-44 xl:h-48 2xl:h-52" />
          </template>
          <template v-else-if="status !== 'pending' && filteredChapters.length">
            <ChapterCard v-for="chapter in filteredChapters" :key="chapter.id" :chapter :refresh />
          </template>
        </UBlogList>
      </UDashboardPanelContent>
      
      <div
        v-if="filteredChapters && chapters?.last_page > 1"
        class="p-2.5 flex items-center justify-center border-t border-gray-200 dark:border-gray-800"
      >
        <UPagination
          v-model="page" :max="5" :page-count="chapters.per_page" :total="chapters.total" show-first show-last size="xs"
        />
      </div>
    </UDashboardPanel>
  </UDashboardPage>
</template>
