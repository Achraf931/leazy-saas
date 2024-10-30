<script setup lang="ts">
import { LessonsModal } from '#components'
import { sub } from 'date-fns'
import { useDebounce } from '@vueuse/core'

const modal = useModal()
const toast = useToast()

const q = ref('')
const chapters = ref([])
const themes = ref([])
const levels = ref([])
const { get } = useApi('lessons')
const page = ref(1)
const range = ref<Range>({ start: sub(new Date(), { years: 1 }), end: new Date() })

const filters = computed(() => ({
  page: page.value,
  search: q.value,
  chapters: chapters.value.map(chapter => chapter.name).join(','),
  themes: themes.value.map(theme => theme.name).join(','),
  levels: levels.value.map(level => level.name).join(','),
  start: range.value.start.toISOString(),
  end: range.value.end.toISOString()
}))

// Débounce sur le changement de tous les filtres
const debouncedFilters = useDebounce(filters, 300)

const { data: lessons, status, refresh, error } = await useAsyncData(
    'lessons',
    () =>
        get(null, {
          page: debouncedFilters.value.page,
          ...(debouncedFilters.value.chapters && { chapter: debouncedFilters.value.chapters }),
          ...(debouncedFilters.value.themes && { theme: debouncedFilters.value.themes }),
          ...(debouncedFilters.value.search && { search: debouncedFilters.value.search }),
          ...(debouncedFilters.value.levels && { level: debouncedFilters.value.levels }),
          ...(debouncedFilters.value.start && { start: debouncedFilters.value.start }),
          ...(debouncedFilters.value.end && { end: debouncedFilters.value.end })
        }),
    {
      watch: [debouncedFilters]
    }
)

if (error.value) {
  toast.add({
    icon: 'i-heroicons-exclamation-circle',
    title: 'Erreur',
    description: 'Une erreur est survenue lors du chargement des leçons',
    color: 'red',
    actions: [{ label: 'Réessayer', click: () => refresh() }]
  })
}

const handleModal = () => {
  modal.open(LessonsModal, {
    onClose: () => modal.close()
  })
}

watch(q, () => {
  if (q.value === '') page.value = 1
})
</script>

<template>
  <UDashboardPage :ui="{ wrapper: 'overflow-hidden'}">
    <UDashboardPanel grow>
      <UDashboardToolbar>
        <template #left>
          <UInput v-model="q" icon="i-heroicons-magnifying-glass" placeholder="Rechercher une leçon" />

          <CommonsDateRangePicker v-model="range" class="ml-2.5" />
        </template>

        <template #right>
          <CommonsSelectMenu @update:model-value="levels = $event" endpoint="levels" placeholder="Niveaux" />
          <CommonsSelectMenu @update:model-value="chapters = $event" endpoint="chapters" placeholder="Chapitres" />
          <CommonsSelectMenu @update:model-value="themes = $event" endpoint="themes" placeholder="Thèmes" />

          <LazyUButton trailing-icon="i-heroicons-plus" @click="handleModal" label="Créer une leçon" />
        </template>
      </UDashboardToolbar>

      <UDashboardPanelContent>
        <UBlogList orientation="horizontal" :ui="{ wrapper: 'p-px overflow-y-auto gap-x-4 gap-y-6 sm:grid sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' }">
          <template v-if="status === 'pending'">
            <USkeleton v-for="n in 5" :key="n" class="rounded-lg w-full h-40 sm:h-44 xl:h-48 2xl:h-52" />
          </template>
          <Suspense v-else-if="status !== 'pending' && lessons.data.length">
            <LessonsCard v-for="lesson in lessons.data" :key="lesson.id" :lesson :refresh redirect />
          </Suspense>
          <p v-else class="text-center text-gray-400 dark:text-white text-sm mt-4">Aucune leçon trouvée</p>
        </UBlogList>
      </UDashboardPanelContent>

      <div v-if="lessons.data.length && lessons?.last_page > 1" class="p-2.5 flex items-center justify-center border-t border-gray-200 dark:border-gray-800">
        <UPagination size="xs" show-first show-last :page-count="lessons.per_page" :total="lessons.total" v-model="page" :max="5" />
      </div>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style>
.preview-editor {
  margin: 0!important;

  .tiptap.ProseMirror {
    padding: 0!important;

    & > * {
      margin: 0!important;
      padding: 0!important;
      font-size: calc(300px/47.5)!important;
      line-height: normal!important;
    }

    & img {
      max-width: 100%!important;
      height: auto!important;
      object-fit: cover!important;
    }
  }
}
</style>
