<script setup lang="ts">
const { formation } = defineProps<{
  formation: {
    id: number
    title: string
    description: string
    tags: string[]
    progress: number,
    to: string
  }
}>()

const label = computed(() => (formation.progress === 0 ? 'Non commencé' : formation.progress === 100 ? 'Terminé' : 'En cours'))
const color = computed(() => (formation.progress === 0 ? 'gray' : formation.progress === 100 ? 'green' : 'blue'))
</script>

<template>
  <ULink :to="formation.to" class="hover:opacity-75">
    <UCard :ui="{ base: 'flex flex-col h-full', header: { base: 'flex items-center justify-between', padding: 'px-2 py-2 sm:px-2' }, body: { base: 'flex-1 flex flex-col', padding: 'px-2 py-2 sm:p-2' }, footer: { padding: 'px-2 py-2 sm:px-2' } }">
      <template #header>
        <UBadge :label :variant="formation.progress === 0 ? 'solid' : 'subtle'" :color />
        <UProgress v-if="formation.progress > 0" :value="formation.progress" class="max-w-14" :max="100" size="sm" color="green" indicator />
      </template>

      <h3 class="font-semibold">{{ formation.title }}</h3>
      <p class="text-xs text-gray-500 my-2">{{ formation.description }}</p>

      <div class="flex gap-1 mt-auto">
        <UBadge v-for="tag in formation.tags" :key="tag" :label="tag" color="gray" size="xs" />
      </div>

      <template #footer>
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-1">
            <LazyUIcon name="i-heroicons-bars-3-bottom-right" class="w-3.5 h-3.5 text-gray-400" />
            <p class="text-gray-400 text-xs">28 leçons</p>
          </div>

          <div class="flex items-center gap-1">
            <LazyUIcon name="i-heroicons-clock" class="w-3.5 h-3.5 text-gray-400" />
            <p class="text-gray-400 text-xs">16h</p>
          </div>
        </div>
<!--        <UButton :to="formation.edit" label="Modifier" size="xs" color="orange" variant="soft" class="ml-2" />-->
      </template>
    </UCard>
  </ULink>
</template>