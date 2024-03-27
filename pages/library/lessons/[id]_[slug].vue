<script setup lang="ts">
const route = useRoute()

const links = [
  {
    label: 'Bibliothèque',
    to: '/library'
  },
  {
    label: 'Leçons',
    to: '/library/lessons'
  },
  {
    label: `${route.params.id}_${route.params.slug}`,
    to: `/library/lessons/${route.params.id}_${route.params.slug}`
  }
]
</script>

<template>
  <UDashboardNavbar badge="Brouillon">
    <template v-slot:title>
      <UBreadcrumb :links="links" />
    </template>
  </UDashboardNavbar>
  <UDashboardPanelContent>
    <ClientOnly>
      <Editor blob-api="http://localhost:3000/api/upload" completion-api="http://localhost:3000/api/generate" ref="editor" />
    </ClientOnly>
  </UDashboardPanelContent>
</template>
