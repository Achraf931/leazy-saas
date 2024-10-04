<script setup lang="ts">
const localePath = useLocalePath()

const links = [[{
  label: 'Mes classes',
  icon: 'i-heroicons-home',
  to: localePath({ name: 'classes' }),
  exact: true,
  exactPath: true
}, {
    label: 'Terminale PI',
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
          <ToggleDrawer title="Mes classes" />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar class="py-0 px-1.5 overflow-x-auto">
        <UHorizontalNavigation :links="links" />
      </UDashboardToolbar>

      <NuxtPage />
    </UDashboardPanel>
  </UDashboardPage>
</template>
