<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'
import frLocale from 'date-fns/locale/fr'

defineProps({
  lessons: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="flex flex-wrap items-center justify-between gap-2 pb-4">
    <div>
      <p class="text-gray-900 dark:text-white font-semibold">
        {{ $t('page.library.lessons.label') }}
      </p>
      <p class="mt-1 text-gray-500 dark:text-gray-400 text-sm">{{ $t('page.library.lessons.description') }}</p>
    </div>
    <ULink :to="localePath({ name: 'library-lessons' })" class="text-sm text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 flex items-center gap-1.5">
      {{ $t('commons.see_all') }}
      <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
    </ULink>
  </div>
  <UBlogList v-if="lessons.length" orientation="horizontal" :ui="{ wrapper: 'p-px gap-4 sm:grid sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5' }">
    <UBlogPost :ui="{ wrapper: 'gap-y-3', title: 'text-sm', date: 'text-xs', authors: { wrapper: 'mt-0' }, image: { wrapper: 'ring-0 border border-dashed border-gray-200 group-hover:border-gray-300' } }">
      <template #image>
        <div class="flex flex-col items-center justify-center h-full">
          <UIcon name="i-heroicons-plus" class="w-20 h-20 text-gray-200 group-hover:text-gray-300" />
        </div>
      </template>
      <template #default>
        <h2 class="text-gray-400 dark:text-white font-semibold truncate group-hover:text-gray-00 dark:group-hover:text-gray-300 transition-colors duration-200 text-sm">Créer une nouvelle leçon</h2>
      </template>
    </UBlogPost>
    <UBlogPost v-for="lesson in lessons.slice(0, 5)" :key="lesson.id" :to="localePath({ name: 'library-lessons-id', params: { id: lesson.id } })" :ui="{ wrapper: 'gap-y-3', title: 'text-sm', date: 'text-xs', authors: { wrapper: 'mt-0' }, image: { wrapper: 'pointer-events-auto' }, badge: { wrapper: 'absolute top-2 left-2.5 mb-0 py-0' } }">
      <template #badge>
        <UBadge variant="solid" :color="lesson.draft ? 'primary' : 'green'" size="xs">{{ lesson.draft ? 'Brouillon' : 'Publié' }}</UBadge>
      </template>
      <template #image>
        <img class="cursor-pointer block object-cover object-top w-full h-full transform transition-transform duration-200 hover:scale-105" src="https://images.unsplash.com/photo-1558637845-c8b7ead71a3e?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" :alt="lesson.label">
      </template>
      <template #default>
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-gray-900 dark:text-white font-semibold line-clamp-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200 text-sm">{{ lesson.name }}</h2>
            <p class="line-clamp-2 text-gray-400 text-xs mt-0.5">{{ lesson.updated_at === lesson.created_at ? 'Créé' : 'Modifié' }} {{ formatDistanceToNow(new Date(lesson.updated_at), { locale: frLocale, addSuffix: true }) }}</p>
          </div>
          <UDropdown :ui="{ wrapper: 'absolute top-2.5 right-2.5', item: { size: 'text-xs' }, width: 'w-auto' }" :items="[[{ label: 'Renommer', icon: 'i-heroicons-pencil-square' }, { label: 'Supprimer', icon: 'i-heroicons-trash', color: 'red' }]]" :popper="{ placement: 'bottom-end' }">
            <UButton icon="i-heroicons-ellipsis-horizontal" variant="soft" color="gray" :padded="false" />
          </UDropdown>
        </div>
      </template>
    </UBlogPost>
  </UBlogList>
  <UButton v-else label="Créer une leçon" color="gray" trailing-icon="i-heroicons-plus" />
</template>
