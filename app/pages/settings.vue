<script setup lang="ts">
const localePath = useLocalePath()
const { t } = useI18n()

const links = [[{
    label: t('page.settings.general.label'),
    icon: 'i-heroicons-user-circle',
    to: localePath({ name: 'settings' }),
    exact: true
  }, /*{
    label: t('page.settings.members.label'),
    icon: 'i-heroicons-user-group',
    to: localePath({ name: 'settings-members' })
  },*/ {
    label: t('page.settings.notifications.label'),
    icon: 'i-heroicons-bell',
    to: localePath({ name: 'settings-notifications' })
  }]]
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar>
        <template #title>
          <ToggleDrawer :title="$t('commons.settings')" />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar class="py-0 px-1.5 overflow-x-auto">
        <UHorizontalNavigation :links="links" />
      </UDashboardToolbar>

      <NuxtPage />
    </UDashboardPanel>
  </UDashboardPage>
</template>
