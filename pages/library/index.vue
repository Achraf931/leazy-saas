<script setup>
const client = useSanctumClient()
const localePath = useLocalePath()

const { data: library, pending, error, refresh } = await useAsyncData('library', async () => {

  const [themes, chapters, lessons] = await Promise.all([
    client('/api/teacher/themes'),
    client('/api/teacher/chapters'),
    client('/api/teacher/lessons')
  ])

  return {
    themes: themes.data,
    chapters: chapters.data,
    lessons: lessons.data
  }
}, { lazy: true })
</script>

<template>
  <UDashboardPanel grow>
    <UDashboardNavbar>
      <template #left>
        <ToggleDrawer :title="$t('drawer.library.label')" />
      </template>
    </UDashboardNavbar>

    <UDashboardPanelContent v-if="!pending">
      <!-- ~/components/home/HomeLessons.vue -->
      <HomeLessons v-if="library.lessons?.length" :lessons="library.lessons" />

      <div class="grid lg:grid-cols-2 lg:items-start gap-5 mt-8">
        <!-- ~/components/home/HomeSales.vue -->
        <HomeChapters v-if="library.chapters?.length" :chapters="library.chapters" />
        <!-- ~/components/home/HomeCountries.vue -->
        <HomeThemes v-if="library.themes?.length" :themes="library.themes" />
      </div>
    </UDashboardPanelContent>
  </UDashboardPanel>
</template>
