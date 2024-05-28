<template>
  <UPopover :ui="{ trigger: 'h-full', arrow: { base: 'w-3.5 h-3.5' } }" :popper="{ placement: 'bottom-start' }">
    <UButton
      size="2xs"
      :icon="activeItem?.icon ?? 'i-lucide-align-left'"
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
          size="2xs"
          :color="activeItem.name === item.name ? 'primary' : 'gray'"
          :active="activeItem.name === item.name"
          @click="() => { item.command(); close(); }"
          square
          :ui="{ icon: { size: { '2xs': 'h-3.5 w-3.5' } } }"
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
    name: 'Left',
    icon: 'i-lucide-align-left',
    command: () => editor.chain().focus().setTextAlign('left').run(),
    isActive: () => editor.isActive({ textAlign: 'left' })
  },
  {
    name: 'Center',
    icon: 'i-lucide-align-center',
    command: () => editor.chain().focus().setTextAlign('center').run(),
    isActive: () => editor.isActive({ textAlign: 'center' })
  },
  {
    name: 'Right',
    icon: 'i-lucide-align-right',
    command: () => editor.chain().focus().setTextAlign('right').run(),
    isActive: () => editor.isActive({ textAlign: 'right' })
  },
  {
    name: 'Justify',
    icon: 'i-lucide-align-justify',
    command: () => editor.chain().focus().setTextAlign('justify').run(),
    isActive: () => editor.isActive({ textAlign: 'justify' })
  }
]

const activeItem = computed(() => items.filter(item => item.isActive()).pop() ?? { name: 'Left', icon: 'i-lucide-align-left' })
</script>
