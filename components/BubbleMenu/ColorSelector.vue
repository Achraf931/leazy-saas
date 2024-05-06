<template>
  <UPopover :ui="{ trigger: 'h-full', arrow: { base: 'w-4 h-4' } }" :popper="{ placement: 'bottom-start' }">
    <UButton
        size="xs"
        :variant="editor.isActive('textStyle', { color: activeColorItem?.color }) || editor.isActive('highlight', { color: activeHighlightItem?.color }) ? 'soft' : 'ghost'"
        label="A"
        :color="editor.isActive('textStyle', { color: activeColorItem?.color }) || editor.isActive('highlight', { color: activeHighlightItem?.color }) ? 'primary' : 'gray'"
    >
      <template #default>
        <p :style="{ color: activeColorItem?.color, backgroundColor: activeHighlightItem?.color }" class="px-1 font-medium border rounded-sm border-stone-200">A</p>
      </template>
      <template #trailing>
        <UIcon name="i-heroicons-chevron-down-20-solid" class="w-4 h-4" />
      </template>
    </UButton>

    <template #panel="{ close }">
      <div class="flex flex-col gap-1 p-1 max-h-80 w-36 overflow-x-hidden overflow-y-auto">
        <p class="px-2 mb-1 text-xs text-stone-500">Couleur</p>
        <UButton
            v-for="(textColor, index) in TEXT_COLORS"
            :key="index"
            :variant="editor.isActive('textStyle', { color: textColor.color }) ? 'soft' : 'ghost'"
            :color="editor.isActive('textStyle', { color: textColor.color }) ? 'primary' : 'gray'"
            size="xs"
            :label="textColor.name"
            @click="() => { editor.commands.unsetColor(); textColor.name !== 'Default' && editor.chain().focus().setColor(textColor.color || '').run(); }"
        >
          <template #default>
            <p class="px-1 font-medium border rounded-sm border-stone-200" :style="{ color: textColor.color }">A</p>
            <p>{{ textColor.name }}</p>
          </template>
        </UButton>
        <p class="px-2 mt-2 mb-1 text-xs text-stone-500">Fond</p>
        <UButton
            v-for="(highlightColor, index) in HIGHLIGHT_COLORS"
            :key="index"
            :variant="editor.isActive('highlight', { color: highlightColor.color }) ? 'soft' : 'ghost'"
            :color="editor.isActive('highlight', { color: highlightColor.color }) ? 'primary' : 'gray'"
            size="xs"
            :label="highlightColor.name"
            @click="() => { editor.commands.unsetHighlight(); highlightColor.name !== 'Default' && editor.commands.setHighlight({ color: highlightColor.color }); close(); }"
        >
          <template #default>
            <p class="px-1 font-medium border rounded-sm border-stone-200" :style="{ backgroundColor: highlightColor.color }">A</p>
            <p>{{ highlightColor.name }}</p>
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

const TEXT_COLORS = [
  {
    name: 'Default',
    color: 'var(--leazy-black)'
  },
  {
    name: 'Purple',
    color: '#9333EA'
  },
  {
    name: 'Red',
    color: '#E00000'
  },
  {
    name: 'Yellow',
    color: '#EAB308'
  },
  {
    name: 'Blue',
    color: '#2563EB'
  },
  {
    name: 'Green',
    color: '#008A00'
  },
  {
    name: 'Orange',
    color: '#FFA500'
  },
  {
    name: 'Pink',
    color: '#BA4081'
  },
  {
    name: 'Gray',
    color: '#A8A29E'
  }
]

const HIGHLIGHT_COLORS = [
  {
    name: 'Default',
    color: 'var(--leazy-highlight-default)'
  },
  {
    name: 'Purple',
    color: 'var(--leazy-highlight-purple)'
  },
  {
    name: 'Red',
    color: 'var(--leazy-highlight-red)'
  },
  {
    name: 'Yellow',
    color: 'var(--leazy-highlight-yellow)'
  },
  {
    name: 'Blue',
    color: 'var(--leazy-highlight-blue)'
  },
  {
    name: 'Green',
    color: 'var(--leazy-highlight-green)'
  },
  {
    name: 'Orange',
    color: 'var(--leazy-highlight-orange)'
  },
  {
    name: 'Pink',
    color: 'var(--leazy-highlight-pink)'
  },
  {
    name: 'Gray',
    color: 'var(--leazy-highlight-gray)'
  }
]

const activeColorItem = computed(() => TEXT_COLORS.find(({ color }) => editor.isActive('textStyle', { color })))
const activeHighlightItem = computed(() => HIGHLIGHT_COLORS.find(({ color }) => editor.isActive('highlight', { color })))
</script>
