<script setup lang="ts">
const localePath = useLocalePath()
const { t } = useI18n()

const links = [[{
    label: 'Terminal PI',
    icon: 'i-heroicons-user-group',
    to: localePath({ name: 'classes-id', params: { id: 1 } })
  }, {
    label: 'Seconde PG',
    icon: 'i-heroicons-user-group',
    to: localePath({ name: 'classes-id', params: { id: 2 } })
  }]]
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar>
        <template #title>
          <ToggleDrawer />
          <h1 class="flex items-center gap-1.5 font-semibold text-gray-900 dark:text-white min-w-0">Mes classes</h1>
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar class="py-0 px-1.5 overflow-x-auto">
        <UHorizontalNavigation :links="links" />
      </UDashboardToolbar>

      <NuxtPage />
    </UDashboardPanel>
  </UDashboardPage>
</template>
