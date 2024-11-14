<script setup lang="ts">
definePageMeta({
  title: 'Aperçu'
})

const { breadcrumbs } = useDashboard()
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar>
        <template #title>
          <ToggleDrawer />

          <UBreadcrumb :links="breadcrumbs" />
        </template>
      </UDashboardNavbar>

      <NuxtPage />
    </UDashboardPanel>
  </UDashboardPage>
</template>
