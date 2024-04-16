<script setup lang="ts">
import { NodeRangeSelection } from '@tiptap-pro/extension-node-range'
import { Editor } from '@tiptap/vue-3'
import AddNodeMenu from './AddNodeMenu.vue'
import DragHandleMenu from './DragHandleMenu.vue'
import DragHandle from './DragHandle.vue'

const { editor } = defineProps({
  editor: Editor
})

const dragHandleDisclosure = useDisclosure()
const addNodeDisclosure = useDisclosure()
let selection: NodeRangeSelection | null = null
let isLocked = false

const onOpenAddNodeMenu = (isOpen: boolean) => {
  if (isOpen) {
    if (selection) props.editor.chain().setTextSelection(selection.from + 1).run()

    addNodeDisclosure.open()

  } else addNodeDisclosure.close()
}

const onOpenDragHandleMenu = (isOpen: boolean) => {
  isOpen ? dragHandleDisclosure.open() : dragHandleDisclosure.close()
}

const onClickRemoveFormatting = () => {
  if (!selection) return

  props.editor.chain().focus().setNodeSelection(selection.from).unsetAllMarks().setParagraph().run()
}

const onClickDelete = () => {
  if (!selection) return

  props.editor.chain().focus().deleteRange({ from: selection.from, to: selection.to }).run()
}

const setSelection = (newSelection: NodeRangeSelection | null) => {
  selection = newSelection
}

const isLockedEffect = () => {
  dragHandleDisclosure.isOpen || addNodeDisclosure.isOpen ? isLocked = true : isLocked = false
}

isLockedEffect()
</script>

<template>
  <DragHandleMenu
    :isOpen="dragHandleDisclosure.isOpen"
    :setOpened="onOpenDragHandleMenu"
    :onClickRemoveFormatting="onClickRemoveFormatting"
    :onClickDelete="onClickDelete"
  />

  <AddNodeMenu
    :editor="editor"
    :isOpen="addNodeDisclosure.isOpen"
    :setOpen="onOpenAddNodeMenu"
  />

  <DragHandle
    :editor="editor"
    :isLocked="isLocked"
    :setSelection="setSelection"
  />
</template>
