<template>
  <BaseBubbleMenu
      :editor="editor"
      :plugin-key="pluginKey"
      :should-show="shouldShow"
      :update-delay="0"
      :tippy-options="tippyOptions"
  >
    <div>
      <button
          tooltip="Sidebar left"
          :active="isActiveSidebarLeft"
          @click="onColumnLeft"
      >
        <UIcon name="i-heroicons-arrow-left" />
      </button>
      <button
          tooltip="Two columns"
          :active="isActiveTwoColumn"
          @click="onColumnTwo"
      >
        <UIcon name="i-heroicons-columns" />
      </button>
      <button
          tooltip="Sidebar right"
          :active="isActiveSidebarRight"
          @click="onColumnRight"
      >
        <UIcon name="i-heroicons-arrow-right" />
      </button>
    </div>
  </BaseBubbleMenu>
</template>

<script setup>
import { BubbleMenu as BaseBubbleMenu } from '@tiptap/vue-3'
import { sticky } from 'tippy.js'
import { ColumnLayout } from '../Columns'
import { getRenderContainer } from '@/utils/get-render-container'

const { editor, appendTo } = defineProps({
  editor: {
    type: Object,
    required: true
  },
  appendTo: {
    type: Object,
    required: true
  }
})

const pluginKey = `columnsMenu-${Math.random().toString(36).substr(2, 9)}`

const getReferenceClientRect = () => {
  const renderContainer = getRenderContainer(editor.value, 'columns')
  const rect = renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0)
  return rect
}

const shouldShow = computed(() => editor.value?.isActive('columns'))

const onColumnLeft = () => {
  editor.value?.chain().focus().setLayout(ColumnLayout.SidebarLeft).run()
}

const onColumnRight = () => {
  editor.value?.chain().focus().setLayout(ColumnLayout.SidebarRight).run()
}

const onColumnTwo = () => {
  editor.value?.chain().focus().setLayout(ColumnLayout.TwoColumn).run()
}

const isActiveSidebarLeft = computed(() =>
    editor.value?.isActive('columns', { layout: ColumnLayout.SidebarLeft })
)

const isActiveSidebarRight = computed(() =>
    editor.value?.isActive('columns', { layout: ColumnLayout.SidebarRight })
)

const isActiveTwoColumn = computed(() =>
    editor.value?.isActive('columns', { layout: ColumnLayout.TwoColumn })
)

const tippyOptions = {
  offset: [0, 8],
  popperOptions: {
    modifiers: [{ name: 'flip', enabled: false }],
  },
  getReferenceClientRect,
  appendTo: () => appendTo.value?.current,
  plugins: [sticky],
  sticky: 'popper'
}
</script>
