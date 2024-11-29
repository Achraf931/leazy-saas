<script lang="ts" setup>
import { formatDistanceToNow } from 'date-fns'
import frLocale from 'date-fns/locale/fr'
import { z } from 'zod'
import { ConfirmDeleteChapterModal, ConfirmDeleteLessonModal } from '#components'
import type { Form, FormSubmitEvent } from '#ui/types'

definePageMeta({
  title: 'Chapitres'
})

const schema = z.object({
  id: z.any(),
  name: z.string().min(1, 'Le titre est requis.'),
  description: z.string().optional(),
  theme_id: z.any().refine(option => option?.id !== null, { message: 'Le thème est requis.' }),
  image: z.string().optional()
})

type Schema = z.output<typeof schema>

const toast = useToast()
const modal = useModal()
const localePath = useLocalePath()
const { setBreadcrumbs } = useDashboard()
const { get, patch, del } = useApi('chapters')
const loading = ref(false)
const selected = ref([])
const pending = ref(false)
const documentId = computed(() => useRoute().params.id)
const { data: chapter, refresh, error } = await useAsyncData('chapter', () => get(documentId.value))

if (error.value) toast.add({
  icon: 'i-heroicons-exclamation-circle',
  title: 'Erreur',
  description: 'Une erreur est survenue lors du chargement du chapitre',
  color: 'red',
  actions: [{ label: 'Réessayer', click: () => refresh() }]
})

setBreadcrumbs([
  {
    label: 'Bibliothèque',
    to: localePath({ name: 'library' })
  },
  {
    label: 'Chapitres',
    to: localePath({ name: 'library-chapters' })
  },
  {
    label: chapter.value?.name
  }
])

const form = ref<Form<Schema>>()
const state = reactive<Schema>({
  id: documentId.value,
  name: chapter.value?.name || '',
  description: chapter.value?.description || '',
  image: chapter.value?.image || 'https://designshack.net/wp-content/uploads/placeholder-image-368x247.png',
  theme_id: chapter.value?.theme_id || ''
})

const searchable = async (q: string) => {
  loading.value = true
  
  const themes: any[] = await get(null, { q }, 'themes')
  
  loading.value = false
  
  return 'data' in themes ? themes.data : themes
}

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

const selectedColumns = ref(columns)
const columnsTable = computed(() => columns.filter((column) => selectedColumns.value.includes(column)))

// Selected Rows
const selectedRows = ref([])

function select(row) {
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
  return lessons?.slice().sort((a, b) => {
    if (a[column] < b[column]) {
      return direction === 'asc' ? -1 : 1
    } else if (a[column] > b[column]) {
      return direction === 'asc' ? 1 : -1
    }
    return 0
  }) || []
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

const deleteLesson = async (id) => {
  await del(id, 'lessons')
}

const deleteSelected = async () => {
  selectedRows.value.map(item => deleteLesson(item.id))
}

const handleDelete = () => {
  modal.open(ConfirmDeleteChapterModal, {
    chapter: chapter.value,
    redirect: true,
    refresh,
    onClose: () => modal.close()
  })
}

const handleDeleteLesson = (lesson) => {
  modal.open(ConfirmDeleteLessonModal, {
    lesson,
    refresh,
    onClose: () => modal.close()
  })
}

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  pending.value = true
  form.value?.clear()
  const response = await patch(event.data)
  
  if (response) {
    toast.add({ icon: 'i-heroicons-check-circle', title: 'Chapitre mis à jour', color: 'green' })
    
    pending.value = false
    return refresh()
  }
  
  pending.value = false
}
</script>

