<script setup>
import { sub, formatDistanceToNow } from 'date-fns'
import frLocale from 'date-fns/locale/fr'

const client = useSanctumClient()
const toast = useToast()

const { data: themes, pending, error, refresh } = await useAsyncData('themes', () => client('/api/teacher/themes'))
const localePath = useLocalePath()

const q = ref('')
const isLoading = ref(false)

const isOpen = ref(false)

const links = [
  {
    label: 'Bibliothèque',
    to: localePath({ name: 'library' })
  },
  {
    label: 'Thèmes',
    to: localePath({ name: 'library-themes' })
  }
]

const isDeleteThemeModalOpen = ref({ open: false, theme: null, refresh })

const range = ref({ start: sub(new Date(), { days: 14 }), end: new Date() })
const period = ref('daily')

const filteredThemes = computed(() => {
  return themes.value?.data.filter(theme => {
    return theme.name.search(new RegExp(q.value, 'i')) !== -1
  })
})

const handleDelete = theme => {
  isDeleteThemeModalOpen.value.open = true
  isDeleteThemeModalOpen.value.theme = theme
}

const fields = reactive({
  name: undefined,
  discipline_id: 1
})

const validate = (state) => {
  const errors = []

  if (!state.name) errors.push({ path: 'name', message: 'Le titre est requis' })

  return errors
}

const onSubmit = async (state) => {
  isLoading.value = true
  const response = await client('/api/teacher/themes', { method: 'POST', body: state.data })

  if (response) setTimeout(async () => {
    isLoading.value = false
    isOpen.value = false
    toast.add({ icon: 'i-heroicons-check-circle', title: 'Nouveau thème crée', color: 'green' })
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
          <UButton trailing-icon="i-heroicons-plus" @click="isOpen = true" label="Créer un thème" />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <UInput v-model="q" icon="i-heroicons-magnifying-glass" placeholder="Rechercher un thème" />

          <!-- ~/components/home/HomeDateRangePicker.vue -->
          <HomeDateRangePicker v-model="range" class="ml-2.5" />
        </template>
      </UDashboardToolbar>

      <template v-if="!pending">
        <UDashboardPanelContent>
          <UBlogList v-if="filteredThemes.length" orientation="horizontal" :ui="{ wrapper: 'p-px overflow-y-auto gap-4 sm:grid sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5' }">
            <UCard v-for="theme in filteredThemes" :key="theme.id" :to="localePath({ name: 'library-themes-id', params: { id: theme.id } })" :ui="{ body: { base: 'text-xs flex flex-col items-start gap-4', padding: 'px-3 sm:p-3' } }">
              <div class="flex items-start justify-between w-full">
                <div class="flex items-center justify-center rounded-lg bg-blue-100 p-2">
                  <UIcon name="i-heroicons-book-open" class="w-6 h-6 text-blue-400" />
                </div>
                <UDropdown :ui="{ item: { size: 'text-xs' }, width: 'w-auto' }" :items="[[{ label: 'Renommer', icon: 'i-heroicons-pencil-square' }, { label: 'Supprimer', icon: 'i-heroicons-trash', color: 'red', click: () => handleDelete(theme) }]]" :popper="{ placement: 'bottom-end' }">
                  <UButton icon="i-heroicons-ellipsis-vertical" variant="ghost" color="gray" :padded="false" />
                </UDropdown>
              </div>
              <h2 class="text-gray-900 dark:text-white font-semibold line-clamp-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200 text-base">{{ theme.name }}</h2>
              <div class="flex items-center justify-start gap-1">
                <UIcon name="i-heroicons-clock" class="w-3.5 h-3.5 text-gray-400 dark:text-white" />
                <p class="text-gray-400 text-xs">{{ theme.updated_at === theme.created_at ? 'Créé' : 'Modifié' }} {{ formatDistanceToNow(new Date(theme.updated_at), { locale: frLocale, addSuffix: true }) }}</p>
              </div>
            </UCard>
          </UBlogList>
          <p v-else class="text-center text-gray-400 dark:text-white text-sm mt-4">Aucun thème trouvé</p>
        </UDashboardPanelContent>

        <div v-if="filteredThemes.length" class="p-2.5 flex items-center justify-center border-t border-gray-200">
          <UPagination size="xs" show-first show-last :page-count="themes.per_page" :total="themes.total" v-model="themes.current_page" :max="5" />
        </div>
      </template>
    </UDashboardPanel>

    <UDashboardModal prevent-close v-model="isOpen" title="Créer un thème" :ui="{ width: 'sm:max-w-md' }">
      <UForm class="space-y-4" :state="fields" :validate="validate" @submit="onSubmit">
        <UFormGroup label="Titre" name="name">
          <UInput type="text" placeholder="Titre du thème" autofocus v-model="fields.name" />
        </UFormGroup>

        <div class="flex justify-end gap-3">
          <UButton label="Annuler" color="gray" variant="ghost" @click="isOpen = false" />
          <UButton :loading="isLoading" type="submit" label="Créer" color="black" />
        </div>
      </UForm>
    </UDashboardModal>

    <ThemesDeleteThemeModal v-model="isDeleteThemeModalOpen" />
  </UDashboardPage>
</template>
