<script setup lang="ts">
import { formatTimeAgo } from '@vueuse/core'
import type { Notification } from '~/types'

const { isNotificationsSlideoverOpen } = useDashboard()

const { data: notifications } = await useFetch<Notification[]>('/api/notifications')
</script>

<template>
  <UDashboardSlideover v-model="isNotificationsSlideoverOpen">
    <template #title>
      <p class="text-gray-900 dark:text-white font-semibold flex items-center gap-x-1.5 min-w-0">
        Notifications <UKbd class="ml-2">17</UKbd>
      </p>
    </template>
    <NuxtLinkLocale v-for="notification in notifications" :key="notification.id" :to="{ name: 'inbox', query: { id: notification.id } }" class="p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer flex items-center gap-3 relative">
      <UChip color="red" :show="!!notification.unread" inset>
        <UAvatar v-bind="notification.sender.avatar" :alt="notification.sender.name" size="md" />
      </UChip>

      <div class="text-sm flex-1">
        <p class="flex items-center justify-between">
          <span class="text-gray-900 dark:text-white font-medium">{{ notification.sender.name }}</span>

          <time :datetime="notification.date" class="text-gray-500 dark:text-gray-400 text-xs" v-text="formatTimeAgo(new Date(notification.date))" />
        </p>
        <p class="text-gray-500 dark:text-gray-400">
          {{ notification.body }}
        </p>
      </div>
    </NuxtLinkLocale>
  </UDashboardSlideover>
</template>