<template>
  <UDashboardPage :ui="{ wrapper: 'overflow-hidden' }">
    <UDashboardPanelContent>
      <div class="w-full flex items-center justify-between mb-4">
        <h1 class="font-bold text-xl">{{ chapter.name }}</h1>
        
        <UButton color="red" icon="i-heroicons-trash" label="Supprimer" size="xs" @click="handleDelete" />
      </div>
      
      <section class="flex-1 flex flex-col md:flex-row gap-5 p-px overflow-hidden w-full">
        <div class="flex flex-col gap-3">
          <NuxtImg
            :alt="chapter.name"
            :src="chapter.image"
            class="rounded-lg w-full aspect-video max-w-auto object-cover md:max-w-72"
            layout="responsive"
          />
          
          <p v-if="chapter.description" class="text-sm">{{ chapter.description }}</p>
          <div class="flex items-center justify-start gap-1">
            <UIcon class="w-3.5 h-3.5 text-gray-400" name="i-heroicons-clock" />
            <p class="text-gray-400 text-xs">Créé
              {{ formatDistanceToNow(new Date(chapter.created_at), { locale: frLocale, addSuffix: true }) }}</p>
          </div>
          <div class="flex items-center justify-start gap-1">
            <UIcon class="w-3.5 h-3.5 text-gray-400" name="i-heroicons-clock" />
            <p class="text-gray-400 text-xs">Modifié
              {{ formatDistanceToNow(new Date(chapter.updated_at), { locale: frLocale, addSuffix: true }) }}</p>
          </div>
        </div>
        
        <UCard :ui="{ base: 'overflow-scroll flex-1' }">
          <UForm
            ref="form"
            :schema="schema"
            :state="state"
            class="space-y-4"
            @submit="onSubmit"
          >
            <h3 class="font-semibold">Détails</h3>
            <UFormGroup label="Titre" name="name" required>
              <UInput v-model="state.name" name="name" placeholder="Titre du chapitre" />
            </UFormGroup>
            <UFormGroup hint="Optionnel" label="Description" name="description">
              <UTextarea v-model="state.description" name="description" placeholder="Description du chapitre" />
            </UFormGroup>
            <UFormGroup label="Thème associé" name="theme_id" required>
              <USelectMenu
                v-model="state.theme_id"
                :loading="loading"
                :searchable="searchable"
                :searchable-lazy="true"
                class="w-full"
                name="theme_id"
                option-attribute="name"
                placeholder="Sélectionner un thème"
                searchable-placeholder="Rechercher un thème"
                value-attribute="id"
              />
            </UFormGroup>
            <UButton label="Sauvegarder" size="xs" type="submit" />
          </UForm>
          
          <UDivider class="w-full my-5" orientation="horizontal" />
          
          <UFormGroup label="Leçons">
            <UCard
              :ui="{
                  divide: 'divide-y divide-gray-200 dark:divide-gray-700',
                  header: { padding: 'px-4 py-5' },
                  body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
                  footer: { padding: 'p-4' }
                }"
              class="w-full"
            >
              <div class="flex justify-between items-center w-full px-4 py-3 gap-1.5">
                <UInput
                  v-model="search" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Rechercher..." size="xs"
                />
                
                <div class="flex gap-1.5 items-center">
                  <UDropdown v-if="selectedRows.length > 1" :items="actions" :ui="{ width: 'w-36' }">
                    <UButton
                      color="gray"
                      icon="i-heroicons-chevron-down"
                      size="xs"
                      trailing
                    >
                      Mark as
                    </UButton>
                  </UDropdown>
                  
                  <USelectMenu v-model="selectedColumns" :options="columns" multiple>
                    <UButton
                      color="gray"
                      icon="i-heroicons-view-columns"
                      size="xs"
                    >
                      Columns
                    </UButton>
                  </USelectMenu>
                  
                  <UButton
                    :disabled="search === '' && selectedStatus.length === 0"
                    color="gray"
                    icon="i-heroicons-funnel"
                    size="xs"
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
                :columns="columnsTable"
                :loading="pending"
                :rows="filteredLessons"
                :ui="{ td: { base: 'max-w-[0] truncate', padding: 'px-2 py-2' }, th: { padding: 'px-2 py-1.5' } }"
                class="w-full"
                sort-asc-icon="i-heroicons-arrow-up"
                sort-desc-icon="i-heroicons-arrow-down"
                sort-mode="manual"
              >
                <template #draft-data="{ row }">
                  <UBadge
                    :color="row.draft ? 'orange' : 'emerald'" :label="row.draft ? 'Brouillon' : 'Publié'" size="xs"
                    variant="subtle"
                  />
                </template>
                
                <template #private-data="{ row }">
                  <UBadge
                    :color="row.private ? 'primary' : 'emerald'" :label="row.private ? 'Privée' : 'Publique'" size="xs"
                    variant="subtle"
                  />
                </template>
                
                <template #actions-data="{ row }">
                  <div class="flex items-center gap-2">
                    <UButton
                      color="red" icon="i-heroicons-trash" label="Supprimer" size="xs" variant="soft"
                      @click="handleDeleteLesson(row)"
                    />
                    <UButton
                      :to="localePath({ name: 'lesson_id', params: { id: row.id } })"
                      label="Voir" size="xs" trailing-icon="i-heroicons-chevron-right-20-solid" variant="soft"
                    />
                  </div>
                </template>
              </UTable>
            </UCard>
          </UFormGroup>
        </UCard>
      </section>
    </UDashboardPanelContent>
  </UDashboardPage>
</template>
