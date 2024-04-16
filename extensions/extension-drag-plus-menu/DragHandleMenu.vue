<script setup lang="ts">
const props = defineProps({
  isOpen: Boolean,
  setOpened: Function,
  onClickRemoveFormatting: Function,
  onClickDelete: Function
})

const items = [[
  {
    label: 'Remove formatting',
    icon: 'i-lucide-remove-formatting',
    click: props.onClickRemoveFormatting
  },
  {
    label: 'Delete',
    icon: 'i-lucide-trash',
    click: props.onClickDelete
  }
]]
</script>

<template>
  <UDropdown v-if="isOpen" :items="items">
    <UButton variant="ghost" icon="i-lucide-grip-vertical" color="gray" size="xs" square />
  </UDropdown>
</template>
