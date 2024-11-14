<script setup lang="ts">
import data from '@/data'

const localePath = useLocalePath()
const { setBreadcrumbs } = useDashboard()

setBreadcrumbs([
  {
    label: 'Bibliothèque',
    to: localePath({ name: 'library' })
  },
  {
    label: 'Formations',
    to: localePath({ name: 'library-formations' })
  },
  {
    label: 'Titre de la formation',
    to: localePath({ name: 'library-formations-id', params: { id: '1' } })
  },
  {
    label: 'Titre de la leçon'
  }
])
</script>

<template>
  <div class="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
    <div class="font-bold px-4 lg:px-[calc((100%_-_(750px))_/_2)] mt-[25px] mb-5 text-3xl tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl outline-none ring-none">
      Titre de la leçon
    </div>

    <LeazyEditor v-model="data.content" :hide-toolbar="true" :disabled="true" :editable="false" class="flex-1" max-width="800" />
  </div>
</template>
