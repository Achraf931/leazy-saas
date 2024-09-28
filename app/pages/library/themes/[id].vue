<script setup lang="ts">
import { formatDistanceToNow } from "date-fns";
import frLocale from "date-fns/locale/fr";

const localePath = useLocalePath()
const { get, del } = useApi('themes')
const documentId = computed(() => useRoute().params.id)
const { data: theme, refresh, error } = await useAsyncData('theme', () => get(documentId.value))

const isDeleteThemeModalOpen = ref({ open: false, theme: null, redirect: true })
const isDeleteChapterModalOpen = ref({ open: false, chapter: null, refresh, redirect: false })

const columns = [{
  key: 'id',
  label: '#',
  sortable: true
}, {
  key: 'name',
  label: 'Titre',
  sortable: true
}, {
  key: 'actions',
  label: 'Actions',
  sortable: false
}]

const handleDelete = () => {
  isDeleteThemeModalOpen.value.open = true
  isDeleteThemeModalOpen.value.theme = theme.value
}

const handleDeleteChapter = chapter => {
  isDeleteChapterModalOpen.value.open = true
  isDeleteChapterModalOpen.value.chapter = chapter
}

const selectedColumns = ref(columns)
const columnsTable = computed(() => columns.filter((column) => selectedColumns.value.includes(column)))

// Selected Rows
const selectedRows = ref([])

function select (row) {
  const index = selectedRows.value.findIndex((item) => item.id === row.id)
  if (index === -1) {
    selectedRows.value.push(row)
  } else {
    selectedRows.value.splice(index, 1)
  }
}

// Actions
const actions = [
  [{
    key: 'delete',
    label: 'Supprimer',
    icon: 'i-heroicons-x-mark'
  }]
]

const search = ref('')
const selectedStatus = ref([])

const resetFilters = () => {
  search.value = ''
  selectedStatus.value = []
}

// Pagination
const sort = ref({ column: 'id', direction: 'asc' as const })
const page = ref(1)

// Method to handle sorting
const sortChapters = (chapters, column, direction) => {
  return chapters?.slice().sort((a, b) => {
    if (a[column] < b[column]) {
      return direction === 'asc' ? -1 : 1
    } else if (a[column] > b[column]) {
      return direction === 'asc' ? 1 : -1
    }
    return 0
  }) || []
}

// Method to handle searching
const filterChapters = (chapters, search) => {
  if (!search) return chapters
  return chapters.filter(chapter => chapter.name.toLowerCase().includes(search.toLowerCase()))
}

// Computed property to get filtered and sorted lessons
const filteredChapters = computed(() => {
  const filtered = filterChapters(theme.value?.chapters, search.value)
  return sortChapters(filtered, sort.value.column, sort.value.direction)
})

const deleteChapter = async (id) => {
  await del(id, 'chapters')
}

const deleteSelected = async () => {
  selectedRows.value.map(item => deleteChapter(item.id))
}
</script>

