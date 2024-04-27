<template>
  <BubbleMenu
      :editor="editor"
      :tippyOptions="tippyOptions"
      :shouldShow="shouldShow"
      class="flex bg-white border divide-x rounded shadow-md text-xs w-fit divide-stone-200 border-stone-200"
  >
    <div v-if="!isSelecting" class="bubbleMenu" ref="menuRef">
      <div class="flex">
        <NodeSelector :editor="editor" />
        <LinkSelector :editor="editor" />
        <button
            v-for="(item, index) in items"
            :key="index"
            class="p-2 text-stone-600 hover:bg-stone-100 active:bg-stone-200"
            type="button"
            @click="item.command()"
        >
          <component
              :is="item.icon"
              class="w-4 h-4"
              :class="{ 'text-primary': item.isActive() }"
          />
        </button>
        <TextAlign :editor="editor" />
        <ColorSelector :editor="editor" />
      </div>
    </div>
  </BubbleMenu>
</template>

<script setup lang="ts">
import { CellSelection } from '@tiptap/pm/tables'
import { BubbleMenu, isNodeSelection } from '@tiptap/vue-3'
import { BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon, CodeIcon } from 'lucide-vue-next'
import NodeSelector from './NodeSelector'
import LinkSelector from './LinkSelector'
import ColorSelector from './ColorSelector'
import TextAlign from './TextAlign'

const props = defineProps({
  editor: {
    type: Object,
    required: true,
  }
})
const menuRef = ref(null);
const isSelecting = ref(false);
const items = [
  {
    name: 'bold',
    isActive: () => props.editor.isActive('bold'),
    command: () => props.editor.chain().focus().toggleBold().run(),
    icon: BoldIcon
  },
  {
    name: 'italic',
    isActive: () => props.editor.isActive('italic'),
    command: () => props.editor.chain().focus().toggleItalic().run(),
    icon: ItalicIcon
  },
  {
    name: 'underline',
    isActive: () => props.editor.isActive('underline'),
    command: () => props.editor.chain().focus().toggleUnderline().run(),
    icon: UnderlineIcon
  },
  {
    name: 'strike',
    isActive: () => props.editor.isActive('strike'),
    command: () => props.editor.chain().focus().toggleStrike().run(),
    icon: StrikethroughIcon
  },
  {
    name: 'code',
    isActive: () => props.editor.isActive('code'),
    command: () => props.editor.chain().focus().toggleCode().run(),
    icon: CodeIcon
  }
]

const isCellSelection = (value: unknown): value is CellSelection => {
  return value instanceof CellSelection
}

const tippyOptions = {
  duration: 100,
  theme: 'light-border no-padding',
  arrow: false,
  appendTo: 'parent',
  animation: 'shift-away',
  inertia: true,
};

const shouldShow = ({ view, state }) => {
  const { selection } = state;
  const { empty } = selection;
  const hasEditorFocus = view.hasFocus();

  return !(!hasEditorFocus || empty || !props.editor.isEditable || isNodeSelection(selection) || isCellSelection(selection) || isSelecting.value)
};

const handleMouseDown = () => {
  const handleMouseMove = () => {
    if (!props.editor.state.selection.empty) {
      isSelecting.value = true;
      document.removeEventListener('mousemove', handleMouseMove);
    }
  };

  const handleMouseUp = () => {
    isSelecting.value = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
};

onMounted(() => {
  document.addEventListener('mousedown', handleMouseDown);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleMouseDown);
});
</script>
