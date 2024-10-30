<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'
import frLocale from 'date-fns/locale/fr'

const { get } = useApi('summary')
const { data: library, refresh } = await useAsyncData('library', async () => get())
</script>

<template>
  <UDashboardPanelContent>
    <template v-if="library.lessons?.length">
      <div class="flex flex-wrap items-center justify-between gap-2 pb-2">
        <p class="text-gray-900 dark:text-white font-semibold">
          {{ $t('page.library.lessons.label') }}
        </p>
        <ULink :to="localePath({ name: 'library-lessons' })" class="text-sm text-primary hover:opacity-75 flex items-center gap-1.5">
          {{ $t('commons.see_all') }}
          <UIcon name="i-heroicons-chevron-right-20-solid" class="w-4 h-4" />
        </ULink>
      </div>
      <UBlogList v-if="library.lessons.length" orientation="horizontal" :ui="{ wrapper: 'p-px gap-4 sm:grid sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' }">
        <Suspense>
          <LessonsCard v-for="lesson in library.lessons" :key="lesson.id" :lesson :refresh />
        </Suspense>
      </UBlogList>
      <UButton v-else label="Créer une leçon" color="gray" trailing-icon="i-heroicons-plus" />
    </template>

    <div class="grid lg:grid-cols-2 lg:items-start gap-4 mt-4">
      <UDashboardCard v-if="library.chapters?.length" :ui="{ header: { padding: 'px-2 py-2 pb-0 sm:px-2' }, body: { padding: 'px-2 py-2 sm:p-2' } }">
        <template #header>
          <div class="flex align-center justify-between w-full">
            <p class="text-gray-900 dark:text-white font-semibold">
              Mes derniers chapitres
            </p>
            <NuxtLink :to="localePath({ name: 'library-chapters' })" class="text-sm text-primary hover:opacity-75 flex items-center gap-1.5">
              {{ $t('commons.see_all') }}
              <UIcon name="i-heroicons-chevron-right-20-solid" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </template>
        <NuxtLink v-for="chapter in library.chapters" :key="chapter.id" :to="localePath({ name: 'library-chapters-id', params: { id: chapter.id } })" class="px-3 py-2 -mx-2 last:-mb-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer flex items-center gap-3 relative">
          <div class="flex items-center gap-3 text-sm flex-1">
            <img class="w-8 h-8 object-cover rounded-md" :src="chapter.image" :alt="chapter.name" />
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
      <UDashboardCard v-if="library.themes?.length" :ui="{ header: { padding: 'px-2 py-2 pb-0 sm:px-2' }, body: { padding: 'px-2 py-2 sm:p-2' } }">
        <template #header>
          <div class="flex align-center justify-between w-full">
            <p class="text-gray-900 dark:text-white font-semibold">
              Mes derniers thèmes
            </p>
            <NuxtLink :to="localePath({ name: 'library-themes' })" class="text-sm text-primary hover:opacity-75 flex items-center gap-1.5">
              {{ $t('commons.see_all') }}
              <UIcon name="i-heroicons-chevron-right-20-solid" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </template>
        <NuxtLink v-for="theme in library.themes" :key="theme.id" :to="localePath({ name: 'library-themes-id', params: { id: theme.id } })" class="px-3 py-2 -mx-2 last:-mb-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer flex items-center gap-3 relative">
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
    </div>
  </UDashboardPanelContent>
</template>
