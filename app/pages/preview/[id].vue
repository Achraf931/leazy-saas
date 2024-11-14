<script setup lang="ts">
const localePath = useLocalePath()
const { setBreadcrumbs } = useDashboard()
const documentId = computed(() => useRoute().params.id)

const { data: formation } = await useFetch('/api/formations', { watch: false, query: { id: documentId.value }, default: () => ({}) })

setBreadcrumbs([
  {
    label: 'Bibliothèque',
    to: localePath({ name: 'library' })
  },
  {
    label: 'Formations',
    to: localePath({ name: 'library-formations' })
  },
  {
    label: formation.value?.name,
    to: localePath({ name: 'library-formations-id', params: { id: documentId.value } })
  },
  {
    label: 'Prévisualiser'
  }
])
</script>

<template>
  <UDashboardPanelContent class="text-sm" :ui="{ wrapper: 'flex-row gap-4 overflow-y-hidden' }">
    <div class="w-9/12 overflow-y-auto no-scrollbar">
      <NuxtPage :formation />
    </div>

    <div class="w-3/12 rounded-lg border bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 flex flex-col">
      <div class="p-4">
        <UButton :to="localePath({ name: 'library-formations-id', params: { id: documentId } })" label="Retourner à la formation" color="primary" leading-icon="i-heroicons-arrow-uturn-left" block />
      </div>

      <UDivider :ui="{ border: { base: 'dark:border-gray-700' } }" />

      <UButton :to="localePath({ name: 'preview-id', params: { id: documentId }, query: { tab: 'overview' } })" label="Introduction" size="sm" class="border-b border-gray-200 dark:border-gray-700 opacity-75 flex items-center justify-between gap-2 font-semibold hover:opacity-100 p-3 w-full text-left" :ui="{ rounded: 'rounded-none' }" :padded="false" trailing-icon="i-heroicons-arrow-right-20-solid" variant="ghost" color="gray" />

      <UAccordion :items="formation.chapters" :ui="{ wrapper: 'flex flex-col w-full divide-y divide-gray-200 dark:divide-gray-700', item: { base: 'flex flex-col gap-1.5 bg-white dark:bg-gray-700', padding: 'px-1.5 pb-1.5' } }">
        <template #default="{ item, index, open }">
          <UButton color="gray" variant="ghost" :class="[open && 'border-b']" class="border-gray-200 dark:border-gray-700" :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">
            <span class="truncate font-semibold">{{ index + 1 }}. {{ item.label }}</span>

            <template #trailing>
              <UIcon
                name="i-heroicons-chevron-right-20-solid"
                class="w-5 h-5 ms-auto transform transition-transform duration-200"
                :class="[open && 'rotate-90']"
              />
            </template>
          </UButton>
        </template>

        <template #item="{ item }">
          <UButton v-for="lesson in item.lessons" :key="lesson.id" :to="localePath({ name: 'preview-id-lesson-lesson_id', params: { id: documentId, lesson_id: lesson.id } })" leading-icon="i-heroicons-document-text" size="xs" color="gray" variant="ghost" :label="lesson.label"/>
        </template>
      </UAccordion>

      <UButton :to="localePath({ name: 'preview-id', params: { id: documentId }, query: { tab: 'resources' } })" label="Ressources" size="sm" class="border-t border-gray-200 dark:border-gray-700 opacity-75 flex items-center justify-between gap-2 font-semibold hover:opacity-100 p-3 w-full text-left" :ui="{ rounded: 'rounded-none' }" :padded="false" trailing-icon="i-heroicons-arrow-right-20-solid" variant="ghost" color="gray" />

      <UDivider :ui="{ border: { base: 'dark:border-gray-700' } }" />
    </div>
  </UDashboardPanelContent>
</template>
