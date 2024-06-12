<script setup>
const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="bg-white rounded-md max-w-48 w-full border border-gray-200 dark:border-gray-700 p-3 shadow-sm dark:bg-gray-800">
    <pre>{{ event }}</pre>
  </div>
</template>
