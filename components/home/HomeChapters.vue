<script setup lang="ts">
const chapters = [
  {
    id: 1,
    title: 'Une circulation économique',
    description: 'Les diversités politiques du monde grec',
    lessons: 5,
    to: '/library/chapters/1_une-circulation-economique'
  },
  {
    id: 2,
    title: 'La cité des Athéniens',
    description: 'Les diversités politiques du monde grec',
    lessons: 3,
    to: '/library/chapters/2_la-cite-des-atheniens'
  },
  {
    id: 3,
    title: 'La cité des Athéniens',
    description: 'Les diversités politiques du monde grec',
    lessons: 3,
    to: '/library/chapters/3_la-cite-des-atheniens'
  },
  {
    id: 4,
    title: 'La cité des Athéniens',
    description: 'Les diversités politiques du monde grec',
    lessons: 3,
    to: '/library/chapters/4_la-cite-des-atheniens'
  }
]
</script>

<template>
  <UDashboardCard>
    <template #header>
      <div class="flex align-center justify-between w-full">
        <div class="flex items-center gap-4">
          <div>
            <p class="text-gray-900 dark:text-white font-semibold">
              Mes derniers chapitres
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Liste de tout mes chapitres
            </p>
          </div>
        </div>
        <NuxtLink to="/library/chapters" class="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          Voir tout
          <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
        </NuxtLink>
      </div>
    </template>
    <NuxtLink v-for="(chapter, index) in chapters" :key="index" :to="chapter.to" class="px-3 py-2 -mx-2 last:-mb-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer flex items-center gap-3 relative">
      <div class="flex items-center gap-3 text-sm flex-1">
        <img class="w-10 h-10 object-cover rounded-md" src="https://images.unsplash.com/photo-1537202108838-e7072bad1927?q=80&w=3062&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Image chapitre" />
        <div>
          <p class="text-gray-900 dark:text-white font-medium">
            {{ chapter.title }}
          </p>
          <p class="text-gray-500 dark:text-gray-400">
            {{ chapter.description }}
          </p>
        </div>
      </div>

      <p class="text-gray-900 dark:text-white font-medium text-lg">
        {{ chapter.lessons }}
      </p>
    </NuxtLink>
  </UDashboardCard>
</template>
