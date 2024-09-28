<script setup>
import { formatDistanceToNow } from 'date-fns'
import frLocale from 'date-fns/locale/fr'

const toast = useToast()

const { get, post, patch } = useApi('chapters')
const page = ref(1)

const { data: chapters, refresh, error } = await useAsyncData('chapters', () => get(null, { page: page.value }), { watch: [page] })

if (error.value) toast.add({ icon: 'i-heroicons-exclamation-circle', title: 'Erreur', description: 'Une erreur est survenue lors du chargement des chapitres', color: 'red', actions: [{ label: 'Réessayer', click: () => refresh() }] })

const chapterToUpdate = ref(null)

const q = ref('')

const pending = ref(false)

const isOpen = ref(false)

const isDeleteChapterModalOpen = ref({ open: false, chapter: null, refresh, redirect: false })

const filteredChapters = computed(() => {
  return chapters.value.filter(chapter => {
    return chapter.name.search(new RegExp(q.value, 'i')) !== -1
  })
})

const handleDelete = chapter => {
  isDeleteChapterModalOpen.value.open = true
  isDeleteChapterModalOpen.value.chapter = chapter
}


const fields = reactive({
  name: undefined,
  theme_id: 1,
  image: 'https://imgproxy.services.pitch.com/_/resizing_type:fit/plain/pitch-publish-user-assets/templates/posters/moodboard.jpg'
})

const handleModal = (chapter, opened) => {
  if (chapter) {
    chapterToUpdate.value = chapter
    fields.name = chapter.name
    fields.image = chapter.image
    fields.theme_id = chapter.theme_id
    isOpen.value = opened
  } else {
    isOpen.value = opened
    setTimeout(() => {
      chapterToUpdate.value = null
      fields.name = undefined
      fields.image = 'https://imgproxy.services.pitch.com/_/resizing_type:fit/plain/pitch-publish-user-assets/templates/posters/moodboard.jpg'
      fields.theme_id = 1
    }, 200)
  }
}

const validate = (state) => {
  const errors = []

  if (!state.name) errors.push({ path: 'name', message: 'Le titre est requis' })

  return errors
}

const onSubmit = async (state) => {
  pending.value = true
  const response = chapterToUpdate.value ? await patch({ ...state.data, id: chapterToUpdate.value.id }) : await post({ ...state.data })

  if (response) {
    pending.value = false
    handleModal(null, false)
    await refresh()
    toast.add({
      icon: 'i-heroicons-check-circle',
      title: chapterToUpdate.value ? 'Chapitre modifié' : 'Nouveau chapitre crée',
      color: 'green'
    })
  } else pending.value = false
}
</script>

