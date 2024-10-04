<script setup lang="ts">
import { ThemesModal } from '#components'

const modal = useModal()
const toast = useToast()
const { get, patch } = useApi('themes')
const page = ref(1)
const q = ref('')

const { data: themes, refresh, error } = await useAsyncData('themes', () => get(null, { page: page.value }), { watch: [page] })

if (error.value) toast.add({ icon: 'i-heroicons-exclamation-circle', title: 'Erreur', description: 'Une erreur est survenue lors du chargement des thèmes', color: 'red', actions: [{ label: 'Réessayer', click: () => refresh() }] })

const filteredThemes = computed(() => {
  return themes.value?.data.filter(theme => {
    return theme.name.search(new RegExp(q.value, 'i')) !== -1
  })
})

const handleModal = () => {
  modal.open(ThemesModal, {
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
        </template>
        <template #right>
          <UButton trailing-icon="i-heroicons-plus" @click="handleModal()" label="Créer un thème" />
        </template>
      </UDashboardToolbar>

      <UDashboardPanelContent>
        <UBlogList v-if="filteredThemes.length" orientation="horizontal" :ui="{ wrapper: 'p-px overflow-y-auto gap-4 sm:grid sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' }">
          <ThemesCard v-for="theme in filteredThemes" :key="theme.id" :theme :refresh />
        </UBlogList>
        <p v-else class="text-center text-gray-400 dark:text-white text-sm mt-4">Aucun thème trouvé</p>
      </UDashboardPanelContent>

      <div v-if="filteredThemes.length && themes.last_page > 1" class="p-2.5 flex items-center justify-center border-t border-gray-200 dark:border-gray-800">
        <UPagination size="xs" show-first show-last :page-count="themes.per_page" :total="themes.total" v-model="page" :max="5" />
      </div>
    </UDashboardPanel>
  </UDashboardPage>
</template>
