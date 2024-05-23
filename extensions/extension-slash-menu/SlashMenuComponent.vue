<script setup lang="ts">
import { ref, watch, inject, type PropType } from '#imports'
import { Editor, type Range } from '@tiptap/core'
import type { SuggestionItem } from './slashMenuScript'
import { useCompletion } from 'ai/vue'
import { getPrevText } from './getPrevText'

const props = defineProps({
  items: {
    type: Array as PropType<SuggestionItem[]>,
    required: true
  },
  command: {
    type: Function,
    required: true
  },
  editor: {
    type: Object as PropType<Editor>,
    required: true
  },
  range: {
    type: Object as PropType<Range>,
    required: true
  }
})

const selectedIndex = ref(0)

const { complete, isLoading } = useCompletion({
  id: 'leazy-editor',
  api: inject('completionApi'),
  onResponse: (_) => {
    props.editor.chain().focus().deleteRange(props.range).run()
  },
  onFinish: (_prompt, completion) => {
    props.editor.commands.setTextSelection({
      from: props.range.from,
      to: props.range.from + completion.length
    })
  },
  onError: error => {
    console.error(error)
  }
})

const commandListContainer = ref<HTMLElement | null>(null)

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowUp') {
    selectedIndex.value = (selectedIndex.value + props.items.length - 1) % props.items.length
    scrollToSelected()
    return true
  }

  if (e.key === 'ArrowDown') {
    selectedIndex.value = (selectedIndex.value + 1) % props.items.length
    scrollToSelected()
    return true
  }

  if (e.key === 'Enter') {
    selectItem(selectedIndex.value)
    return true
  }

  return false
}

watch(() => props.items, () => {
  selectedIndex.value = 0
})

defineExpose({ onKeyDown })

const selectItem = (index: number) => {
  const item = props.items[index]

  if (item) {
    if (item.label === 'Complétez avec l\'IA') {
      if (isLoading.value) return

      complete(getPrevText(props.editor, { chars: 5000, offset: 1 }))
    } else props.command(item)
  }
}

const updateScrollView = (container: HTMLElement, item: HTMLElement) => {
  const containerHeight = container.offsetHeight
  const itemHeight = item ? item.offsetHeight : 0

  const top = item.offsetTop
  const bottom = top + itemHeight

  if (top < container.scrollTop) container.scrollTop -= container.scrollTop - top + 5
  else if (bottom > containerHeight + container.scrollTop) container.scrollTop += bottom - containerHeight - container.scrollTop + 5
}

const scrollToSelected = () => {
  const container = commandListContainer.value
  const item = container?.children[selectedIndex.value] as HTMLElement

  if (container && item) updateScrollView(container, item)
}
</script>

<template>
  <div
      v-if="items.length > 0"
      ref="commandListContainer"
      class="flex flex-col z-50 h-auto max-h-[330px] w-60 overflow-y-auto rounded-md border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 p-1 gap-1 shadow-md transition-all"
  >
    <UButton
        size="xs"
        :variant="index === selectedIndex ? 'soft' : 'ghost'"
        :color="index === selectedIndex ? 'primary' : 'gray'"
        :active="index === selectedIndex"
        v-for="(item, index) in items"
        :key="index"
        @click="selectItem(index)"
        :loading="item.label === 'Complétez avec l\'IA' && isLoading"
    >
      <template #leading>
        <div class="flex items-center justify-center p-px font-medium border rounded-sm border-gray-200 dark:border-gray-700">
          <svg v-if="item.label === 'Complétez avec l\'IA' && isLoading" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <UIcon v-else :name="item.icon" dynamic class="w-4 h-4" />
        </div>
      </template>

      <div class="flex flex-1 items-center justify-between">
        <span>{{ item.label }}</span>
        <div class="flex items-center gap-0.5 ml-auto">
          <UKbd v-if="item.shortcuts.length" v-for="(shortcut, index) in item.shortcuts" :key="index" size="xs" :value="shortcut" />
        </div>
      </div>
    </UButton>
  </div>
</template>
