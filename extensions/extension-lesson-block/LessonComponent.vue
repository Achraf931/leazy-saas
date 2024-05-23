<script setup lang="ts">
import { NodeViewWrapper } from '@tiptap/vue-3'
import { LessonsSlideover } from '#components'
import { formatDistanceToNow } from 'date-fns'
import frLocale from 'date-fns/locale/fr'

const slideover = useSlideover()
const props = defineProps(['node', 'selected'])

const openSlideover = () => {
  slideover.open(LessonsSlideover, {
    lesson: props.node.attrs,
    onClose: slideover.close
  })
}
</script>

<template>
  <NodeViewWrapper :class="[selected ? 'ProseMirror-selectednode' : '', 'lesson lessonComponent']">
    <div class="bg-white not-prose flex items-center gap-4 hover:bg-gray-50 dark:bg-gray-800 border border-solid border-gray-200 dark:border-gray-700 p-4 rounded-lg">
      <UIcon name="i-lucide-notebook-text" class="text-5xl text-gray-400 dark:text-gray-500" />
      <div class="text-gray-700 dark:text-gray-300 pointer-events-none">
        <p class="font-bold">{{ node.attrs.name }}</p>
        <p class="text-xs text-gray-400 dark:text-gray-300">{{ node.attrs.updated_at === node.attrs.created_at ? 'Créé' : 'Modifié' }} {{ formatDistanceToNow(new Date(node.attrs.updated_at), { locale: frLocale, addSuffix: true }) }}</p>
      </div>
      <UButton @click="openSlideover" target="_blank" icon="i-lucide-panel-right-open" variant="ghost" color="gray" class="ml-auto" />
    </div>
  </NodeViewWrapper>
</template>
