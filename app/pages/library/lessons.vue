<script setup lang="ts">
import { LessonsModal } from '#components'

const modal = useModal()
const localePath = useLocalePath()
const toast = useToast()

const { get } = useApi('lessons')
const page = ref(1)

const { data: lessons, refresh, error } = await useAsyncData('lessons', () => get(null, { page: page.value }), { watch: [page] })

if (error.value) toast.add({ icon: 'i-heroicons-exclamation-circle', title: 'Erreur', description: 'Une erreur est survenue lors du chargement des leçons', color: 'red', actions: [{ label: 'Réessayer', click: () => refresh() }] })

const q = ref('')
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

const handleModal = () => {
  modal.open(LessonsModal, {
    onClose: () => modal.close()
  })
}
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

          <Suspense>
            <UButton trailing-icon="i-heroicons-plus" @click="handleModal" label="Créer une leçon" />
          </Suspense>
        </template>
      </UDashboardToolbar>

      <UDashboardPanelContent>
        <UBlogList v-if="filteredLessons.length > 0" orientation="horizontal" :ui="{ wrapper: 'p-px overflow-y-auto gap-x-4 gap-y-6 sm:grid sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' }">
          <LessonsCard v-for="lesson in filteredLessons" :key="lesson.id" :lesson :refresh redirect />
        </UBlogList>
        <p v-else class="text-center text-gray-400 dark:text-white text-sm mt-4">Aucune leçon trouvée</p>
      </UDashboardPanelContent>

      <div v-if="filteredLessons.length && lessons.last_page > 1" class="p-2.5 flex items-center justify-center border-t border-gray-200 dark:border-gray-800">
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
