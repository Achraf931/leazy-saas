<script setup lang="ts">
import type { DashboardSidebarLink } from '#ui-pro/types';
const props = defineProps<{
  links: DashboardSidebarLink[][];
}>();
const open = ref(false);
console.log(props.links);
const userDropdownOpen = ref(false);
</script>

<template>
  <div class="w-14 h-full flex flex-col">
    <nav
        :data-state="open ? 'expanded' : 'collapsed'"
        :class="[
        'group z-10 h-full w-14 data-[state=expanded]:w-[13rem]',
        'border-r bg-background border-gray-200 dark:border-gray-800 data-[state=expanded]:shadow-xl',
        'transition-width duration-200',
        'hide-scrollbar flex flex-col overflow-y-auto overflow-x-hidden'
      ]"
        @mouseenter="() => open = true"
        @mouseleave="() => open = false || userDropdownOpen"
    >
      <ul class="flex flex-col gap-y-1 justify-start relative px-2 pt-2">
        <SidebarItem
            v-for="item in links"
            :key="item.label"
            :item="item"
            :open="open"
            @navigate="open = false"
        />
        <UDivider />
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>