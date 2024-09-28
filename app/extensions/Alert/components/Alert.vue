<script setup lang="ts">
import { NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'

const props = defineProps(['node', 'editor', 'selected', 'updateAttributes'])

const types = ref([
  {
    name: 'note',
    icon: 'i-fluent-note-24-regular',
    color: 'primary'
  },
  {
    name: 'info',
    icon: 'i-heroicons-information-circle',
    color: 'gray'
  },
  {
    name: 'warning',
    icon: 'i-heroicons-exclamation-triangle',
    color: 'orange'
  },
  {
    name: 'danger',
    icon: 'i-heroicons-x-circle',
    color: 'red'
  },
  {
    name: 'success',
    icon: 'i-heroicons-check-circle',
    color: 'green'
  }
])
</script>

<template>
  <NodeViewWrapper data-type="alert" class="alert">
    <UAlert :icon="types.find(type => type.name === node.attrs.type).icon" :color="types.find(type => type.name === node.attrs.type).color" variant="subtle" >
      <template #description>
        <NodeViewContent class="text-sm font-medium" as="p" />
      </template>
    </UAlert>
  </NodeViewWrapper>
</template>
