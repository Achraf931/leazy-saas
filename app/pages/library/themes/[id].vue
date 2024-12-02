<script lang="ts" setup>
import { formatDistanceToNow } from 'date-fns'
import frLocale from 'date-fns/locale/fr'
import { z } from 'zod'
import { ConfirmDeleteChapterModal, ConfirmDeleteThemeModal } from '#components'
import type { Form, FormSubmitEvent } from '#ui/types'

definePageMeta({
  title: 'Thèmes'
})

const schema = z.object({
  id: z.any(),
  name: z.string().min(1, 'Le titre est requis.'),
  discipline_id: z.any().refine(option => option?.id !== null, { message: 'La discipline est requise.' })
})

type Schema = z.output<typeof schema>

const toast = useToast()
const modal = useModal()
const localePath = useLocalePath()
const { setBreadcrumbs } = useDashboard()
const { get, patch, del } = useApi('themes')
const documentId = computed(() => useRoute().params.id)
const pending = ref(false)
const loading = ref(false)
const { data: theme, refresh, error } = await useAsyncData('theme', () => get(documentId.value))

if (error.value) toast.add({
  icon: 'i-heroicons-exclamation-circle',
  title: 'Erreur',
  description: 'Une erreur est survenue lors du chargement du thème',
  color: 'red',
  actions: [{ label: 'Réessayer', click: () => refresh() }]
})

setBreadcrumbs([
  {
    label: 'Bibliothèque',
    to: localePath({ name: 'library' })
  },
  {
    label: 'Thèmes',
    to: localePath({ name: 'library-themes' })
  },
  {
    label: theme.value?.name
  }
])

const form = ref<Form<Schema>>()
const state = reactive<Schema>({
  id: documentId.value,
  name: theme.value?.name || '',
  discipline_id: theme.value?.discipline_id || null
})

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

const searchable = async (q: string) => {
  loading.value = true
  
  const disciplines: any[] = await get(null, { q }, 'disciplines')
  
  loading.value = false
  
  return 'data' in disciplines ? disciplines.data : disciplines
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

const handleDelete = () => {
  modal.open(ConfirmDeleteThemeModal, {
    theme: theme.value,
    redirect: true,
    refresh,
    onClose: () => modal.close()
  })
}

const handleDeleteChapter = (chapter) => {
  modal.open(ConfirmDeleteChapterModal, {
    chapter,
    refresh,
    onClose: () => modal.close()
  })
}

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  pending.value = true
  form.value?.clear()
  const response = await patch(event.data)
  
  if (response) {
    toast.add({ icon: 'i-heroicons-check-circle', title: 'Thème modifié', color: 'green' })
    
    pending.value = false
    return refresh()
  }
  
  pending.value = false
}
</script>

<template>
  <UDashboardPage v-if="theme" :ui="{ wrapper: 'overflow-hidden' }">
    <UDashboardPanelContent>
      <div class="w-full flex items-center justify-between mb-4">
        <h1 class="font-bold text-xl">{{ theme.name }}</h1>
        
        <UButton color="red" icon="i-heroicons-trash" label="Supprimer" size="xs" @click="handleDelete" />
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
            <UIcon class="w-3.5 h-3.5 text-gray-400" name="i-heroicons-clock" />
            <p v-if="theme.created_at" class="text-gray-400 text-xs">Créé
              {{ formatDistanceToNow(new Date(theme.created_at), { locale: frLocale, addSuffix: true }) }}</p>
          </div>
          <div class="flex items-center justify-start gap-1">
            <UIcon class="w-3.5 h-3.5 text-gray-400" name="i-heroicons-clock" />
            <p v-if="theme.updated_at" class="text-gray-400 text-xs">Modifié
              {{ formatDistanceToNow(new Date(theme.updated_at), { locale: frLocale, addSuffix: true }) }}</p>
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
            <UFormGroup label="Discipline associé" name="discipline_id" required>
              <USelectMenu
                v-model="state.discipline_id"
                :loading="loading"
                :searchable="searchable"
                :searchable-lazy="true"
                class="w-full"
                name="discipline_id"
                option-attribute="name"
                placeholder="Sélectionner un discipline"
                searchable-placeholder="Rechercher une discipline"
                trailing
                value-attribute="id"
              />
            </UFormGroup>
            <UButton :loading="pending" label="Sauvegarder" size="xs" type="submit" />
          </UForm>
          
          <UDivider class="w-full my-5" orientation="horizontal" />
          
          <UFormGroup label="Chapitres">
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
                  <UButton
                    v-if="selectedRows.length > 1" color="red" icon="i-heroicons-x-mark" size="xs"
                    @click="deleteSelected"
                  />
                  
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
                :rows="filteredChapters"
                :ui="{ td: { base: 'max-w-[0] truncate', padding: 'px-2 py-2' }, th: { padding: 'px-2 py-1.5' } }"
                class="w-full"
                sort-asc-icon="i-heroicons-arrow-up"
                sort-desc-icon="i-heroicons-arrow-down"
                sort-mode="manual"
              >
                <template #actions-data="{ row }">
                  <div class="flex items-center gap-2">
                    <UButton
                      color="red" icon="i-heroicons-trash" label="Supprimer" size="xs" variant="soft"
                      @click="handleDeleteChapter(row)"
                    />
                    <UButton
                      :to="localePath({ name: 'library-chapters-id', params: { id: row.id } })"
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
