<template>
  <div class="overflow-hidden flex flex-col relative divide-y divide-gray-200 dark:divide-gray-700 ring-1 ring-gray-200 dark:ring-gray-700 rounded-md shadow-lg bg-white dark:bg-gray-800" ref="menuRef">
    <button class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium text-sm gap-x-1.5 px-2.5 py-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center" @click="duplicateContent">
      <Copy class="w-4 h-4" />
      Dupliquer
    </button>
    <button class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium text-sm gap-x-1.5 px-2.5 py-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center" @click="deleteSelection">
      <Trash class="w-4 h-4" />
      Supprimer
    </button>
  </div>
</template>

<script setup>
import { Trash, Copy } from 'lucide-vue-next'
import tippy from 'tippy.js';

const menuRef = ref(null);
const popup = ref(null);

const { editor } = defineProps({
  editor: {
    type: Object,
    required: true
  }
});
const view = editor.view;

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
      ally: false,
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
</script>
