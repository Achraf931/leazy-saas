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
  <UDashboardCard :ui="{ header: { padding: 'px-2 py-2 pb-0 sm:px-2' }, body: { padding: 'px-2 py-2 sm:p-2' } }">
    <template #header>
      <div class="flex align-center justify-between w-full">
        <p class="text-gray-900 dark:text-white font-semibold">
          Mes derniers thèmes
        </p>
        <NuxtLink :to="localePath({ name: 'library-themes' })" class="text-sm text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 flex items-center gap-1.5">
          {{ $t('commons.see_all') }}
          <UIcon name="i-heroicons-chevron-right-20-solid" class="w-4 h-4" />
        </NuxtLink>
      </div>
    </template>
    <NuxtLink v-for="theme in themes.slice(0, 4)" :key="theme.id" :to="localePath({ name: 'library-themes-id', params: { id: theme.id } })" class="px-3 py-2 -mx-2 last:-mb-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer flex items-center gap-3 relative">
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
