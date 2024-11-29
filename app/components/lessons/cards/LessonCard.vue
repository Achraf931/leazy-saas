<script setup lang="ts">
import { CreateLessonModal, ConfirmDeleteLessonModal } from '#components'
import { formatDistanceToNow } from 'date-fns'
import frLocale from 'date-fns/locale/fr'

const modal = useModal()
const localePath = useLocalePath()

const { lesson, template, redirect, refresh } = defineProps({
  lesson: {
    type: Object,
    required: true
  },
  template: {
    type: Boolean,
    required: false
  },
  redirect: {
    type: Boolean,
    required: false
  },
  refresh: {
    type: Function,
    required: false
  },
})

const handleModal = () => {
  modal.open(CreateLessonModal, {
    lesson,
    refresh,
    onClose: () => modal.close()
  })
}

const handleDelete = () => {
  modal.open(ConfirmDeleteLessonModal, {
    lesson,
    redirect,
    refresh,
    onClose: () => modal.close()
  })
}
</script>

<template>
  <UBlogPost
    v-bind="template ? {} : { to: localePath({ name: 'lesson_id', params: { id: lesson.id } }) }"
    :ui="{ wrapper: 'cursor-pointer gap-y-0', inner: 'flex flex-col justify-between', container: 'p-2 group-hover:bg-gray-50 group-hover:dark:bg-gray-700 rounded-b-lg bg-gray-100 dark:bg-gray-800 border border-t-0 border-solid border-gray-200 dark:border-gray-700', image: { wrapper: 'ring-0 border-x border-t border-gray-200 dark:border-gray-700 rounded-none rounded-t-lg' } }"
    class="text-xs"
  >
    <template #image>
      <NuxtImg v-if="lesson.image" class="cursor-pointer block object-cover w-full h-full transform transition-transform duration-200 hover:scale-105" :src="lesson.image" :alt="lesson.name" />
      <div v-else class="flex items-center justify-center bg-gray-200 dark:bg-gray-900 w-full h-full">
        <UIcon name="i-heroicons-photo" class="w-24 h-24 text-white" />
      </div>
    </template>

    <div class="mb-2">
      <div class="flex items-center justify-between">
        <h2 class="text-gray-900 dark:text-white font-semibold line-clamp-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200 text-base">{{ lesson.name }}</h2>
        <div v-if="!template" class="flex items-start justify-between">
          <UDropdown :ui="{ item: { size: 'text-xs' }, width: 'w-auto' }" :items="[[{ label: 'Modifier', icon: 'i-heroicons-pencil-square', click: () => handleModal() }, { label: 'Supprimer', icon: 'i-heroicons-trash', color: 'red', click: () => handleDelete() }]]" :popper="{ placement: 'bottom-end' }">
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
    <div class="mt-auto space-y-2">
      <div v-if="lesson.chapter" class="flex items-start gap-2">
        <UBadge v-if="lesson.chapter.theme" variant="subtle" color="yellow" size="xs">{{ lesson.chapter.theme.name }}</UBadge>
        <UBadge variant="subtle" color="blue" size="xs">{{ lesson.chapter.name }}</UBadge>
      </div>

      <div v-if="lesson.level" class="flex items-center gap-1">
        <UIcon name="i-heroicons-academic-cap" class="w-3.5 h-3.5 text-gray-400" />
        <p class="text-gray-400 text-xs">{{ lesson.level.name }}</p>
      </div>
      <div class="flex items-center gap-1">
        <UIcon name="i-heroicons-clock" class="w-3.5 h-3.5 text-gray-400" />
        <p class="text-gray-400 text-xs">{{ lesson.updated_at === lesson.created_at ? 'Créé' : 'Modifié' }} {{ formatDistanceToNow(new Date(lesson.updated_at), { locale: frLocale, addSuffix: true }) }}</p>
      </div>
      <UserInfoPopover v-if="template" :user="{ name: 'John Doe', created_at: '05/12/2022', avatar: 'https://img.freepik.com/psd-gratuit/illustration-3d-avatar-profil-humain_23-2150671142.jpg' }" />
    </div>
  </UBlogPost>
</template>
