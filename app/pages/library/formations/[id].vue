<script setup lang="ts">
definePageMeta({
  title: 'Titre de la formation'
})

const localePath = useLocalePath()
const { setBreadcrumbs } = useDashboard()
const documentId = computed(() => useRoute().params.id)
const isOwner = computed(() => (localePath() === localePath({ name: 'library-formations-id-edit', params: { id: documentId.value } })))

const { data: formation } = await useFetch('/api/formations', { watch: false, query: { id: documentId.value }, default: () => ({}) })

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
  <UDashboardPanelContent class="text-sm" :ui="{ wrapper: 'flex-row gap-4 overflow-y-hidden' }">
    <template v-if="isOwner" #right>
      <UButton :to="localePath({ name: 'library-formations-id', params: { id: documentId } })" target="_blank" size="sm" leading-icon="i-heroicons-eye" label="Prévisualiser" />
    </template>

    <NuxtPage :formation />
  </UDashboardPanelContent>
</template>
