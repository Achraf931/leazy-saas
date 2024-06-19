<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'
import frLocale from 'date-fns/locale/fr'
import { useLessonsStore } from '@/stores/library'
import { BaseKit, type BaseKitOptions } from '@/extensions/index.js'

const extensions: BaseKitOptions = [BaseKit]

const toast = useToast()

const store = useLessonsStore()
const { fetchLessons, refresh, addLesson } = store
const { lessons, pending, error } = storeToRefs(store)

await fetchLessons()

const localePath = useLocalePath()

const lessonToUpdate = ref(null)

const q = ref('')

const page = ref(lessons.value?.current_page)

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
  return lessons.value?.data?.filter(lesson => {
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

const handleModal = (lesson, opened) => {
  if (lesson) {
    lessonToUpdate.value = lesson
    fields.name = lesson.name
    fields.description = lesson.description
    isOpen.value = opened
  } else {
    isOpen.value = opened
    setTimeout(() => {
      lessonToUpdate.value = null
      fields.name = undefined
      fields.description = undefined
    }, 200)
  }
}

const validate = (state) => {
  const errors = []

  if (!state.name) errors.push({ path: 'name', message: 'Le titre est requis' })

  return errors
}

const onSubmit = async (state) => {
  isLoading.value = true
  const response = await addLesson({ ...state.data })

  if (response) {
    toast.add({ icon: 'i-heroicons-check-circle', title: 'Nouvelle leçon crée', color: 'green' })

    setTimeout(async () => {
      isLoading.value = false
      if (lessonToUpdate.value) handleModal(null, false)
      return navigateTo(localePath({ name: 'lesson_id', params: { id: response.id } }))
    }, 2000)
  }
  else isLoading.value = false
}

watch(page, async (page) => {
  await refresh(page)
})
</script>

<template>
  <UDashboardPage :ui="{  wrapper: 'overflow-hidden'}">
    <UDashboardPanel grow>
      <UDashboardToolbar>
        <template #left>
          <UInput v-model="q" icon="i-heroicons-magnifying-glass" placeholder="Rechercher une leçon" />
        </template>

        <template #right>
          <template v-if="false">
            <UPopover :popper="{ placement: 'bottom-end' }">
              <UButton size="xs" variant="ghost" color="gray" icon="i-heroicons-adjustments-horizontal" />

              <template #panel>
                <div class="p-2">
                  <UButton variant="soft" size="2xs" label="Appliquer" />
                </div>
              </template>
            </UPopover>
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

          <UButton trailing-icon="i-heroicons-plus" @click="handleModal(null, true)" label="Créer une leçon" />
        </template>
      </UDashboardToolbar>

      <template v-if="!pending">
        <UDashboardPanelContent>
          <UBlogList v-if="filteredLessons.length > 0" orientation="horizontal" :ui="{ wrapper: 'p-px overflow-y-auto gap-x-4 gap-y-6 sm:grid sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5' }">
            <UBlogPost v-for="lesson in filteredLessons" :key="lesson.id" :to="localePath({ name: 'lesson_id', params: { id: lesson.id } })" :ui="{ wrapper: 'gap-y-2', image: { wrapper: 'rounded-sm' } }" class="text-xs">
              <template #image>
                <Editor :model-value="JSON.parse(lesson.content)" content-class="preview-editor" :extensions="extensions" :editable="false" :disabled="true" :hideToolbar="true" :hideBubble="true" max-width="100%" />
              </template>
              <div class="mb-2">
                <div class="flex items-center justify-between">
                  <h2 class="text-gray-900 dark:text-white font-semibold line-clamp-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200 text-base">{{ lesson.name }}</h2>
                  <div class="flex items-start justify-between">
                    <UDropdown :ui="{ item: { size: 'text-xs' }, width: 'w-auto' }" :items="[[{ label: 'Modifier', icon: 'i-heroicons-pencil-square', click: () => handleModal(lesson, true) }, { label: 'Supprimer', icon: 'i-heroicons-trash', color: 'red', click: (e) => handleDelete(e, lesson) }]]" :popper="{ placement: 'bottom-end' }">
                      <UButton icon="i-heroicons-ellipsis-vertical" variant="ghost" color="gray" :padded="false" />

                      <template #item="{ item }">
                        <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4" :class="item.label === 'Supprimer' ? 'text-red-500 dark:text-red-400' : ''" />

                        <span class="truncate" :class="item.label === 'Supprimer' ? 'text-red-500 dark:text-red-400' : ''">{{ item.label }}</span>
                      </template>
                    </UDropdown>
                  </div>
                </div>
                <p class="line-clamp-2 text-gray-400 text-xs mt-0.5">{{ lesson.description }}</p>
              </div>
              <div v-if="lesson.chapter" class="flex items-start gap-2">
                <UBadge v-if="lesson.chapter.theme" variant="soft" color="yellow" size="xs">{{ lesson.chapter.theme.name }}</UBadge>
                <UBadge variant="soft" color="blue" size="xs">{{ lesson.chapter.name }}</UBadge>
              </div>
              <div class="flex items-center justify-start gap-1 mt-2">
                <UIcon name="i-heroicons-clock" class="w-3.5 h-3.5 text-gray-400 dark:text-white" />
                <p class="text-gray-400 text-xs">{{ lesson.updated_at === lesson.created_at ? 'Créé' : 'Modifié' }} {{ formatDistanceToNow(new Date(lesson.updated_at), { locale: frLocale, addSuffix: true }) }}</p>
              </div>
            </UBlogPost>
          </UBlogList>
          <p v-else class="text-center text-gray-400 dark:text-white text-sm mt-4">Aucune leçon trouvée</p>
        </UDashboardPanelContent>

        <div v-if="filteredLessons.length && lessons.last_page > 1" class="p-2.5 flex items-center justify-center border-t border-gray-200 dark:border-gray-800">
          <UPagination size="xs" show-first show-last :page-count="lessons.per_page" :total="lessons.total" v-model="page" :max="5" />
        </div>
      </template>
    </UDashboardPanel>

    <UDashboardModal prevent-close v-model="isOpen" :title="`${lessonToUpdate ? 'Modifier' : 'Créer'} une leçon`" :ui="{ width: 'sm:max-w-md' }" :close-button="{ icon: 'i-heroicons-x-mark', onClick: () => handleModal(null, false) }">
      <UForm class="space-y-4" :state="fields" :validate="validate" @submit="onSubmit">
        <UFormGroup label="Titre" name="name">
          <UInput type="text" placeholder="Titre de la leçon" autofocus v-model="fields.name" />
        </UFormGroup>

        <UFormGroup label="Description (optionnelle)" name="description">
          <UTextarea placeholder="Description de la leçon" v-model="fields.description" />
        </UFormGroup>

        <div class="flex justify-end gap-3">
          <UButton label="Annuler" color="gray" variant="ghost" @click="handleModal(null, false)" />
          <UButton :loading="isLoading" type="submit" :label="lessonToUpdate ? 'Modifier' : 'Créer'" color="black" />
        </div>
      </UForm>
    </UDashboardModal>

    <LessonsDeleteLessonModal v-model="isDeleteLessonModalOpen" />
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
