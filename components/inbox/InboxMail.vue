<script setup lang="ts">
import { format, isToday } from 'date-fns'
import type { Mail } from '~/types'

defineProps({
  mail: {
    type: Object as PropType<Mail>,
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <UDashboardNavbar>
    <template #toggle>
      <UDashboardNavbarToggle icon="i-heroicons-x-mark" />

      <UDivider orientation="vertical" class="mx-1.5 lg:hidden" />
    </template>

    <template #left>
      <div class="flex items-center gap-4">
        <UAvatar v-bind="mail.from.avatar" :alt="mail.from.name" size="xs" />

        <div class="min-w-0">
          <p class="text-xs text-gray-900 dark:text-white font-semibold">
            {{ mail.from.name }}
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400 font-medium">
            {{ mail.subject }}
          </p>
        </div>
      </div>
    </template>

    <template #right>
      <UDropdown :items="dropdownItems">
        <UButton icon="i-heroicons-ellipsis-vertical" color="gray" variant="ghost" />
      </UDropdown>
    </template>
  </UDashboardNavbar>

  <UDashboardPanelContent>
    <div class="flex-1 flex flex-col items-start gap-3 overflow-auto">
      <div class="flex items-start gap-2.5">
        <UAvatar v-bind="mail.from.avatar" :alt="mail.from.name" size="xs" />
        <p class="max-w-[320px] text-sm leading-1.5 text-gray-900 dark:text-white p-3 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">{{ mail.body }}</p>
      </div>

      <div class="self-end flex items-start gap-2.5">
        <p class="max-w-[320px] text-sm leading-1.5 text-white p-3 border-primary-200 bg-primary rounded-s-xl rounded-br-xl">{{ mail.body }}</p>
        <UAvatar src="https://avatars.githubusercontent.com/u/45672435?v=4" :alt="mail.from.name" size="xs" />
      </div>

      <div class="flex items-start gap-2.5">
        <UAvatar v-bind="mail.from.avatar" :alt="mail.from.name" size="xs" />
        <p class="max-w-[320px] text-sm leading-1.5 text-gray-900 dark:text-white p-3 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">{{ mail.body }}</p>
      </div>

      <div class="self-end flex items-start gap-2.5">
        <p class="max-w-[320px] text-sm leading-1.5 text-white p-3 border-primary-200 bg-primary rounded-s-xl rounded-br-xl">{{ mail.body }}</p>
        <UAvatar src="https://avatars.githubusercontent.com/u/45672435?v=4" :alt="mail.from.name" size="xs" />
      </div>

      <div class="flex items-start gap-2.5">
        <UAvatar v-bind="mail.from.avatar" :alt="mail.from.name" size="xs" />
        <p class="max-w-[320px] text-sm leading-1.5 text-gray-900 dark:text-white p-3 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">{{ mail.body }}</p>
      </div>

      <div class="self-end flex items-start gap-2.5">
        <p class="max-w-[320px] text-sm leading-1.5 text-white p-3 border-primary-200 bg-primary rounded-s-xl rounded-br-xl">{{ mail.body }}</p>
        <UAvatar src="https://avatars.githubusercontent.com/u/45672435?v=4" :alt="mail.from.name" size="xs" />
      </div>
    </div>

    <UDivider class="my-5" />

    <form @submit.prevent>
      <UTextarea color="gray" required :rows="5" :placeholder="`Répondre à ${mail.from.name}`">
        <UButton type="submit" color="black" label="Send" icon="i-heroicons-paper-airplane" class="absolute bottom-2.5 right-3.5" />
      </UTextarea>
    </form>
  </UDashboardPanelContent>
</template>
