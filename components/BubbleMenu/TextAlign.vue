<template>
  <Popover>
    <div class="relative h-full">
      <PopoverButton class="flex items-center h-full gap-1 p-2 text-sm font-medium text-stone-600 hover:bg-stone-100 active:bg-stone-200 focus:outline-none">
        <UIcon :name="activeItem?.icon || 'i-lucide-align-left'" class="w-4 h-4" />
        <ChevronDown class="w-4 h-4" />
      </PopoverButton>

      <PopoverPanel
          v-slot="{ close }"
          align="start"
          class="z-[99999] absolute my-1 gap-1 flex overflow-hidden rounded border border-stone-200 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1"
      >
        <UButton
          v-for="(item, index) in items"
          :key="index"
          :icon="item.icon"
          variant="soft"
          :color="activeItem.name === item.name ? 'primary' : 'gray'"
          :active="activeItem.name === item.name"
          @click="() => { item.command(); close(); }"
        />
      </PopoverPanel>
    </div>
  </Popover>
</template>

<script setup lang="ts">
import { computed, type PropType } from '#imports'
import { Editor } from '@tiptap/core'
import { ChevronDown } from 'lucide-vue-next'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

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
    name: 'Right',
    icon: 'i-lucide-align-right',
    command: () => editor.chain().focus().setTextAlign('right').run(),
    isActive: () => editor.isActive({ textAlign: 'right' })
  },
  {
    name: 'Center',
    icon: 'i-lucide-align-center',
    command: () => editor.chain().focus().setTextAlign('center').run(),
    isActive: () => editor.isActive({ textAlign: 'center' })
  },
  {
    name: 'Justify',
    icon: 'i-lucide-align-justify',
    command: () => editor.chain().focus().setTextAlign('justify').run(),
    isActive: () => editor.isActive({ textAlign: 'justify' })
  }
]

const activeItem = computed(() => items.filter(item => item.isActive()).pop() ?? { name: 'Left' })
</script>
