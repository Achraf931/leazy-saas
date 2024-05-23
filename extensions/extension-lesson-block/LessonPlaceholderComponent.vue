<script setup lang="ts">
import { NodeViewWrapper } from '@tiptap/vue-3'
import { useLessonsStore } from '@/stores/library'

const props = defineProps(['editor', 'getPos', 'node', 'selected', 'view', 'updateAttributes', 'deleteNode'])

const loading = ref(false)
const selected = ref()
const { lessons } = storeToRefs(useLessonsStore())

const search = async (q) => {
  loading.value = true

  const lessons = lessons.value?.data.filter(option => option.name.toLowerCase().includes(q.toLowerCase()))

  setTimeout(() => {
    loading.value = false
    return lessons
  }, 500)
}

const insertLesson = (attrs) => {
  props.editor.chain().focus().insertContentAt(props.getPos(), {
    type: 'lesson',
    attrs
  }).run()
  props.deleteNode()
}
</script>

<template>
  <NodeViewWrapper :class="[selected ? 'ProseMirror-selectednode' : '', 'not-prose lessonPlaceholder group w-full']">
    <UInputMenu autofocus default-open placeholder="Chercher une leçon" @change="insertLesson" v-model="selected" :options="lessons.data" option-attribute="name" :ui-menu="{ option: { base: 'not-prose', container: '!m-0' } }" />
  </NodeViewWrapper>
</template>
