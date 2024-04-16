<template>
  <UDashboardPanel grow>
    <UDashboardNavbar>
      <template #left>
        <ToggleDrawer :title="$t('drawer.library.label')" />
      </template>
    </UDashboardNavbar>

    <UDashboardPanelContent>
      <!-- ~/components/home/HomeLessons.vue -->
      <HomeLessons />

      <div class="grid lg:grid-cols-2 lg:items-start gap-8 mt-8">
        <!-- ~/components/home/HomeSales.vue -->
        <HomeChapters />
        <!-- ~/components/home/HomeCountries.vue -->
        <HomeThemes />
      </div>
    </UDashboardPanelContent>
  </UDashboardPanel>
</template>
