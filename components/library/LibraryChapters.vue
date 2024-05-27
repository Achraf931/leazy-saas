<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'
import frLocale from 'date-fns/locale/fr'

defineProps({
  chapters: {
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
          Mes derniers chapitres
        </p>
        <NuxtLink :to="localePath({ name: 'library-chapters' })" class="text-sm text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 flex items-center gap-1.5">
          {{ $t('commons.see_all') }}
          <UIcon name="i-heroicons-chevron-right-20-solid" class="w-4 h-4" />
        </NuxtLink>
      </div>
    </template>
    <NuxtLink v-for="chapter in chapters.slice(0, 3)" :key="chapter.id" :to="localePath({ name: 'library-chapters-id', params: { id: chapter.id } })" class="px-3 py-2 -mx-2 last:-mb-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer flex items-center gap-3 relative">
      <div class="flex items-center gap-3 text-sm flex-1">
        <img class="w-8 h-8 object-cover rounded-md" src="https://images.unsplash.com/photo-1537202108838-e7072bad1927?q=80&w=3062&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Image chapitre" />
        <div>
          <p class="text-gray-900 dark:text-white font-medium capitalize">
            {{ chapter.name }}
          </p>
          <p class="text-gray-500 text-xs dark:text-gray-400">
            {{ chapter.updated_at === chapter.created_at ? 'Créé' : 'Modifié' }} {{ formatDistanceToNow(new Date(chapter.updated_at), { locale: frLocale, addSuffix: true }) }}
          </p>
        </div>
      </div>

      <UKbd>
        {{ chapter.id }}
      </UKbd>
    </NuxtLink>
  </UDashboardCard>
</template>
