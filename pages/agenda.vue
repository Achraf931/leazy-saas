<script setup lang="ts">
const selectedTab = ref(0)

const q = ref('')
const tabItems = [{
  label: 'Timeline'
}, {
  label: 'Calendrier'
}]
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar>
        <template #title>
          <ToggleDrawer />
          <h1 class="flex items-center gap-1.5 font-semibold text-gray-900 dark:text-white min-w-0">
            Agenda
          </h1>
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <UTabs v-model="selectedTab" :items="tabItems" :ui="{ wrapper: '', list: { height: 'h-9', tab: { height: 'h-7', size: 'text-[13px]' } } }" />
        </template>

        <template #right>
          <UInput
              v-model="q"
              icon="i-heroicons-magnifying-glass-20-solid"
              size="sm"
              color="white"
              :trailing="false"
              placeholder="Rechercher"
          />
        </template>
      </UDashboardToolbar>

      <UDashboardPanelContent>
        <Agenda v-model="selectedTab" />
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
