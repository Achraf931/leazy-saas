<script setup lang="ts">
const { get } = useApi('lessons')
const { data: library } = await useAsyncData('library', async () => {
  const [lessons, chapters, themes] = await Promise.all([
    get(),
    get(null, { page: 1 }, 'chapters'),
    get(null, { page: 1 }, 'themes')
  ])

  return {
    lessons: lessons.data,
    chapters,
    themes: themes.data
  }
})
</script>

<template>
  <UDashboardPanelContent>
    <LibraryLessons v-if="library.lessons?.length" :lessons="library.lessons" />

    <div class="grid lg:grid-cols-2 lg:items-start gap-4 mt-4">
      <LibraryChapters v-if="library.chapters?.length" :chapters="library.chapters" />
      <LibraryThemes v-if="library.themes?.length" :themes="library.themes" />
    </div>
  </UDashboardPanelContent>
</template>
