<script setup lang="ts">
const links = [{
  label: 'Thèmes',
  icon: 'i-heroicons-briefcase',
  to: '/library/themes',
  exact: true
}, {
  label: 'Chapitres',
  icon: 'i-heroicons-book-open',
  to: '/library/chapters'
}, {
  label: 'Leçons',
  icon: 'i-heroicons-document-text',
  to: '/library/lessons'
}]
</script>

<template>
  <UDashboardNavbar title="Bibliothèque" />

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
</template>
