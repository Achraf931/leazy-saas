<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'
import frLocale from 'date-fns/locale/fr'

const toast = useToast()
const { get, post, patch } = useApi('themes')
const page = ref(1)

const { data: themes, refresh, error } = await useAsyncData('themes', () => get(null, { page: page.value }), { watch: [page] })

if (error.value) toast.add({ icon: 'i-heroicons-exclamation-circle', title: 'Erreur', description: 'Une erreur est survenue lors du chargement des thèmes', color: 'red', actions: [{ label: 'Réessayer', click: () => refresh() }] })

const themeToUpdate = ref(null)

const q = ref('')

const pending = ref(false)

const isOpen = ref(false)

const isDeleteThemeModalOpen = ref({ open: false, theme: null, refresh, redirect: false })

const filteredThemes = computed(() => {
  return themes.value?.data.filter(theme => {
    return theme.name.search(new RegExp(q.value, 'i')) !== -1
  })
})

const handleDelete = async theme => {
  isDeleteThemeModalOpen.value.open = true
  isDeleteThemeModalOpen.value.theme = theme
}

const fields = reactive({
  name: undefined,
  discipline_id: 1
})

const handleModal = (theme, opened) => {
  if (theme) {
    themeToUpdate.value = theme
    fields.name = theme.name
    fields.discipline_id = theme.discipline_id
    isOpen.value = opened
  } else {
    isOpen.value = opened
    setTimeout(() => {
      themeToUpdate.value = null
      fields.name = undefined
      fields.discipline_id = 1
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
  const response = themeToUpdate.value ? await patch({ ...state.data, id: themeToUpdate.value.id }) : await post({ ...state.data })

  if (response) setTimeout(async () => {
    pending.value = false
    handleModal(null, false)
    await refresh()
    toast.add({ icon: 'i-heroicons-check-circle', title: themeToUpdate.value ? 'Thème modifié' : 'Nouveau thème crée', color: 'green' })
  }, 2000)
  else pending.value = false
}
</script>

<template>
  <UDashboardPage :ui="{  wrapper: 'overflow-hidden'}">
    <UDashboardPanel grow>
      <UDashboardToolbar>
        <template #left>
          <UInput v-model="q" icon="i-heroicons-magnifying-glass" placeholder="Rechercher un thème" />
        </template>
        <template #right>
          <UButton trailing-icon="i-heroicons-plus" @click="handleModal(null, true)" label="Créer un thème" />
        </template>
      </UDashboardToolbar>

      <UDashboardPanelContent>
        <UBlogList v-if="filteredThemes.length" orientation="horizontal" :ui="{ wrapper: 'p-px overflow-y-auto gap-4 sm:grid sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5' }">
          <UBlogPost v-for="theme in filteredThemes" :key="theme.id" :to="localePath({ name: 'library-themes-id', params: { id: theme.id } })" :ui="{ wrapper: 'gap-y-0 hover:opacity-75', container: 'p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-solid border-gray-200 dark:border-gray-700' }" class="text-xs">
            <div class="flex items-start justify-between w-full">
              <div class="flex items-center justify-center rounded-lg bg-blue-100 p-2">
                <UIcon name="i-heroicons-book-open" class="w-6 h-6 text-blue-400" />
              </div>
              <UDropdown :ui="{ item: { size: 'text-xs' }, width: 'w-auto' }" :items="[[{ label: 'Modifier', icon: 'i-heroicons-pencil-square', click: () => handleModal(theme, true) }, { label: 'Supprimer', icon: 'i-heroicons-trash', color: 'red', click: () => handleDelete(theme) }]]" :popper="{ placement: 'bottom-end' }">
                <UButton icon="i-heroicons-ellipsis-vertical" variant="ghost" color="gray" :padded="false" />

                <template #item="{ item }">
                  <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4" dynamic :class="item.label === 'Supprimer' ? 'text-red-500 dark:text-red-400' : ''" />

                  <span class="truncate" :class="item.label === 'Supprimer' ? 'text-red-500 dark:text-red-400' : ''">{{ item.label }}</span>
                </template>
              </UDropdown>
            </div>
            <h2 class="text-gray-900 dark:text-white font-semibold line-clamp-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200 text-base">{{ theme.name }}</h2>
            <div class="flex items-center justify-start gap-1">
              <UIcon name="i-heroicons-clock" class="w-3.5 h-3.5 text-gray-400" />
              <p class="text-gray-400 text-xs">{{ theme.updated_at === theme.created_at ? 'Créé' : 'Modifié' }} {{ formatDistanceToNow(new Date(theme.updated_at), { locale: frLocale, addSuffix: true }) }}</p>
            </div>
          </UBlogPost>
        </UBlogList>
        <p v-else class="text-center text-gray-400 dark:text-white text-sm mt-4">Aucun thème trouvé</p>
      </UDashboardPanelContent>

      <div v-if="filteredThemes.length && themes.last_page > 1" class="p-2.5 flex items-center justify-center border-t border-gray-200 dark:border-gray-800">
        <UPagination size="xs" show-first show-last :page-count="themes.per_page" :total="themes.total" v-model="page" :max="5" />
      </div>
    </UDashboardPanel>

    <UModal prevent-close v-model="isOpen" :ui="{ width: 'sm:max-w-md' }">
      <UCard>
        <div class="flex items-start justify-between gap-x-1.5 pb-5">
          <p class="text-gray-900 dark:text-white font-semibold">{{ `${themeToUpdate ? 'Modifier' : 'Créer'} un thème` }}</p>
          <UButton icon="i-heroicons-x-mark" color="gray" variant="ghost" @click="handleModal(null, false)" />
        </div>
        <UForm class="space-y-4" :state="fields" :validate="validate" @submit="onSubmit">
          <UFormGroup label="Titre" name="name">
            <UInput type="text" placeholder="Titre du thème" autofocus v-model="fields.name" />
          </UFormGroup>

          <div class="flex justify-end gap-3">
            <UButton label="Annuler" color="gray" variant="ghost" @click="handleModal(null, false)" />
            <UButton :loading="pending" type="submit" :label="themeToUpdate ? 'Modifier' : 'Créer'" color="black" />
          </div>
        </UForm>
      </UCard>
    </UModal>

    <ThemesDeleteThemeModal v-model="isDeleteThemeModalOpen" />
  </UDashboardPage>
</template>