<template>
  <UDashboardPage :ui="{  wrapper: 'overflow-hidden'}">
    <UDashboardPanel grow>
      <UDashboardToolbar>
        <template #left>
          <UInput v-model="q" icon="i-heroicons-magnifying-glass" placeholder="Rechercher un chapitre" />
        </template>
        <template #right>
          <UButton trailing-icon="i-heroicons-plus" @click="handleModal(null, true)" label="Créer un chapitre" />
        </template>
      </UDashboardToolbar>

      <UDashboardPanelContent>
        <UBlogList v-if="filteredChapters.length" orientation="horizontal" :ui="{ wrapper: 'p-px overflow-y-auto gap-4 sm:grid sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' }">
          <UBlogPost v-for="chapter in filteredChapters" :key="chapter.id" :to="localePath({ name: 'library-chapters-id', params: { id: chapter.id } })" :ui="{ wrapper: 'gap-y-0 hover:opacity-75', date: 'text-xs', authors: { wrapper: 'mt-0' }, container: 'p-2 rounded-b-lg bg-gray-100 dark:bg-gray-800 border border-t-0 border-solid border-gray-200 dark:border-gray-700', image: { wrapper: 'ring-0 border-x border-t border-gray-200 dark:border-gray-700 rounded-none rounded-t-lg' }, badge: { wrapper: 'absolute top-2 left-2.5 mb-0 py-0' } }">
            <template #image>
              <img v-if="chapter.image" class="cursor-pointer block object-cover w-full h-full transform transition-transform duration-200 hover:scale-105" :src="chapter.image || 'https://imgproxy.services.pitch.com/_/resizing_type:fit/plain/pitch-publish-user-assets/templates/posters/moodboard.jpg'" :alt="chapter.name">
              <div v-else class="flex items-center justify-center bg-gray-200 dark:bg-gray-800 w-full h-full">
                <UIcon name="i-heroicons-photo" class="w-24 h-24 text-white" />
              </div>
            </template>
            <template #default>
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-gray-900 dark:text-white font-semibold line-clamp-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200 text-sm">{{ chapter.name }}</h2>
                  <!-- <p class="line-clamp-2 text-gray-400 text-xs mt-0.5">{{ chapter.description || 'Description de test temporaire' }}</p> -->
                  <div class="flex items-center justify-start gap-1 mt-1">
                    <UIcon name="i-heroicons-clock" class="w-3.5 h-3.5 text-gray-400" />
                    <p class="text-gray-400 text-xs">{{ chapter.updated_at === chapter.created_at ? 'Créé' : 'Modifié' }} {{ formatDistanceToNow(new Date(chapter.updated_at), { locale: frLocale, addSuffix: true }) }}</p>
                  </div>
                </div>
                <UDropdown :ui="{ wrapper: 'absolute top-2.5 right-2.5', item: { size: 'text-xs' }, width: 'w-auto' }" :items="[[{ label: 'Modifier', icon: 'i-heroicons-pencil-square', click: () => handleModal(chapter, true) }, { label: 'Supprimer', icon: 'i-heroicons-trash', color: 'red', click: () => handleDelete(chapter) }]]" :popper="{ placement: 'bottom-end' }">
                  <UButton icon="i-heroicons-ellipsis-horizontal" variant="soft" color="gray" :padded="false" />

                  <template #item="{ item }">
                    <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4" :class="item.label === 'Supprimer' ? 'text-red-500 dark:text-red-400' : ''" />

                    <span class="truncate" :class="item.label === 'Supprimer' ? 'text-red-500 dark:text-red-400' : ''">{{ item.label }}</span>
                  </template>
                </UDropdown>
              </div>
            </template>
          </UBlogPost>
        </UBlogList>
        <p v-else class="text-center text-gray-400 dark:text-white text-sm mt-4">Aucun chapitre trouvé</p>
      </UDashboardPanelContent>

      <div v-if="filteredChapters && chapters.last_page > 1" class="p-2.5 flex items-center justify-center border-t border-gray-200 dark:border-gray-800">
        <UPagination size="xs" show-first show-last :page-count="chapters.per_page" :total="chapters.total" v-model="page" :max="5" />
      </div>
    </UDashboardPanel>

    <UModal prevent-close v-model="isOpen" :ui="{ width: 'sm:max-w-md' }">
      <UCard>
        <div class="flex items-start justify-between gap-x-1.5 pb-5">
          <p class="text-gray-900 dark:text-white font-semibold">{{ `${chapterToUpdate ? 'Modifier' : 'Créer'} un chapitre` }}</p>
          <UButton icon="i-heroicons-x-mark" color="gray" variant="ghost" @click="handleModal(null, false)" />
        </div>
        <UForm class="space-y-4" :state="fields" :validate="validate" @submit="onSubmit">
          <UFormGroup label="Titre" name="name">
            <UInput type="text" placeholder="Titre du chapitre" autofocus v-model="fields.name" />
          </UFormGroup>

          <UFormGroup label="Image" name="image">
            <UInput type="text" placeholder="URL de l'image" v-model="fields.image" />
          </UFormGroup>

          <div class="flex justify-end gap-3">
            <UButton label="Annuler" color="gray" variant="ghost" @click="handleModal(null, false)" />
            <UButton :loading="pending" type="submit" :label="chapterToUpdate ? 'Modifier' : 'Créer'" color="black" />
          </div>
        </UForm>
      </UCard>
    </UModal>

    <ChaptersDeleteChapterModal v-model="isDeleteChapterModalOpen" />
  </UDashboardPage>
</template>
