<template>
  <BubbleMenu
    :editor="editor"
    :should-show="shouldShow"
    class="w-max overflow-hidden focus:outline-none relative bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800 rounded-md shadow-lg"
  >
    <div class="bubbleMenu">
      <div class="flex gap-1 p-1">
        <NodeSelector :editor="editor" />

        <UDivider orientation="vertical" />

        <LinkSelector :editor="editor" />

        <UDivider orientation="vertical" />

        <UButton
          v-for="(item, index) in items"
          :key="index"
          :variant="item.isActive() ? 'soft' : 'ghost'"
          size="xs"
          :color="item.isActive() ? 'primary' : 'gray'"
          :icon="item.icon"
          @click="item.command()"
        />

        <TextSubSup :editor="editor" />

<!--        <UInput :ui="{ base: 'w-16' }" v-model="fontSize" @change="editor.chain().focus().setFontSize(`${fontSize}px`).run()" size="xs" placeholder="14" type="number" inputmode="numeric" />-->

        <UTooltip text="Effacer la mise en forme">
          <UButton size="xs" variant="ghost" color="red" @click="editor.chain().focus().unsetAllMarks().run()" icon="i-lucide-remove-formatting" />
        </UTooltip>

        <UDivider orientation="vertical" />

        <TextIndent :editor="editor" />

        <UDivider orientation="vertical" />

        <TextAlign :editor="editor" />

        <UDivider orientation="vertical" />

        <ColorSelector :editor="editor" />

        <UDivider orientation="vertical" />

        <UTooltip text="Demander de l'aide">
          <UButton size="xs" variant="ghost" color="gray" icon="i-lucide-message-square-quote" />
        </UTooltip>
      </div>
    </div>
  </BubbleMenu>
</template>

<script setup lang="ts">
import { CellSelection } from '@tiptap/pm/tables'
import { BubbleMenu, isNodeSelection } from '@tiptap/vue-3'
import NodeSelector from './NodeSelector'
import LinkSelector from './LinkSelector'
import ColorSelector from './ColorSelector'
import TextAlign from './TextAlign'
import TextSubSup from './TextSubSup'
import TextIndent from './TextIndent'

// const fontSize = ref(15)
const props = defineProps({
  editor: {
    type: Object,
    required: true,
  }
})

const isCellSelection = (value: unknown): value is CellSelection => {
  return value instanceof CellSelection
}

const shouldShow = ({ view, state }) => {
  const { selection } = state;
  const { empty, $anchor } = selection;
  const hasEditorFocus = view.hasFocus();
  const isProhibitedType = $anchor.parent.type.name === 'calloutBox'

  return !(!hasEditorFocus || empty || !props.editor.isEditable || isNodeSelection(selection) || isCellSelection(selection) || isProhibitedType)
};

const items = [
  {
    name: 'bold',
    isActive: () => props.editor.isActive('bold'),
    command: () => props.editor.chain().focus().toggleBold().run(),
    icon: 'i-lucide-bold'
  },
  {
    name: 'italic',
    isActive: () => props.editor.isActive('italic'),
    command: () => props.editor.chain().focus().toggleItalic().run(),
    icon: 'i-lucide-italic'
  },
  {
    name: 'underline',
    isActive: () => props.editor.isActive('underline'),
    command: () => props.editor.chain().focus().toggleUnderline().run(),
    icon: 'i-lucide-underline'
  },
  {
    name: 'strike',
    isActive: () => props.editor.isActive('strike'),
    command: () => props.editor.chain().focus().toggleStrike().run(),
    icon: 'i-lucide-strikethrough'
  },
  {
    name: 'code',
    isActive: () => props.editor.isActive('code'),
    command: () => props.editor.chain().focus().toggleCode().run(),
    icon: 'i-lucide-code'
  }
]
</script>
