<script lang="ts" setup>
import { CreateThemeModal } from '#components'
import { sub } from 'date-fns'

definePageMeta({
  title: 'Thèmes'
})

const modal = useModal()
const toast = useToast()
const localePath = useLocalePath()
const { setBreadcrumbs } = useDashboard()
const { get } = useApi('themes')
const page = ref(1)
const q = ref('')
const range = ref<Range>({ start: sub(new Date(), { days: 14 }), end: new Date() })

const {
  data: themes,
  status,
  refresh,
  error
} = await useLazyAsyncData('themes', () => get(null, { page: page.value }), { watch: [page] })

if (error.value) toast.add({
  icon: 'i-heroicons-exclamation-circle',
  title: 'Erreur',
  description: 'Une erreur est survenue lors du chargement des thèmes',
  color: 'red',
  actions: [{ label: 'Réessayer', click: () => refresh() }]
})

setBreadcrumbs([
  {
    label: 'Bibliothèque',
    to: localePath({ name: 'library' })
  },
  {
    label: 'Thèmes'
  }
])

const filteredThemes = computed(() => {
  return themes.value?.data.filter(theme => {
    return theme.name.search(new RegExp(q.value, 'i')) !== -1
  }) || []
})

const handleModal = () => {
  modal.open(CreateThemeModal, {
    refresh,
    onClose: () => modal.close()
  })
}
</script>

<template>
  <UDashboardPage :ui="{  wrapper: 'overflow-hidden'}">
    <UDashboardPanel grow>
      <UDashboardToolbar>
        <template #left>
          <UInput v-model="q" icon="i-heroicons-magnifying-glass" placeholder="Rechercher un thème" />
          
          <DateRangePicker v-model="range" class="ml-2.5" />
        </template>
        
        <template #right>
          <UButton label="Créer un thème" trailing-icon="i-heroicons-plus" @click="handleModal" />
        </template>
      </UDashboardToolbar>
      
      <UDashboardPanelContent>
        <p
          v-if="status !== 'pending' && !filteredThemes.length"
          class="text-center text-gray-400 dark:text-white text-sm mt-4"
        >Aucun thème trouvé</p>
        <UBlogList
          :ui="{ wrapper: 'p-px overflow-y-auto gap-4 sm:grid sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' }"
          orientation="horizontal"
        >
          <template v-if="status === 'pending'">
            <USkeleton v-for="n in 5" :key="n" class="rounded-lg w-full h-40 sm:h-44 xl:h-48 2xl:h-52" />
          </template>
          <template v-else-if="status !== 'pending' && filteredThemes.length">
            <ThemeCard v-for="theme in filteredThemes" :key="theme.id" :refresh :theme />
          </template>
        </UBlogList>
      </UDashboardPanelContent>
      
      <div
        v-if="filteredThemes.length && themes?.last_page > 1"
        class="p-2.5 flex items-center justify-center border-t border-gray-200 dark:border-gray-800"
      >
        <UPagination
          v-model="page" :max="5" :page-count="themes.per_page" :total="themes.total" show-first show-last size="xs"
        />
      </div>
    </UDashboardPanel>
  </UDashboardPage>
</template>
