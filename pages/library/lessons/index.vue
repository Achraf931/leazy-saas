<script setup>
import { sub, formatDistanceToNow } from 'date-fns'
import frLocale from 'date-fns/locale/fr'

const router = useRouter()
const toast = useToast()

const client = useSanctumClient()

const { data: lessons, pending, error, refresh } = await useAsyncData('lessons', () => client('/api/teacher/lessons'))
const localePath = useLocalePath()

const q = ref('')

const isOpen = ref(false)

const links = [
  {
    label: 'Bibliothèque',
    to: localePath({ name: 'library' })
  },
  {
    label: 'Leçons',
    to: localePath({ name: 'library-lessons' })
  }
]

const isDeleteLessonModalOpen = ref({ open: false, lesson: null, refresh })

const range = ref({ start: sub(new Date(), { days: 14 }), end: new Date() })
const period = ref('daily')

const isLoading = ref(false)
const selected = ref([])
const selectedThemes = ref([])
const chapters = [
  { label: 'Chapter 1', value: 'chapter-1' },
  { label: 'Chapter 2', value: 'chapter-2' },
  { label: 'Chapter 3', value: 'chapter-3' },
  { label: 'Chapter 4', value: 'chapter-4' }
]
const themes = [
  { label: 'Theme 1', value: 'theme-1' },
  { label: 'Theme 2', value: 'theme-2' },
  { label: 'Theme 3', value: 'theme-3' },
  { label: 'Theme 4', value: 'theme-4' }
]

const filteredLessons = computed(() => {
  return lessons.value?.data.filter(lesson => {
    return lesson.name.search(new RegExp(q.value, 'i')) !== -1 || lesson.description.search(new RegExp(q.value, 'i')) !== -1
  })
})

const handleDelete = (e, lesson) => {
  e.preventDefault()
  e.stopPropagation()
  isDeleteLessonModalOpen.value.open = true
  isDeleteLessonModalOpen.value.lesson = lesson
}

const fields = reactive({
  name: undefined,
  description: undefined
})

const validate = (state) => {
  const errors = []

  if (!state.name) errors.push({ path: 'name', message: 'Le titre est requis' })

  return errors
}

const onSubmit = async (state) => {
  isLoading.value = true
  const response = await client('/api/teacher/lessons', { method: 'POST', body: { ...state.data } })

  if (response) setTimeout(async () => {
    isLoading.value = false
    isOpen.value = false
    await router.push(localePath({ name: 'library-lessons-id', params: { id: response.id } }))
    toast.add({ icon: 'i-heroicons-check-circle', title: 'Nouvelle leçon crée', color: 'green' })
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
          <UButton trailing-icon="i-heroicons-plus" @click="isOpen = true" label="Créer une leçon" />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <UInput v-model="q" icon="i-heroicons-magnifying-glass" placeholder="Rechercher une leçon" />

          <!-- ~/components/home/HomeDateRangePicker.vue -->
          <HomeDateRangePicker v-model="range" class="ml-2.5" />
        </template>

        <template #right>
          <USelectMenu v-slot="{ open }" v-model="selectedThemes" :options="themes" option-attribute="label" multiple placeholder="Select chapters">
            <UButton color="gray" :label="'Themes: ' + selectedThemes.length">
              <template #trailing>
                <UIcon name="i-heroicons-chevron-right-20-solid" :class="[open && 'transform rotate-90']" />
              </template>
            </UButton>
          </USelectMenu>

          <USelectMenu v-slot="{ open }" v-model="selected" :options="chapters" option-attribute="label" multiple placeholder="Select chapters">
            <UButton color="gray" :label="'Chapters: ' + selected.length">
              <template #trailing>
                <UIcon name="i-heroicons-chevron-right-20-solid" :class="[open && 'transform rotate-90']" />
              </template>
            </UButton>
          </USelectMenu>
        </template>
      </UDashboardToolbar>

      <template v-if="!pending">
        <UDashboardPanelContent>
          <UBlogList v-if="filteredLessons.length" orientation="horizontal" :ui="{ wrapper: 'p-px overflow-y-auto gap-4 sm:grid sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5' }">
            <ULink v-for="lesson in filteredLessons" :key="lesson.id" :to="localePath({ name: 'library-lessons-id', params: { id: lesson.id } })" class="bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800 shadow rounded-lg text-xs flex flex-col items-start gap-4 p-3">
              <div class="flex items-start justify-between w-full">
                <div class="flex items-center justify-center rounded-lg bg-pink-100 p-2">
                  <UIcon name="i-heroicons-document-text" class="w-6 h-6 text-pink-400" />
                </div>
                <UDropdown :ui="{ item: { size: 'text-xs' }, width: 'w-auto' }" :items="[[{ label: 'Renommer', icon: 'i-heroicons-pencil-square' }, { label: 'Supprimer', icon: 'i-heroicons-trash', color: 'red', click: (e) => handleDelete(e, lesson) }]]" :popper="{ placement: 'bottom-end' }">
                  <UButton icon="i-heroicons-ellipsis-vertical" variant="ghost" color="gray" :padded="false" />
                </UDropdown>
              </div>
              <div>
                <h2 class="text-gray-900 dark:text-white font-semibold line-clamp-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200 text-base">{{ lesson.name }}</h2>
                <p class="line-clamp-2 text-gray-400 text-xs mt-0.5">{{ lesson.description }}</p>
              </div>
              <div v-if="lesson.chapter" class="flex items-start gap-2">
                <UBadge v-if="lesson.chapter.theme" variant="soft" color="yellow" size="xs">{{ lesson.chapter.theme.name }}</UBadge>
                <UBadge variant="soft" color="blue" size="xs">{{ lesson.chapter.name }}</UBadge>
              </div>
              <div class="flex items-center justify-start gap-1 mt-auto">
                <UIcon name="i-heroicons-clock" class="w-3.5 h-3.5 text-gray-400 dark:text-white" />
                <p class="text-gray-400 text-xs">{{ lesson.updated_at === lesson.created_at ? 'Créé' : 'Modifié' }} {{ formatDistanceToNow(new Date(lesson.updated_at), { locale: frLocale, addSuffix: true }) }}</p>
              </div>
            </ULink>
          </UBlogList>
          <p v-else class="text-center text-gray-400 dark:text-white text-sm mt-4">Aucune leçon trouvée</p>
        </UDashboardPanelContent>

        <div v-if="filteredLessons" class="p-2.5 flex items-center justify-center border-t border-gray-200">
          <UPagination size="xs" show-first show-last :page-count="lessons.per_page" :total="lessons.total" v-model="lessons.current_page" :max="5" />
        </div>
      </template>
    </UDashboardPanel>

    <UDashboardModal prevent-close v-model="isOpen" title="Créer une leçon" :ui="{ width: 'sm:max-w-md' }">
      <UForm class="space-y-4" :state="fields" :validate="validate" @submit="onSubmit">
        <UFormGroup label="Titre" name="name">
          <UInput type="text" placeholder="Titre de la leçon" autofocus v-model="fields.name" />
        </UFormGroup>

        <UFormGroup label="Description (optionnelle)" name="description">
          <UTextarea placeholder="Description de la leçon" v-model="fields.description" />
        </UFormGroup>

        <div class="flex justify-end gap-3">
          <UButton label="Annuler" color="gray" variant="ghost" @click="isOpen = false" />
          <UButton :loading="isLoading" type="submit" label="Créer" color="black" />
        </div>
      </UForm>
    </UDashboardModal>

    <LessonsDeleteLessonModal v-model="isDeleteLessonModalOpen" />
  </UDashboardPage>
</template>
