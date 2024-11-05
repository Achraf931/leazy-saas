<script setup lang="ts">
import type { DashboardSidebarLink } from '#ui-pro/types'
const props = defineProps<{
  item: DashboardSidebarLink
  open: boolean
}>()
defineEmits<{
  navigate: []
}>()
const route = useRoute()
const isActive = computed(() => props.item.exact ? route.path === props.item.to : route.path.startsWith(props.item.to as string))
</script>

<template>
  <NuxtLinkLocale
      :to="item.to"
      :exact="item.exact"
      :class="[
      'relative',
      'size-10 group-data-[state=expanded]:w-full',
      'transition-[width] duration-200',
      'flex items-center rounded-md',
      'group-data-[state=collapsed]:justify-center',
      'group-data-[state=expanded]:-space-x-2',
      isActive
        ? 'text-gray-900 hover:text-gray-900 dark:text-white dark:hover:text-white bg-gray-100 dark:bg-gray-800'
        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50',
      'group/item',
    ]"
      @click="() => $emit('navigate')"
  >
    <span
        :class="[
        'absolute left-0 top-0 flex items-center size-10 items-center justify-center',
        isActive ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500 group-hover/item:text-gray-700 dark:group-hover/item:text-gray-200',
      ]"
    >
      <UIcon v-if="item.icon" :name="item.icon" class="size-5" />
    </span>
    <span
        :aria-hidden="open || undefined"
        :class="[
        'min-w-[128px] text-sm',
        'absolute left-7 group-data-[state=expanded]:left-12',
        'opacity-0 group-data-[state=expanded]:opacity-100',
        'transition-[left,opacity,margin]',
      ]"
    >
      {{ item.label }}
    </span>
  </NuxtLinkLocale>
</template>