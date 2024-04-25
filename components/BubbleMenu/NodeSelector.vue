<template>
  <Popover>
    <div class="relative">
      <PopoverButton class="flex items-center gap-1 p-2 text-sm font-medium whitespace-nowrap text-stone-600 hover:bg-stone-100 active:bg-stone-200 focus:outline-none">
        <span>{{ activeItem?.name }}</span>
        <ChevronDown class="w-4 h-4" />
      </PopoverButton>

      <PopoverPanel
        v-slot="{ close }"
        align="start"
        class="z-[99999] absolute my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border border-stone-200 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1"
      >
        <button
          v-for="(item, index) in items"
          :key="index"
          class="flex items-center justify-between px-2 py-1 text-sm rounded-sm text-stone-600 hover:bg-stone-100"
          type="button"
          @click="() => { item.command(); close(); }"
        >
          <div class="flex items-center space-x-2">
            <div class="p-1 border rounded-sm border-stone-200">
              <component
                :is="item.icon"
                class="w-3 h-3"
              />
            </div>
            <span>{{ item.name }}</span>
          </div>
          <Check
            v-if="activeItem.name === item.name"
            class="w-4 h-4"
          />
        </button>
      </PopoverPanel>
    </div>
  </Popover>
</template>

<script setup lang="ts">
import { computed, type PropType } from '#imports'
import { Editor } from '@tiptap/core'
import { Check, ChevronDown, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, TextQuote, ListOrdered, TextIcon, Code, CheckSquare } from 'lucide-vue-next'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

const { editor } = defineProps({
  editor: {
    type: Object as PropType<Editor>,
    required: true
  }
})

const items = [
  {
    name: 'Texte',
    icon: TextIcon,
    command: () => editor.chain().focus().toggleNode('paragraph', 'paragraph').run(),
    isActive: () => editor.isActive('paragraph') && !editor.isActive('bulletList') && !editor.isActive('orderedList')
  },
  {
    name: 'Titre 1',
    icon: Heading1,
    command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: () => editor.isActive('heading', { level: 1 })
  },
  {
    name: 'Titre 2',
    icon: Heading2,
    command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: () => editor.isActive('heading', { level: 2 })
  },
  {
    name: 'Titre 3',
    icon: Heading3,
    command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: () => editor.isActive('heading', { level: 3 })
  },
  {
    name: 'Titre 4',
    icon: Heading4,
    command: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
    isActive: () => editor.isActive('heading', { level: 4 })
  },
  {
    name: 'Titre 5',
    icon: Heading5,
    command: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
    isActive: () => editor.isActive('heading', { level: 5 })
  },
  {
    name: 'Titre 6',
    icon: Heading6,
    command: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
    isActive: () => editor.isActive('heading', { level: 6 })
  },
  {
    name: 'Liste de tâches',
    icon: CheckSquare,
    command: () => editor.chain().focus().toggleTaskList().run(),
    isActive: () => editor.isActive('taskItem')
  },
  {
    name: 'Liste à puce',
    icon: ListOrdered,
    command: () => editor.chain().focus().toggleBulletList().run(),
    isActive: () => editor.isActive('bulletList')
  },
  {
    name: 'Liste numérotée',
    icon: ListOrdered,
    command: () => editor.chain().focus().toggleOrderedList().run(),
    isActive: () => editor.isActive('orderedList')
  },
  {
    name: 'Quote',
    icon: TextQuote,
    command: () => editor.chain().focus().toggleNode('paragraph', 'paragraph').toggleBlockquote.run(),
    isActive: () => editor.isActive('blockquote')
  },
  {
    name: 'Code',
    icon: Code,
    command: () => editor.chain().focus().toggleCodeBlock().run(),
    isActive: () => editor.isActive('codeBlock')
  }
]

const activeItem = computed(() => items.filter(item => item.isActive()).pop() ?? { name: 'Multiple' })
</script>
