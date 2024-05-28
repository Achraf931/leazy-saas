<template>
  <UPopover :ui="{ trigger: 'h-full', arrow: { base: 'w-3.5 h-3.5' } }" :popper="{ placement: 'bottom-start' }">
    <UButton
      size="2xs"
      variant="ghost"
      :icon="activeItem?.icon"
      color="gray"
      square
      :ui="{ icon: { size: { '2xs': 'h-3.5 w-3.5' } } }"
    >
      <template #trailing>
        <UIcon name="i-heroicons-chevron-down-20-solid" class="w-3.5 h-3.5" />
      </template>
    </UButton>
    <template #panel="{ close }">
      <div class="flex flex-col gap-1 p-1">
        <UButton
            size="xs"
            v-for="(item, index) in items"
            :key="index"
            :label="item.name"
            :variant="activeItem.name === item.name ? 'soft' : 'ghost'"
            :color="activeItem.name === item.name ? 'primary' : 'gray'"
            :active="activeItem.name === item.name"
            @click="() => { item.command(); close(); }"
        >
          <template #leading>
            <div class="flex items-center justify-center p-px font-medium border rounded-sm border-stone-200">
              <UIcon :name="item.icon" class="w-4 h-4" />
            </div>
          </template>
        </UButton>
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
    name: 'Texte',
    icon: 'i-lucide-case-sensitive',
    command: () => editor.chain().focus().toggleNode('paragraph', 'paragraph').run(),
    isActive: () => editor.isActive('paragraph') && !editor.isActive('bulletList') && !editor.isActive('orderedList')
  },
  {
    name: 'Titre 1',
    icon: 'i-lucide-heading-1',
    command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: () => editor.isActive('heading', { level: 1 })
  },
  {
    name: 'Titre 2',
    icon: 'i-lucide-heading-2',
    command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: () => editor.isActive('heading', { level: 2 })
  },
  {
    name: 'Titre 3',
    icon: 'i-lucide-heading-3',
    command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: () => editor.isActive('heading', { level: 3 })
  },
  {
    name: 'Titre 4',
    icon: 'i-lucide-heading-4',
    command: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
    isActive: () => editor.isActive('heading', { level: 4 })
  },
  {
    name: 'Titre 5',
    icon: 'i-lucide-heading-5',
    command: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
    isActive: () => editor.isActive('heading', { level: 5 })
  },
  {
    name: 'Titre 6',
    icon: 'i-lucide-heading-6',
    command: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
    isActive: () => editor.isActive('heading', { level: 6 })
  },
  {
    name: 'Liste de tâches',
    icon: 'i-lucide-list-todo',
    command: () => editor.chain().focus().toggleTaskList().run(),
    isActive: () => editor.isActive('taskItem')
  },
  {
    name: 'Liste à puce',
    icon: 'i-lucide-list',
    command: () => editor.chain().focus().toggleBulletList().run(),
    isActive: () => editor.isActive('bulletList')
  },
  {
    name: 'Liste numérotée',
    icon: 'i-lucide-list-ordered',
    command: () => editor.chain().focus().toggleOrderedList().run(),
    isActive: () => editor.isActive('orderedList')
  },
  {
    name: 'Quote',
    icon: 'i-lucide-quote',
    command: () => editor.chain().focus().toggleNode('paragraph', 'paragraph').toggleBlockquote.run(),
    isActive: () => editor.isActive('blockquote')
  },
  {
    name: 'Code',
    icon: 'i-lucide-code',
    command: () => editor.chain().focus().toggleCodeBlock().run(),
    isActive: () => editor.isActive('codeBlock')
  }
]

const activeItem = computed(() => items.filter(item => item.isActive()).pop() ?? { name: 'Texte', icon: 'i-lucide-case-sensitive' })
</script>
