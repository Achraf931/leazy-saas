<template>
  <div class="overflow-hidden flex flex-col p-1 gap-1 relative ring-1 ring-gray-200 dark:ring-gray-700 rounded-md shadow-lg bg-white dark:bg-gray-800" ref="menuRef">
    <template v-if="isCalloutNode">
      <div class="flex items-center p-1 gap-1">
        <UButton variant="soft" size="xs" color="primary" icon="i-fluent-note-24-regular" @click="editor.commands.updateAttributes('calloutBox', { type: 'note' })" />
        <UButton variant="soft" size="xs" color="gray" icon="i-heroicons-information-circle" @click="editor.commands.updateAttributes('calloutBox', { type: 'info' })" />
        <UButton variant="soft" size="xs" color="orange" icon="i-heroicons-exclamation-triangle" @click="editor.commands.updateAttributes('calloutBox', { type: 'warning' })" />
        <UButton variant="soft" size="xs" color="red" icon="i-heroicons-x-circle" @click="editor.commands.updateAttributes('calloutBox', { type: 'danger' })" />
        <UButton variant="soft" size="xs" color="green" icon="i-lucide-check-circle" @click="editor.commands.updateAttributes('calloutBox', { type: 'success' })" />
      </div>
    </template>
    <UButton v-if="canNodeMoveUp" size="xs" variant="ghost" color="gray" icon="i-lucide-chevron-up" label="Remonter" @click="moveNode('UP')" />
    <UButton v-if="canNodeMoveDown" size="xs" variant="ghost" color="gray" icon="i-lucide-chevron-down" label="Descendre" @click="moveNode('DOWN')" />
    <UButton size="xs" variant="ghost" color="gray" icon="i-lucide-copy" label="Dupliquer" @click="duplicateContent" />
    <UButton size="xs" variant="soft" color="red" icon="i-lucide-trash" label="Supprimer" @click="deleteSelection" />
  </div>
</template>

<script setup>
import { MoveNode } from '@/utils/pm-utils'
import tippy from 'tippy.js';

const { editor } = defineProps({
  editor: {
    type: Object,
    required: true
  }
});
const view = editor.view;

const menuRef = ref(null);
const isCalloutNode = ref(false);
const popup = ref(null);
const canNodeMoveUp = ref(false);
const canNodeMoveDown = ref(false);

const handleClickDragHandle = (event) => {
  const target = event.target;
  if (!target.matches('[data-drag-handle]')) {
    popup.value?.hide();
    return;
  }

  event.preventDefault();

  popup.value?.setProps({
    getReferenceClientRect: () => target.getBoundingClientRect()
  });

  popup.value?.show();
};

const handleKeyDown = () => {
  popup.value?.hide();
};

onMounted(() => {
  document.addEventListener('click', handleClickDragHandle);
  document.addEventListener('keydown', handleKeyDown);

  if (menuRef.value) {
    menuRef.value.remove();
    menuRef.value.style.visibility = 'visible';

    popup.value = tippy(view.dom, {
      getReferenceClientRect: null,
      appendTo: 'parent',
      content: menuRef.value,
      interactive: true,
      inertia: true,
      trigger: 'manual',
      placement: 'top-start',
      hideOnClick: true,
      onBeforeUpdate() {
        canNodeMoveUp.value = canMoveNodeUp();
        canNodeMoveDown.value = canMoveNodeDown();
        isCalloutNode.value = editor.state?.selection?.node?.type?.name === 'calloutBox';
      },
      onShown: () => {
        menuRef.value?.focus();
      }
    });
  }

  return () => {
    document.removeEventListener('click', handleClickDragHandle);
    document.removeEventListener('keydown', handleKeyDown);
    popup.value?.destroy();
    popup.value = null;
  };
});

const deleteSelection = () => {
  editor.commands.deleteSelection();
  popup.value?.hide();
};

const duplicateContent = () => {
  const { view } = editor;
  const { state } = view;
  const { selection } = state;

  editor
      .chain()
      .insertContentAt(
          selection.to,
          selection.content().content.firstChild.toJSON(),
          {
            updateSelection: true
          }
      )
      .focus(selection.to)
      .run();

  popup.value?.hide();
};

const moveNode = (dir) => {
  MoveNode({
    view: editor.view,
    dir,
    currentResolved: editor.state.selection.$from
  })
};

const canMoveNodeUp = () => {
  const selectionStart = editor.view.state.selection.$from
  return selectionStart.index(0) > 0
};

const canMoveNodeDown = () => {
  const selectionStart = editor.view.state.selection.$from
  return selectionStart.index(0) < selectionStart.node(0).childCount - 1
};
</script>
