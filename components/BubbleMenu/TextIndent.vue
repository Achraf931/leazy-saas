<template>
  <div class="flex gap-1">
    <UTooltip
      v-for="(item, index) in items"
      :key="index"
      :text="item.tooltip"
    >
      <UButton
        :icon="item.icon"
        variant="ghost"
        size="xs"
        color="gray"
        @click="item.command()"
      />
    </UTooltip>
  </div>
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
    name: 'Indent',
    tooltip: 'Indenter',
    icon: 'i-lucide-indent-increase',
    command: () => editor.chain().focus().indent().run(),
    isActive: () => editor.isActive('indent')
  },
  {
    name: 'Outdent',
    tooltip: 'Désindenter',
    icon: 'i-lucide-indent-decrease',
    command: () => editor.chain().focus().outdent().run(),
    isActive: () => editor.isActive('outdent')
  }
]

const activeItem = computed(() => items.find(item => item.isActive()))
</script>
