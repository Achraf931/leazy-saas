<template>
  <BubbleMenu
      class="bubble-menu bubble-columns-table"
      :editor="editor"
      pluginKey="columns-bubble-menu"
      :shouldShow="shouldShow"
      :tippyOptions="tippyOptions"
  >
    <div>
     test
    </div>
  </BubbleMenu>
</template>

<script setup>
import { posToDOMRect, BubbleMenu } from '@tiptap/vue-3'
import { findParentNode } from '@/prosemirror'

// Define the editor prop for this component
const props = defineProps({
  editor: {
    type: Object,
    required: true,
  },
})

// Determine if the bubble menu should be displayed
const shouldShow = computed(() => {
  return props.editor.isActive('columns')
})

// Options for positioning the bubble menu
const tippyOptions = {
  getReferenceClientRect: () => {
    const { selection } = props.editor.state
    const predicate = (node) => node.type.name === 'columns'
    const parent = findParentNode(predicate)(selection)

    if (parent) {
      const dom = props.editor.view.nodeDOM(parent.pos)
      return dom.getBoundingClientRect()
    }

    return posToDOMRect(props.editor.view, selection.from, selection.to)
  },
}

// Functions for various actions in the bubble menu
const addColBefore = () => {
  props.editor
      .chain()
      .focus()
      .addColBefore()
      .run()
}

const addColAfter = () => {
  props.editor
      .chain()
      .focus()
      .addColAfter()
      .run()
}

const deleteCol = () => {
  props.editor
      .chain()
      .focus()
      .deleteCol()
      .run()
}
</script>
