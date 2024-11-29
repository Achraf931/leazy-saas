<script lang="ts" setup>
const localePath = useLocalePath()
const user = useSanctumUser()

const links = [[{
  label: 'Mes classes',
  icon: 'i-heroicons-home',
  to: localePath({ name: 'classes' }),
  exact: true,
  exactPath: true
}, ...user.value?.classes?.map?.(classe => ({
  label: classe.name,
  icon: 'i-heroicons-user-group',
  to: localePath({ name: 'classes-id', params: { id: classe.id } })
})) || []]]
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
