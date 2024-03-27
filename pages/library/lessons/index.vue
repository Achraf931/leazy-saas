<script setup>
const links = [
  {
    label: 'Bibliothèque',
    to: '/library'
  },
  {
    label: 'Leçons',
    to: '/library/lessons'
  }
]
</script>

<template>
  <UDashboardNavbar>
    <template v-slot:title>
      <UBreadcrumb :links="links" />
    </template>
  </UDashboardNavbar>

  <UDashboardPanelContent>
    <!-- ~/components/home/HomeLessons.vue -->
    <HomeLessons />
  </UDashboardPanelContent>
</template>
