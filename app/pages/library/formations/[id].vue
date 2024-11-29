<script lang="ts" setup>
definePageMeta({
  title: 'Titre de la formation'
})

const localePath = useLocalePath()
const { setBreadcrumbs } = useDashboard()
const documentId = computed(() => useRoute().params.id)
const isOwner = computed(() => (localePath() === localePath({
  name: 'library-formations-id-edit',
  params: { id: documentId.value }
})))

const { data: formation } = await useFetch('/api/formations', {
  watch: false,
  query: { id: documentId.value },
  default: () => ({})
})

setBreadcrumbs([
  {
    label: 'Bibliothèque',
    to: localePath({ name: 'library' })
  },
  {
    label: 'Formations',
    to: localePath({ name: 'library-formations' })
  },
  {
    label: formation.value?.name
  }
])
</script>

<template>
  <UDashboardPanelContent :ui="{ wrapper: 'flex-row gap-4 overflow-y-hidden' }" class="text-sm">
    <template v-if="isOwner" #right>
      <UButton
        :to="localePath({ name: 'library-formations-id', params: { id: documentId } })" label="Prévisualiser" leading-icon="i-heroicons-eye"
        size="sm" target="_blank"
      />
    </template>
    
    <NuxtPage :formation />
  </UDashboardPanelContent>
</template>
