<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'
import frLocale from 'date-fns/locale/fr'

defineProps({
  themes: {
    type: Array,
    required: true
  }
})
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
        <NuxtLink :to="localePath({ name: 'library-themes' })" class="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          Voir tout
          <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
        </NuxtLink>
      </div>
    </template>
    <NuxtLink v-for="theme in themes.slice(0, 4)" :key="theme.id" :to="localePath({ name: 'library-themes-id_slug', params: { id: theme.id, slug: theme.slug } })" class="px-3 py-2 -mx-2 last:-mb-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer flex items-center gap-3 relative">
      <div class="text-sm flex-1">
        <div>
          <p class="text-gray-900 dark:text-white font-medium">
            {{ theme.name }}
          </p>
          <p class="text-gray-500 text-xs dark:text-gray-400">
            {{ theme.updated_at === theme.created_at ? 'Créé' : 'Modifié' }} {{ formatDistanceToNow(new Date(theme.updated_at), { locale: frLocale, addSuffix: true }) }}
          </p>
        </div>
      </div>

      <UKbd>
        {{ theme.id }}
      </UKbd>
    </NuxtLink>
  </UDashboardCard>
</template>
