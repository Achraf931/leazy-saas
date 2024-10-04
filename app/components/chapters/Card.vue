<script setup lang="ts">
import { ChaptersModal, ChaptersDeleteChapterModal } from '#components'
import { formatDistanceToNow } from 'date-fns'
import frLocale from 'date-fns/locale/fr'

const modal = useModal()

const { chapter, refresh, redirect } = defineProps({
  chapter: {
    type: Object,
    required: true
  },
  refresh: {
    type: Function,
    required: false
  },
  redirect: {
    type: Boolean,
    required: false
  }
})

const handleModal = () => {
  modal.open(ChaptersModal, {
    chapter,
    refresh,
    onClose: () => modal.close()
  })
}

const handleDelete = () => {
  modal.open(ChaptersDeleteChapterModal, {
    chapter,
    redirect,
    refresh,
    onClose: () => modal.close()
  })
}
</script>

<template>
  <UBlogPost :to="localePath({ name: 'library-chapters-id', params: { id: chapter.id } })" :ui="{ wrapper: 'gap-y-0 hover:opacity-75', date: 'text-xs', authors: { wrapper: 'mt-0' }, container: 'p-2 rounded-b-lg bg-gray-100 dark:bg-gray-800 border border-t-0 border-solid border-gray-200 dark:border-gray-700', image: { wrapper: 'ring-0 border-x border-t border-gray-200 dark:border-gray-700 rounded-none rounded-t-lg' }, badge: { wrapper: 'absolute top-2 left-2.5 mb-0 py-0' } }">
    <template #image>
      <img v-if="chapter.image" class="cursor-pointer block object-cover w-full h-full transform transition-transform duration-200 hover:scale-105" :src="chapter.image || 'https://imgproxy.services.pitch.com/_/resizing_type:fit/plain/pitch-publish-user-assets/templates/posters/moodboard.jpg'" :alt="chapter.name">
      <div v-else class="flex items-center justify-center bg-gray-200 dark:bg-gray-800 w-full h-full">
        <UIcon name="i-heroicons-photo" class="w-24 h-24 text-white" />
      </div>
    </template>
    <template #default>
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-gray-900 dark:text-white font-semibold line-clamp-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200 text-sm">{{ chapter.name }}</h2>
          <!-- <p class="line-clamp-2 text-gray-400 text-xs mt-0.5">{{ chapter.description || 'Description de test temporaire' }}</p> -->
          <div class="flex items-center justify-start gap-1 mt-1">
            <UIcon name="i-heroicons-clock" class="w-3.5 h-3.5 text-gray-400" />
            <p class="text-gray-400 text-xs">{{ chapter.updated_at === chapter.created_at ? 'Créé' : 'Modifié' }} {{ formatDistanceToNow(new Date(chapter.updated_at), { locale: frLocale, addSuffix: true }) }}</p>
          </div>
        </div>
        <UDropdown :ui="{ wrapper: 'absolute top-2.5 right-2.5', item: { size: 'text-xs' }, width: 'w-auto' }" :items="[[{ label: 'Modifier', icon: 'i-heroicons-pencil-square', click: () => handleModal() }, { label: 'Supprimer', icon: 'i-heroicons-trash', color: 'red', click: () => handleDelete() }]]" :popper="{ placement: 'bottom-end' }">
          <UButton icon="i-heroicons-ellipsis-horizontal" variant="soft" color="gray" :padded="false" />

          <template #item="{ item }">
            <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4" :class="item.label === 'Supprimer' ? 'text-red-500 dark:text-red-400' : ''" />

            <span class="truncate" :class="item.label === 'Supprimer' ? 'text-red-500 dark:text-red-400' : ''">{{ item.label }}</span>
          </template>
        </UDropdown>
      </div>
    </template>
  </UBlogPost>
</template>
