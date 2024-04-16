<template>
  <BubbleMenu
    :editor="editor"
    class="flex bg-white border divide-x rounded shadow-xl w-fit divide-stone-200 border-stone-200"
  >
    <div class="flex">
      <NodeSelector :editor="editor" />
      <LinkSelector :editor="editor" />
      <button
        v-for="(item, index) in items"
        :key="index"
        class="p-2 text-stone-600 hover:bg-stone-100 active:bg-stone-200"
        type="button"
        @click="item.command()"
      >
        <component
          :is="item.icon"
          class="w-4 h-4"
          :class="{ 'text-blue-500': item.isActive() }"
        />
      </button>
      <ColorSelector :editor="editor" />
    </div>
  </BubbleMenu>
</template>

<script setup lang="ts">
import type { PropType } from '#imports'
import { BubbleMenu } from '@tiptap/vue-3'
import { Editor } from '@tiptap/core'
import { BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon, CodeIcon } from 'lucide-vue-next'
import NodeSelector from './NodeSelector'
import LinkSelector from './LinkSelector'
import ColorSelector from './ColorSelector'

const { editor } = defineProps({
  editor: {
    type: Object as PropType<Editor>,
    required: true
  }
})

const items = [
  {
    name: 'bold',
    isActive: () => editor.isActive('bold'),
    command: () => editor.chain().focus().toggleBold().run(),
    icon: BoldIcon
  },
  {
    name: 'italic',
    isActive: () => editor.isActive('italic'),
    command: () => editor.chain().focus().toggleItalic().run(),
    icon: ItalicIcon
  },
  {
    name: 'underline',
    isActive: () => editor.isActive('underline'),
    command: () => editor.chain().focus().toggleUnderline().run(),
    icon: UnderlineIcon
  },
  {
    name: 'strike',
    isActive: () => editor.isActive('strike'),
    command: () => editor.chain().focus().toggleStrike().run(),
    icon: StrikethroughIcon
  },
  {
    name: 'code',
    isActive: () => editor.isActive('code'),
    command: () => editor.chain().focus().toggleCode().run(),
    icon: CodeIcon
  }
]
</script>
