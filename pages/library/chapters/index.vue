<script setup>
const links = [
  {
    label: 'Bibliothèque',
    to: '/library'
  },
  {
    label: 'Chapitres',
    to: '/library/chapters'
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
    <p>Ma page chapitres</p>
  </UDashboardPanelContent>
</template>
