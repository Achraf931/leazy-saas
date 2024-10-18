<script setup lang="ts">
import data from '@/data'

const date = ref(new Date())

const { lesson } = defineProps<{
  lesson?: {
    id: number
    title: string
    content: object
  }
}>()

const fields = reactive({
  title: lesson?.title || '',
  content: lesson?.content || ''
})
</script>

<template>
  <UForm class="space-y-4">
    <h3 class="font-bold mb-2 px-[25px]">Détails</h3>

    <UFormGroup label="Title" required class="px-[25px]">
      <UInput v-model="fields.title" name="title" />
    </UFormGroup>

    <LeazyEditor :model-value="data?.content" content-class="px-0" max-width="100%" />
  </UForm>
</template>