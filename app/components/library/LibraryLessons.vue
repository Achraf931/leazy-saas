<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'
import frLocale from 'date-fns/locale/fr'
import { BaseKit, type BaseKitOptions } from '@/extensions/index.js'

const extensions: BaseKitOptions = [BaseKit]

defineProps({
  lessons: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="flex flex-wrap items-center justify-between gap-2 pb-2">
    <p class="text-gray-900 dark:text-white font-semibold">
      {{ $t('page.library.lessons.label') }}
    </p>
    <ULink :to="localePath({ name: 'library-lessons' })" class="text-sm text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 flex items-center gap-1.5">
      {{ $t('commons.see_all') }}
      <UIcon name="i-heroicons-chevron-right-20-solid" class="w-4 h-4" />
    </ULink>
  </div>
  <UBlogList v-if="lessons.length" orientation="horizontal" :ui="{ wrapper: 'p-px gap-4 sm:grid sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' }">
    <UBlogPost v-for="lesson in lessons.slice(0, 8)" :key="lesson.id" :to="localePath({ name: 'lesson_id', params: { id: lesson.id } })" :ui="{ wrapper: 'gap-y-0 hover:opacity-75', container: 'p-2 rounded-b-lg bg-gray-100 dark:bg-gray-800 border border-t-0 border-solid border-gray-200 dark:border-gray-700', image: { wrapper: 'ring-0 border-x border-t border-gray-200 dark:border-gray-700 rounded-none rounded-t-lg' } }" class="text-xs">
      <template #image>
        <Editor :model-value="JSON.parse(lesson.content)" content-class="preview-editor" :extensions="extensions" :editable="false" :disabled="true" :hideToolbar="true" :hideBubble="true" max-width="100%" />
      </template>
      <div class="mb-2">
        <div class="flex items-center justify-between">
          <h2 class="text-gray-900 dark:text-white font-semibold line-clamp-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200 text-base">{{ lesson.name }}</h2>
          <div class="flex items-start justify-between">
            <UDropdown :ui="{ item: { size: 'text-xs' }, width: 'w-auto' }" :items="[[{ label: 'Modifier', icon: 'i-heroicons-pencil-square', click: () => handleModal(lesson, true) }, { label: 'Supprimer', icon: 'i-heroicons-trash', color: 'red', click: (e) => handleDelete(e, lesson) }]]" :popper="{ placement: 'bottom-end' }">
              <UButton icon="i-heroicons-ellipsis-vertical" variant="ghost" color="gray" :padded="false" />

              <template #item="{ item }">
                <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4" :class="item.label === 'Supprimer' ? 'text-red-500 dark:text-red-400' : ''" />

                <span class="truncate" :class="item.label === 'Supprimer' ? 'text-red-500 dark:text-red-400' : ''">{{ item.label }}</span>
              </template>
            </UDropdown>
          </div>
        </div>
        <p class="line-clamp-2 text-gray-400 text-xs mt-0.5">{{ lesson.description }}</p>
      </div>
      <div v-if="lesson.chapter" class="flex items-start gap-2">
        <UBadge v-if="lesson.chapter.theme" variant="soft" color="yellow" size="xs">{{ lesson.chapter.theme.name }}</UBadge>
        <UBadge variant="soft" color="blue" size="xs">{{ lesson.chapter.name }}</UBadge>
      </div>
      <div class="flex items-center justify-start gap-1 mt-2">
        <UIcon name="i-heroicons-clock" class="w-3.5 h-3.5 text-gray-400" />
        <p class="text-gray-400 text-xs">{{ lesson.updated_at === lesson.created_at ? 'Créé' : 'Modifié' }} {{ formatDistanceToNow(new Date(lesson.updated_at), { locale: frLocale, addSuffix: true }) }}</p>
      </div>
    </UBlogPost>
  </UBlogList>
  <UButton v-else label="Créer une leçon" color="gray" trailing-icon="i-heroicons-plus" />
</template>
