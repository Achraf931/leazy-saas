<script setup lang="ts">
import { ThemesModal, ThemesDeleteThemeModal } from '#components'
import { formatDistanceToNow } from 'date-fns'
import frLocale from 'date-fns/locale/fr'

const modal = useModal()

const { theme, refresh, redirect } = defineProps({
  theme: {
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
  modal.open(ThemesModal, {
    theme,
    refresh,
    onClose: () => modal.close()
  })
}

const handleDelete = () => {
  modal.open(ThemesDeleteThemeModal, {
    theme,
    redirect,
    refresh,
    onClose: () => modal.close()
  })
}
</script>

<template>
  <UBlogPost :to="localePath({ name: 'library-themes-id', params: { id: theme.id } })" :ui="{ wrapper: 'gap-y-0 hover:opacity-75', container: 'p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-solid border-gray-200 dark:border-gray-700' }" class="text-xs">
    <div class="flex items-start justify-between w-full">
      <div class="flex items-center gap-2 mb-2">
        <UIcon name="i-heroicons-book-open" class="w-6 h-6" />
        <h2 class="text-gray-900 dark:text-white font-semibold line-clamp-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200 text-base">{{ theme.name }}</h2>
      </div>
      <UDropdown :ui="{ item: { size: 'text-xs' }, width: 'w-auto' }" :items="[[{ label: 'Modifier', icon: 'i-heroicons-pencil-square', click: () => handleModal() }, { label: 'Supprimer', icon: 'i-heroicons-trash', color: 'red', click: () => handleDelete() }]]" :popper="{ placement: 'bottom-end' }">
        <UButton icon="i-heroicons-ellipsis-vertical" variant="ghost" color="gray" :padded="false" />

        <template #item="{ item }">
          <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4" dynamic :class="item.label === 'Supprimer' ? 'text-red-500 dark:text-red-400' : ''" />

          <span class="truncate" :class="item.label === 'Supprimer' ? 'text-red-500 dark:text-red-400' : ''">{{ item.label }}</span>
        </template>
      </UDropdown>
    </div>
    <div class="flex items-center justify-start gap-1">
      <UIcon name="i-heroicons-clock" class="w-3.5 h-3.5 text-gray-400" />
      <p class="text-gray-400 text-xs">{{ theme.updated_at === theme.created_at ? 'Créé' : 'Modifié' }} {{ formatDistanceToNow(new Date(theme.updated_at), { locale: frLocale, addSuffix: true }) }}</p>
    </div>
  </UBlogPost>
</template>