<template>
  <UDashboardPage v-if="theme" :ui="{ wrapper: 'overflow-hidden' }">
    <UDashboardPanelContent>
      <div class="w-full flex items-center justify-between mb-4">
        <h1 class="font-bold text-xl">{{ theme.name }}</h1>

        <UButton icon="i-heroicons-trash" label="Supprimer" color="red" size="xs" @click="handleDelete" />
      </div>

      <section class="flex-1 flex flex-col md:flex-row gap-5 p-px overflow-hidden w-full">
        <div class="flex flex-col gap-3">
          <NuxtImg
              :src="theme.image || 'https://imgproxy.services.pitch.com/_/resizing_type:fit/plain/pitch-publish-user-assets/templates/posters/moodboard.jpg'"
              alt="Random image"
              class="rounded-lg w-full aspect-video max-w-auto object-cover md:max-w-72"
              layout="responsive"
          />

          <p v-if="theme.description" class="text-sm">{{ theme.description }}</p>
          <div class="flex items-center justify-start gap-1">
            <UIcon name="i-heroicons-clock" class="w-3.5 h-3.5 text-gray-400" />
            <p v-if="theme.created_at" class="text-gray-400 text-xs">Créé {{ formatDistanceToNow(new Date(theme.created_at), { locale: frLocale, addSuffix: true }) }}</p>
          </div>
          <div class="flex items-center justify-start gap-1">
            <UIcon name="i-heroicons-clock" class="w-3.5 h-3.5 text-gray-400" />
            <p v-if="theme.updated_at" class="text-gray-400 text-xs">Modifié {{ formatDistanceToNow(new Date(theme.updated_at), { locale: frLocale, addSuffix: true }) }}</p>
          </div>
        </div>

        <UCard :ui="{ base: 'overflow-scroll flex-1' }">
          <UForm class="space-y-3">
            <h3 class="font-semibold">Détails</h3>
            <UFormGroup label="Titre">
              <UInput placeholder="Titre du chapitre" v-model="theme.name" />
            </UFormGroup>
            <UFormGroup v-if="theme.description" label="Description">
              <UTextarea placeholder="Description du chapitre" v-model="theme.description"/>
            </UFormGroup>
            <UButton size="xs" label="Sauvegarder" />
          </UForm>

          <UDivider orientation="horizontal" class="w-full my-5" />

          <UFormGroup label="Chapitres">
            <UCard
                class="w-full"
                :ui="{
                  divide: 'divide-y divide-gray-200 dark:divide-gray-700',
                  header: { padding: 'px-4 py-5' },
                  body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
                  footer: { padding: 'p-4' }
                }"
            >
              <div class="flex justify-between items-center w-full px-4 py-3 gap-1.5">
                <UInput v-model="search" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Rechercher..." size="xs" />

                <div class="flex gap-1.5 items-center">
                  <UButton v-if="selectedRows.length > 1" icon="i-heroicons-x-mark" color="red" size="xs" @click="deleteSelected" />

                  <USelectMenu v-model="selectedColumns" :options="columns" multiple>
                    <UButton
                        icon="i-heroicons-view-columns"
                        color="gray"
                        size="xs"
                    >
                      Columns
                    </UButton>
                  </USelectMenu>

                  <UButton
                      icon="i-heroicons-funnel"
                      color="gray"
                      size="xs"
                      :disabled="search === '' && selectedStatus.length === 0"
                      @click="resetFilters"
                  >
                    Reset
                  </UButton>
                </div>
              </div>

              <!-- Table -->
              <UTable
                  v-model="selectedRows"
                  v-model:sort="sort"
                  :rows="filteredChapters"
                  :columns="columnsTable"
                  :loading="pending"
                  sort-asc-icon="i-heroicons-arrow-up"
                  sort-desc-icon="i-heroicons-arrow-down"
                  sort-mode="manual"
                  class="w-full"
                  :ui="{ td: { base: 'max-w-[0] truncate', padding: 'px-2 py-2' }, th: { padding: 'px-2 py-1.5' } }"
              >
                <template #actions-data="{ row }">
                  <div class="flex items-center gap-2">
                    <UButton icon="i-heroicons-trash" variant="soft" label="Supprimer" color="red" size="xs" @click="handleDeleteChapter(row)" />
                    <UButton :to="localePath({ name: 'library-chapters-id', params: { id: row.id } })" trailing-icon="i-heroicons-chevron-right-20-solid" variant="soft" label="Voir" size="xs" />
                  </div>
                </template>
              </UTable>
            </UCard>
          </UFormGroup>
        </UCard>
      </section>
    </UDashboardPanelContent>

    <ThemesDeleteThemeModal v-model="isDeleteThemeModalOpen" />
    <ChaptersDeleteChapterModal v-model="isDeleteChapterModalOpen" />
  </UDashboardPage>
</template>
