<script setup lang="ts">
const { isHelpSlideoverOpen } = useDashboard()
const localePath = useLocalePath()
const { t } = useI18n()
const user = useSanctumUser()
const { logout } = useSanctumAuth()

const items = computed(() => [
  [{
    slot: 'account',
    label: '',
    disabled: true
  }], [{
    label: t('commons.settings'),
    icon: 'i-heroicons-cog-8-tooth',
    shortcuts: ['G', 'S'],
    to: localePath({ name: 'settings' })
  }, {
    label: t('commons.help'),
    icon: 'i-heroicons-question-mark-circle',
    shortcuts: ['?'],
    click: () => isHelpSlideoverOpen.value = true
  }], [{
    label: t('drawer.profile.logout'),
    icon: 'i-heroicons-arrow-left-on-rectangle',
    color: 'red',
    click: async () => await logout()
  }]
])
</script>

<template>
  <UDropdown :items="items" :ui="{ width: 'w-full', item: { disabled: 'cursor-text select-text' } }" :popper="{ strategy: 'absolute', placement: 'top' }" class="w-full">
    <template #default="{ open }">
      <UButton color="gray" variant="ghost" class="w-full" :label="user.firstname" :class="[open && 'bg-gray-50 dark:bg-gray-800']">
        <template #leading>
          <UAvatar src="https://avatars.githubusercontent.com/u/45672435?v=4" size="2xs" />
        </template>

        <template #trailing>
          <UIcon name="i-heroicons-ellipsis-vertical" class="w-5 h-5 ml-auto" />
        </template>
      </UButton>
    </template>

    <template #account>
      <div class="text-left">
        <p>
          {{ $t('drawer.profile.connected_as') }}
        </p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ user.email }}
        </p>
      </div>
    </template>

    <template #item="{ item }">
      <UButton :ui="{ variant: { link: 'no-underline hover:no-underline' }, color: { gray: { link: 'no-underline hover:no-underline' } } }" :to="item.to" :padded="false" :label="item.label" variant="link" :color="item.color || 'gray'" :icon="item.icon" class="w-full">
        <template #trailing>
          <div v-if="item.shortcuts" class="flex items-center gap-1 ml-auto">
            <UBadge v-for="(shortcut, index) in item.shortcuts" :key="index" :label="shortcut" size="xs" color="gray" />
          </div>
        </template>
      </UButton>
    </template>
  </UDropdown>
</template>
