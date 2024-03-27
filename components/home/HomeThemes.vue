<script setup lang="ts">
const themes = [
  {
    title: 'Thème 1',
    description: 'Description du thème 1',
    chapters: 5,
    to: '/library/themes/1_theme-1'
  },
  {
    title: 'Thème 2',
    description: 'Description du thème 2',
    chapters: 3,
    to: '/library/themes/2_theme-2'
  },
  {
    title: 'Thème 3',
    description: 'Description du thème 3',
    chapters: 7,
    to: '/library/themes/3_theme-3'
  },
  {
    title: 'Thème 4',
    description: 'Description du thème 4',
    chapters: 2,
    to: '/library/themes/4_theme-4'
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
              Mes derniers thèmes
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Liste de tout mes thèmes
            </p>
          </div>
        </div>
        <NuxtLink to="/library/chapters" class="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          Voir tout
          <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
        </NuxtLink>
      </div>
    </template>
    <NuxtLink v-for="(theme, index) in themes" :key="index" :to="theme.to" class="px-3 py-2 -mx-2 last:-mb-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer flex items-center gap-3 relative">
      <div class="text-sm flex-1">
        <div>
          <p class="text-gray-900 dark:text-white font-medium">
            {{ theme.title }}
          </p>
          <p class="text-gray-500 dark:text-gray-400">
            {{ theme.description }}
          </p>
        </div>
      </div>

      <p class="text-gray-900 dark:text-white font-medium text-lg">
        {{ theme.chapters }}
      </p>
    </NuxtLink>
  </UDashboardCard>
</template>
