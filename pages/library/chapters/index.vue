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
  <UDashboardPanel grow>
    <UDashboardNavbar>
      <template v-slot:title>
        <UBreadcrumb :links="links" />
      </template>
    </UDashboardNavbar>

    <UDashboardPanelContent>
      <p>Ma page chapitres</p>
    </UDashboardPanelContent>
  </UDashboardPanel>
</template>
