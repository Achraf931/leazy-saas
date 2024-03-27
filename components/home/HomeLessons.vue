<script setup>
const lessons = [
  {
    title: 'Leçon 1',
    description: 'Description de la leçon 1',
    to: '/library/lessons/1_lecon-1'
  },
  {
    title: 'Leçon 2',
    description: 'Description de la leçon 2',
    to: '/library/lessons/2_lecon-2'
  },
  {
    title: 'Leçon 3',
    description: 'Description de la leçon 3',
    to: '/library/lessons/3_lecon-3'
  },
  {
    title: 'Leçon 4',
    description: 'Description de la leçon 4',
    to: '/library/lessons/4_lecon-4'
  }
]
</script>

<template>
  <UDashboardCard title="Mes leçons" description="Retrouvez ici toutes vos leçons !" icon="i-heroicons-document" :links="[{ label: 'Voir tout', color: 'gray', variant: 'ghost', to: '/library/lessons', trailingIcon: 'i-heroicons-chevron-right' }]">
    <div class="grid grid-cols-3 gap-3" v-if="lessons.length">
      <NuxtLink v-for="(lesson, index) in lessons" :key="index" :to="lesson.to" class="rounded-md cursor-pointer relative">
        <UCard class="hover:bg-gray-50 dark:hover:bg-gray-800/50 text-sm">
          <p class="text-gray-900 dark:text-white font-medium">
            {{ lesson.title }}
          </p>
          <p class="text-gray-500 dark:text-gray-400">
            {{ lesson.description }}
          </p>
          <UIcon class="absolute top-3 right-3" name="i-heroicons-arrow-up-right" />
        </UCard>
      </NuxtLink>
    </div>
    <UButton v-else label="Créer une leçon" color="gray" trailing-icon="i-heroicons-plus" />
  </UDashboardCard>
</template>
