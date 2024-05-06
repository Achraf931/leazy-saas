<script setup lang="ts">
import { Editor } from '@tiptap/core'

const { editor, attrs } = defineProps({
  editor: {
    type: Object as PropType<Editor>,
    required: true
  },
  attrs: {
    type: Object as PropType<{ [key: string]: any }>,
    required: true
  }
})

console.log(attrs)
</script>

<template>
  <NuxtLink v-bind="attrs" class="flex flex-col gap-1.5 bg-white p-2 rounded-lg shadow-lg max-w-52 no-underline">
    <img v-if="attrs['data-image']" :src="attrs['data-image']" class="aspect-video w-full rounded-md border border-solid border-gray-100 dark:border-gray-600" :alt="attrs.href">
    <h2 v-if="attrs['data-site-title']" class="font-semibold text-sm">{{ attrs['data-site-title'] }}</h2>
    <p v-if="attrs['data-site-description'] || attrs['data-description']" class="text-xs line-clamp-3">{{ attrs['data-site-description'] || attrs['data-description'] }}</p>
  </NuxtLink>
</template>
