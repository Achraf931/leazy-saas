<template>
  <UTooltip title="Test">
    <UButton icon="i-heroicons-plus" @click="insertColumns" :disabled="!isColumnsActive" />
  </UTooltip>
</template>

<script setup>
// Editor prop passed to the component
const { editor } = defineProps({
  editor: {
    type: Object,
    required: true,
  },
})

// Function to check if the 'Columns' extension is active
const isColumnsActive = editor.isActive('columns')

// Function to insert columns into the editor
const insertColumns = () => {
  editor
      .chain()
      .focus()
      .insertColumns()
      .run()
}
</script>
