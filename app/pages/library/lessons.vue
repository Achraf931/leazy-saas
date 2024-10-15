<script setup lang="ts">
import { LessonsModal } from '#components'
import { format, sub } from 'date-fns'

const modal = useModal()
const localePath = useLocalePath()
const toast = useToast()

const q = ref('')
const chapters = ref([])
const themes = ref([])
const { get } = useApi('lessons')
const page = ref(1)
const range = ref<Range>({ start: sub(new Date(), { days: 14 }), end: new Date() })

const { data: lessons, status, refresh, error } = await useLazyAsyncData('lessons', () => get(null, { page: page.value, ...(chapters.value?.length && { chapter: chapters.value?.map?.(chapter => chapter.name)?.join?.(',') }), ...(themes.value?.length && { theme: themes.value?.map?.(theme => theme.name)?.join?.(',') }) }), { watch: [() => page.value, () => chapters.value?.length, () => themes.value?.length] })

if (error.value) toast.add({ icon: 'i-heroicons-exclamation-circle', title: 'Erreur', description: 'Une erreur est survenue lors du chargement des leçons', color: 'red', actions: [{ label: 'Réessayer', click: () => refresh() }] })

const filteredLessons = computed(() => {
  return lessons.value?.data?.filter(lesson => {
    return lesson.name.search(new RegExp(q.value, 'i')) !== -1 || lesson.description.search(new RegExp(q.value, 'i')) !== -1
  }) || []
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

          <CommonsDateRangePicker v-model="range" class="ml-2.5" />
        </template>

        <template #right>
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
          <Suspense v-else-if="status !== 'pending' && filteredLessons.length">
            <LessonsCard v-for="lesson in filteredLessons" :key="lesson.id" :lesson :refresh redirect />
          </Suspense>
          <p v-else class="text-center text-gray-400 dark:text-white text-sm mt-4">Aucune leçon trouvée</p>
        </UBlogList>
      </UDashboardPanelContent>

      <div v-if="filteredLessons.length && lessons?.last_page > 1" class="p-2.5 flex items-center justify-center border-t border-gray-200 dark:border-gray-800">
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
