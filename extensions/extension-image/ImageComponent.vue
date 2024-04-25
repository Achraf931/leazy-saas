<template>
  <NodeViewWrapper
      class="image imageComponent max-w-full"
      :class="[selected ? 'ProseMirror-selectednode' : '', `${node.attrs.align}Align`]"
      :style="`width: ${node.attrs.width};`"
  >
    <div
        class="imageContainer not-prose"
        :class="{ resizing: resizing }"
    >
      <img
          ref="imageRef"
          :src="node.attrs.src"
          :alt="node.attrs.alt"
          :title="node.attrs.title"
      />

      <template v-if="editor.isEditable">
        <div class="resizeHandleContainer" style="left: 0;" @mousedown="startResize">
          <div class="resizeHandle"></div>
        </div>
        <div class="resizeHandleContainer" style="right: 0;" @mousedown="startResize">
          <div class="resizeHandle"></div>
        </div>
        <div class="controls">
          <UButton @click="setFullWidth" size="xs" icon="i-fluent-auto-fit-width-24-filled" variant="ghost" color="gray" />
          <UButton @click="setAlign('left')" :class="{ 'bg-gray-200 dark:bg-gray-600': node.attrs.align === 'left' }" size="xs" icon="i-fluent-align-left-24-filled" variant="ghost" color="gray" />
          <UButton @click="setAlign('center')" :class="{ 'bg-gray-200 dark:bg-gray-600': node.attrs.align === 'center' }" size="xs" icon="i-fluent-align-center-vertical-24-filled" variant="ghost" color="gray" />
          <UButton @click="setAlign('right')" :class="{ 'bg-gray-200 dark:bg-gray-600': node.attrs.align === 'right' }" size="xs" icon="i-fluent-align-right-24-filled" variant="ghost" color="gray" />
        </div>
      </template>
    </div>
  </NodeViewWrapper>
</template>

<script setup lang="ts">
import { NodeViewWrapper } from '@tiptap/vue-3'

const props = defineProps(['node', 'editor', 'selected', 'updateAttributes'])
const imageRef = ref(null)
const resizing = ref(false)
const resizeInitialWidth = ref(0)
const resizeInitialMouseX = ref(0)

const startResize = (event) => {
  event.preventDefault();

  resizing.value = true;
  resizeInitialMouseX.value = event.clientX;
  if (imageRef.value) {
    resizeInitialWidth.value = imageRef.value.offsetWidth;
  }
};

const resize = (event) => {
  if (!resizing.value) {
    return;
  }

  event.preventDefault();

  const dx = event.clientX - resizeInitialMouseX.value;
  const newWidth = Math.max(resizeInitialWidth.value + dx, 150); // Minimum width: 150

  props.updateAttributes({
    width: newWidth + 'px'
  });
};

const endResize = () => {
  resizing.value = false;
  resizeInitialMouseX.value = 0;
  resizeInitialWidth.value = 0;
};

onMounted(() => {
  window.addEventListener("mousemove", resize);
  window.addEventListener("mouseup", endResize);

  onUnmounted(() => {
    window.removeEventListener("mousemove", resize);
    window.removeEventListener("mouseup", endResize);
  });
});

const setFullWidth = () => {
  props.updateAttributes({
    width: '100%',
    align: 'left'
  });
};

const setAlign = (alignment) => {
  props.updateAttributes({
    align: alignment
  });
};
</script>
