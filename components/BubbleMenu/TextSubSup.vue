<template>
  <UPopover :ui="{ trigger: 'h-full', arrow: { base: 'w-3.5 h-3.5' } }" :popper="{ placement: 'bottom-start' }">
    <UButton
      size="2xs"
      :icon="activeItem?.icon ?? 'i-lucide-subscript'"
      :variant="activeItem ? 'soft' : 'ghost'"
      :color="activeItem ? 'primary' : 'gray'"
      square
      :ui="{ icon: { size: { '2xs': 'h-3.5 w-3.5' } } }"
    >
      <template #trailing>
        <UIcon name="i-heroicons-chevron-down-20-solid" class="w-3.5 h-3.5" />
      </template>
    </UButton>
    <template #panel="{ close }">
      <div class="gap-1 flex p-1">
        <UButton
          v-for="(item, index) in items"
          :key="index"
          :icon="item.icon"
          variant="soft"
          size="xs"
          :color="activeItem?.name === item.name ? 'primary' : 'gray'"
          :active="activeItem?.name === item.name"
          @click="() => { item.command(); close(); }"
        />
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import { Editor } from '@tiptap/core'

const { editor } = defineProps({
  editor: {
    type: Object as PropType<Editor>,
    required: true
  }
})

const items = [
  {
    name: 'Subscript',
    icon: 'i-lucide-subscript',
    command: () => editor.chain().focus().unsetSuperscript().toggleSubscript().run(),
    isActive: () => editor.isActive('subscript')
  },
  {
    name: 'Superscript',
    icon: 'i-lucide-superscript',
    command: () => editor.chain().focus().unsetSubscript().toggleSuperscript().run(),
    isActive: () => editor.isActive('superscript')
  }
]

const activeItem = computed(() => items.find(item => item.isActive()))
</script>
