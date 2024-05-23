<template>
  <FloatingMenu v-if="editor" :editor="editor" :should-show="shouldShow" :tippy-options="{ duration: 100, hideOnClick: false, maxWidth: '100%' }" @click="editor.view.focus()" data-type="floating-menu" class="flex items-center justify-start gap-2 w-max">
    <UButton label="/" size="2xs" color="gray" variant="solid" @click="editor.commands.insertContent('/')" />
    <p class="text-sm pointer-events-none select-none" style="color: #adb5bd;"> pour les commandes ou </p>
    <UButton variant="solid" size="2xs" :color="editor.isActive('heading', { level: 1 }) ? 'primary' : 'gray'" label="H1" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" />
    <UButton variant="solid" size="2xs" :color="editor.isActive('heading', { level: 2 }) ? 'primary' : 'gray'" label="H2" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" />
    <UButton variant="solid" size="2xs" :color="editor.isActive('bulletList') ? 'primary' : 'gray'" label="Liste" @click="editor.chain().focus().toggleBulletList().run()" />
    <UPopover :popper="{ placement: 'bottom-start' }" :ui="{ wrapper: 'flex items-center' }">
      <UButton leading-icon="i-lucide-wand-sparkles" trailing-icon="i-heroicons-chevron-down-20-solid" label="IA" size="2xs" variant="soft" />
      <template #panel>
        <div class="text-sm p-2">
          Test
        </div>
      </template>
    </UPopover>
  </FloatingMenu>
</template>

<script setup lang="ts">
import { FloatingMenu } from '@tiptap/vue-3'

const props = defineProps({
  editor: {
    type: Object,
    required: true
  }
})

const shouldShow = ({ view, state }) => {
  const { selection } = state
  const { $anchor, empty } = selection
  const isRootDepth = $anchor.depth === 1
  const isEmptyTextBlock = $anchor.parent.isTextblock && !$anchor.parent.type.spec.code && !$anchor.parent.textContent
  const isProhibitedType = $anchor.parent.type.name === 'calloutBox'

  return !(!view.hasFocus() || !empty || !isRootDepth || !isEmptyTextBlock || !props.editor.isEditable || isProhibitedType)
}
</script>
