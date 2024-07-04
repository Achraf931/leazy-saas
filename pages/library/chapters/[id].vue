<script setup lang="ts">
import { useChaptersStore } from '@/stores/library'
import { formatDistanceToNow } from "date-fns";
import frLocale from "date-fns/locale/fr";

const localePath = useLocalePath()
const documentId = computed(() => useRoute().params.id)
const client = useSanctumClient()
const { data: chapter, refresh, error } = await useAsyncData('chapter', async () => client(`/api/teacher/chapters/${documentId.value}`))

if (error.value) await navigateTo(localePath({ name: 'library-chapters' }))

const isDeleteChapterModalOpen = ref({ open: false, chapter: null, refresh })
const isDeleteLessonModalOpen = ref({ open: false, lesson: null, refresh })

const columns = [{
  key: 'id',
  label: '#',
  sortable: true
}, {
  key: 'name',
  label: 'Titre',
  sortable: true
}, {
  key: 'description',
  label: 'Description',
  sortable: true
}, {
  key: 'draft',
  label: 'Brouillon',
  sortable: true
}, {
  key: 'private',
  label: 'Publique',
  sortable: true
}, {
  key: 'actions',
  label: 'Actions',
  sortable: false
}]

const handleDelete = () => {
  isDeleteChapterModalOpen.value.open = true
  isDeleteChapterModalOpen.value.chapter = chapter
}

const handleDeleteLesson = lesson => {
  isDeleteLessonModalOpen.value.open = true
  isDeleteLessonModalOpen.value.lesson = lesson
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
    key: 'completed',
    label: 'Completed',
    icon: 'i-heroicons-check'
  }], [{
    key: 'uncompleted',
    label: 'In Progress',
    icon: 'i-heroicons-arrow-path'
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
const sortLessons = (lessons, column, direction) => {
  return lessons.slice().sort((a, b) => {
    if (a[column] < b[column]) {
      return direction === 'asc' ? -1 : 1
    } else if (a[column] > b[column]) {
      return direction === 'asc' ? 1 : -1
    }
    return 0
  })
}

// Method to handle searching
const filterLessons = (lessons, search) => {
  if (!search) return lessons
  return lessons.filter(lesson =>
      lesson.name.toLowerCase().includes(search.toLowerCase()) ||
      lesson.description.toLowerCase().includes(search.toLowerCase())
  )
}

// Computed property to get filtered and sorted lessons
const filteredLessons = computed(() => {
  const filtered = filterLessons(chapter.value?.lessons, search.value)
  return sortLessons(filtered, sort.value.column, sort.value.direction)
})
</script>

<template>
  <UDashboardPage :ui="{ wrapper: 'overflow-hidden' }">
    <UDashboardPanelContent>
      <div class="w-full flex items-center justify-between mb-4">
        <h1 class="font-bold text-xl">{{ chapter.name }}</h1>

        <UButton icon="i-heroicons-trash" label="Supprimer" color="red" size="xs" @click="handleDelete" />
      </div>

      <section class="flex-1 flex flex-col md:flex-row gap-5 p-px overflow-hidden w-full">
        <div class="flex flex-col gap-3">
          <NuxtImg
              :src="chapter.image || 'https://imgproxy.services.pitch.com/_/resizing_type:fit/plain/pitch-publish-user-assets/templates/posters/moodboard.jpg'"
              alt="Random image"
              class="rounded-lg w-full aspect-video max-w-auto object-cover md:max-w-72"
              layout="responsive"
          />

          <p v-if="chapter.description" class="text-sm">{{ chapter.description }}</p>
          <div class="flex items-center justify-start gap-1">
            <UIcon name="i-heroicons-clock" class="w-3.5 h-3.5 text-gray-400" />
            <p class="text-gray-400 text-xs">Créé {{ formatDistanceToNow(new Date(chapter.created_at), { locale: frLocale, addSuffix: true }) }}</p>
          </div>
          <div class="flex items-center justify-start gap-1">
            <UIcon name="i-heroicons-clock" class="w-3.5 h-3.5 text-gray-400" />
            <p class="text-gray-400 text-xs">Modifié {{ formatDistanceToNow(new Date(chapter.updated_at), { locale: frLocale, addSuffix: true }) }}</p>
          </div>
        </div>

        <UCard :ui="{ base: 'overflow-scroll flex-1' }">
          <UForm class="space-y-3">
            <h3 class="font-semibold">Détails</h3>
            <UFormGroup label="Titre">
              <UInput placeholder="Titre du chapitre" v-model="chapter.name" />
            </UFormGroup>
            <UFormGroup label="Description">
              <UTextarea placeholder="Description du chapitre" v-model="chapter.description"/>
            </UFormGroup>
            <UFormGroup label="Thème associé">
              <USelect :options="['Option 1', 'Option 2', 'Option 3']" />
            </UFormGroup>
            <UButton size="xs" label="Sauvegarder" />
          </UForm>

          <UDivider orientation="horizontal" class="w-full my-5" />

          <UFormGroup label="Leçons">
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
                  <UDropdown v-if="selectedRows.length > 1" :items="actions" :ui="{ width: 'w-36' }">
                    <UButton
                        icon="i-heroicons-chevron-down"
                        trailing
                        color="gray"
                        size="xs"
                    >
                      Mark as
                    </UButton>
                  </UDropdown>

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
                  :rows="filteredLessons"
                  :columns="columnsTable"
                  :loading="pending"
                  sort-asc-icon="i-heroicons-arrow-up"
                  sort-desc-icon="i-heroicons-arrow-down"
                  sort-mode="manual"
                  class="w-full"
                  :ui="{ td: { base: 'max-w-[0] truncate', padding: 'px-2 py-2' }, th: { padding: 'px-2 py-1.5' } }"
                  @select="select"
              >
                <template #draft-data="{ row }">
                  <UBadge size="xs" :label="row.draft ? 'Brouillon' : 'Publié'" :color="row.draft ? 'orange' : 'emerald'" variant="subtle" />
                </template>

                <template #private-data="{ row }">
                  <UButton
                      v-if="!row.private"
                      icon="i-heroicons-check"
                      size="2xs"
                      color="emerald"
                      variant="outline"
                      :ui="{ rounded: 'rounded-full' }"
                      square
                  />

                  <UButton
                      v-else
                      icon="i-heroicons-x-mark"
                      size="2xs"
                      color="orange"
                      variant="outline"
                      :ui="{ rounded: 'rounded-full' }"
                      square
                  />
                </template>

                <template #actions-data="{ row }">
                  <UButton icon="i-heroicons-x-mark" color="red" size="xs" @click="handleDeleteLesson(row)" />
                </template>
              </UTable>
            </UCard>
          </UFormGroup>
        </UCard>
      </section>
    </UDashboardPanelContent>

    <ChaptersDeleteChapterModal v-model="isDeleteChapterModalOpen" />
    <LessonsDeleteLessonModal v-model="isDeleteLessonModalOpen" />
  </UDashboardPage>
</template>
