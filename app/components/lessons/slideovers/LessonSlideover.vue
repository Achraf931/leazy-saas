<script lang="ts" setup>
import { formatDistanceToNow } from 'date-fns'
import frLocale from 'date-fns/locale/fr'

defineProps({
  lesson: {
    type: Object,
    required: true
  }
})

const emits = defineEmits<{
  close: [];
}>()
</script>

<template>
  <USlideover>
    <UCard class="flex flex-col flex-1 h-full" :ui="{ body: { base: 'flex-1 overflow-hidden' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-baseline justify-between">
          <div>
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">{{ lesson.name }}</h3>
            <p v-if="lesson.description" class="text-xs text-gray-400 dark:text-gray-300">{{ lesson.description }}</p>
          </div>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="emits('close')" />
        </div>
      </template>

      <div class="h-full overflow-auto">
        <LeazyEditor v-model="lesson.content" content-class="sidepanelLesson" :editable="false" :disabled="true" :hideToolbar="true" :hideBubble="true" max-width="100%" />
      </div>

      <template #footer>
        <div class="flex items-center justify-between">
          <p class="text-xs text-gray-400 dark:text-gray-300">{{ lesson.updated_at === lesson.created_at ? 'Créé' : 'Modifié' }} {{ formatDistanceToNow(new Date(lesson.updated_at), { locale: frLocale, addSuffix: true }) }}</p>
          <UButton :to="localePath({ name: 'lesson_id', params: { id: lesson.id } })" target="_blank" icon="i-heroicons-arrow-top-right-on-square" color="gray" variant="link" :padded="true" square />
        </div>
      </template>
    </UCard>
  </USlideover>
</template>

<style>
.sidepanelLesson .tiptap.ProseMirror {
  padding: 0!important;
}
</style>
