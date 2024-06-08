<script setup lang="ts">
import { NodeViewWrapper } from '@tiptap/vue-3'
import { LessonsSlideover } from '#components'
import { formatDistanceToNow } from 'date-fns'
import frLocale from 'date-fns/locale/fr'

const slideover = useSlideover()
const props = defineProps(['node', 'selected'])

const openSlideover = () => {
  slideover.open(LessonsSlideover, {
    lesson: {
      ...props.node.attrs,
      content: JSON.parse(props.node.attrs.content)
    },
    onClose: slideover.close
  })
}
</script>

<template>
  <NodeViewWrapper data-type="lesson" data-drag-handle>
    <div class="flex items-center w-full p-3 my-3 hover:bg-gray-100 dark:hover:bg-gray-700 border border-border border-gray-200 dark:border-gray-700 cursor-pointer rounded-lg transition-all">
      <div class="flex justify-between items-center w-full">
        <div class="flex justify-center items-center gap-3">
          <UIcon name="i-lucide-notebook-text" class="w-6 h-6" />
          <div class="flex flex-col">
            <span class="text-sm">{{ node.attrs.name }}</span>
            <span class="text-[11px] text-gray-400 dark:text-gray-300">{{ node.attrs.updated_at === node.attrs.created_at ? 'Créé' : 'Modifié' }} {{ formatDistanceToNow(new Date(node.attrs.updated_at), { locale: frLocale, addSuffix: true }) }}</span>
          </div>
        </div>
        <UIcon name="i-lucide-panel-right-open" @click.stop="openSlideover" />
      </div>
    </div>
  </NodeViewWrapper>
</template>
