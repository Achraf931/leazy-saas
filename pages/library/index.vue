<script setup lang="ts">
import { useChaptersStore, useLessonsStore, useThemesStore } from '@/stores/library'

const chaptersStore = useChaptersStore()
const lessonsStore = useLessonsStore()
const themesStore = useThemesStore()

const { chapters } = storeToRefs(chaptersStore)
const { lessons } = storeToRefs(lessonsStore)
const { themes } = storeToRefs(themesStore)
</script>

<template>
  <UDashboardPanelContent>
    <LibraryLessons v-if="lessons?.data?.length" :lessons="lessons.data"/>

    <div class="grid lg:grid-cols-2 lg:items-start gap-5 mt-8">
      <LibraryChapters v-if="chapters?.data?.length" :chapters="chapters.data"/>
      <LibraryThemes v-if="themes?.data?.length" :themes="themes.data"/>
    </div>
  </UDashboardPanelContent>
</template>
