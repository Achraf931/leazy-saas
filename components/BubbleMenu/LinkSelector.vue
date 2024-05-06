<template>
  <UPopover :ui="{ trigger: 'h-full', arrow: { base: 'w-4 h-4' } }" :popper="{ placement: 'bottom-start' }">
    <UButton
      size="xs"
      :variant="editor.isActive('link') ? 'soft' : 'ghost'"
      leading-icon="i-lucide-link"
      :color="editor.isActive('link') ? 'primary' : 'gray'"
    />
    <template #panel="{ close }">
      <UForm @submit="() => { editor.getAttributes('link').href ? editor.chain().focus().unsetLink().run() : editor.chain().focus().setLink({ href: url }).run(); close(); }" class="flex gap-1 p-1">
        <UInput size="xs" autofocus v-model="input" placeholder="Coller une URL" />
        <UButton
          size="xs"
          :variant="editor.getAttributes('link').href ? 'soft' : 'solid'"
          :color="editor.getAttributes('link').href ? 'red' : 'primary'"
          :leading-icon="editor.getAttributes('link').href ? 'i-heroicons-trash' : 'i-heroicons-check'"
          type="submit"
        />
      </UForm>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import { Editor } from '@tiptap/core'

const { editor } = defineProps({
  editor: {
    type: Object as PropType<Editor>,
    required: true
  }
})

const input = shallowRef(editor.getAttributes('link').href || '')
</script>
