<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'
import frLocale from 'date-fns/locale/fr'

const localePath = useLocalePath()
const { formation } = defineProps<{
  formation: {
    id: number
    name: string
    description: string
    short_description: string
    image: string
    content: string
    created_at: string
    updated_at: string
    tags: object[]
    themes: string
    subject: string
    duration: string
    classes: object[]
    author: object
    comments: object[]
    chapters: object[]
  }
}>()
</script>

<template>
  <UBlogPost :to="localePath({ name: 'library-formations-id', params: { id: formation.id } })" :ui="{ wrapper: 'gap-y-0', date: 'text-xs', authors: { wrapper: 'mt-0' }, container: 'p-2 group-hover:bg-gray-50 group-hover:dark:bg-gray-700 rounded-b-lg bg-gray-100 dark:bg-gray-800 border border-t-0 border-solid border-gray-200 dark:border-gray-700', image: { wrapper: 'ring-0 border-x border-t border-gray-200 dark:border-gray-700 rounded-none rounded-t-lg' }, badge: { wrapper: 'absolute top-2 left-2.5 mb-0 py-0' } }">
    <template #image>
      <img v-if="formation.image" class="cursor-pointer block object-cover w-full h-full transform transition-transform duration-200 hover:scale-105" :src="formation.image" :alt="formation.name">
      <div v-else class="flex items-center justify-center bg-gray-200 dark:bg-gray-800 w-full h-full">
        <UIcon name="i-heroicons-photo" class="w-24 h-24 text-white" />
      </div>
    </template>
    <template #default>
      <div class="space-y-2">
        <div class="flex gap-1 flex-wrap">
          <UBadge v-for="tag in formation.tags" :key="tag.id" :label="tag.name" color="gray" size="xs" />
        </div>

        <div>
          <h2 class="text-gray-900 dark:text-white font-semibold line-clamp-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200 text-sm">{{ formation.name }}</h2>
          <p class="line-clamp-2 text-gray-400 text-xs mt-0.5">{{ formation.description || 'Description de test temporaire' }}</p>
        </div>

        <div class="flex items-center justify-between flex-wrap gap-2">
          <div class="flex items-center gap-1">
            <UIcon name="i-heroicons-bars-3-bottom-right" class="w-3.5 h-3.5 text-primary" />
            <p class="text-gray-400 text-xs">28 leçons</p>
          </div>

          <div class="flex items-center gap-1">
            <UIcon name="i-heroicons-clock" class="w-3.5 h-3.5 text-primary" />
            <p class="text-gray-400 text-xs">{{ formation.duration }}</p>
          </div>

          <div class="flex items-center gap-1">
            <UIcon name="i-heroicons-user-group" class="w-3.5 h-3.5 text-primary" />
            <p class="text-gray-400 text-xs">342</p>
          </div>
        </div>

        <UAvatarGroup size="xs" max="2">
          <UAvatar alt="Terminale Production Graphique" :ui="{ background: 'bg-white dark:bg-gray-900' }" />
          <UAvatar alt="Seconde Développement Web" :ui="{ background: 'bg-white dark:bg-gray-900' }" />
          <UAvatar alt="Première Design d'interface" :ui="{ background: 'bg-white dark:bg-gray-900' }" />
        </UAvatarGroup>

        <div class="flex items-center justify-start gap-1 mt-1">
          <UIcon name="i-heroicons-clock" class="w-3.5 h-3.5 text-gray-400" />
          <p class="text-gray-400 text-xs">
            {{ formation.updated_at === formation.created_at ? 'Créé' : 'Modifié' }} {{ formatDistanceToNow(new Date(formation.updated_at), { locale: frLocale, addSuffix: true }) }}
          </p>
        </div>
      </div>
      <UDropdown :ui="{ wrapper: 'absolute top-2.5 right-2.5', item: { size: 'text-xs' }, width: 'w-auto' }" :items="[[{ label: 'Modifier', icon: 'i-heroicons-pencil-square', click: () => console.log('edit event click') }, { label: 'Supprimer', icon: 'i-heroicons-trash', color: 'red', click: () => console.log('delete event click') }]]" :popper="{ placement: 'bottom-end' }">
        <UButton icon="i-heroicons-ellipsis-horizontal" variant="soft" color="gray" :padded="false" />

        <template #item="{ item }">
          <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4" :class="item.label === 'Supprimer' ? 'text-red-500 dark:text-red-400' : ''" />

          <span class="truncate" :class="item.label === 'Supprimer' ? 'text-red-500 dark:text-red-400' : ''">{{ item.label }}</span>
        </template>
      </UDropdown>
    </template>
  </UBlogPost>
</template>
