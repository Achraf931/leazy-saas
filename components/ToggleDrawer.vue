<script setup lang="ts">
const { isDrawerSlideoverMode, isDrawerSlideoverOpen, openDrawer, handleDrawerMode, handleDrawer } = useDashboard()

defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="hidden lg:flex items-center justify-start gap-2.5">
    <UButton @mouseenter="openDrawer" @click.native="handleDrawerMode" variant="ghost" color="white" class="relative before:block before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:z-10 before:bg-transparent before:w-[calc(var(--header-height)-0px)] before:h-[--header-height]" :padded="false" @click="openDrawer">
      <template #leading>
        <div class="border-r border-gray-200 pr-2.5 mr-1.5 flex items-center h-full">
          <UIcon dynamic :name="`i-fluent-panel-left-32-${!isDrawerSlideoverMode || isDrawerSlideoverOpen ? 'filled' : 'regular'}`" class="w-4 h-4 text-gray-500 dark:text-gray-200" />
        </div>
      </template>
    </UButton>
    <h1 v-if="title" class="flex items-center gap-1.5 font-semibold text-gray-900 dark:text-white min-w-0">
      <span class="truncate">{{ title }}</span>
    </h1>
  </div>
</template>
