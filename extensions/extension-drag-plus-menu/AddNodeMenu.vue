<script setup lang="ts">
import { Editor } from '@tiptap/vue-3'

const props = defineProps({
  editor: Editor,
  isOpen: Boolean,
  setOpen: Function
})

const state = ref({
  editor: props.editor,
  range: {
    from: props.editor.state.selection.anchor,
    to: props.editor.state.selection.anchor + 1
  }
})
</script>

<template>
  <UButton @click="setOpen(!isOpen)" variant="ghost" size="xs" color="gray" icon="i-lucide-plus" square />
</template>
