<script setup>
const links = [
  {
    label: 'Bibliothèque',
    to: '/library'
  },
  {
    label: 'Thèmes',
    to: '/library/themes'
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
      <p>Ma page thèmes</p>
    </UDashboardPanelContent>
  </UDashboardPanel>
</template>
