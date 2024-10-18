<script setup lang="ts">
const items = [{
  label: 'Getting Started',
  icon: 'i-heroicons-information-circle',
  defaultOpen: true,
  lessons: [
    {
      id: 1,
      label: 'Leçon 1',
      icon: 'i-heroicons-document-text'
    }
  ]
}, {
  label: 'Installation',
  icon: 'i-heroicons-arrow-down-tray',
  lessons: [
    {
      id: 2,
      label: 'Leçon 1',
      icon: 'i-heroicons-document-text'
    }
  ]
}, {
  label: 'Theming',
  icon: 'i-heroicons-eye-dropper',
  lessons: [
    {
      id: 3,
      label: 'Leçon 1',
      icon: 'i-heroicons-document-text'
    }
  ]
}, {
  label: 'Layouts',
  icon: 'i-heroicons-rectangle-group',
  lessons: [
    {
      id: 4,
      label: 'Leçon 1',
      icon: 'i-heroicons-document-text'
    }
  ]
}, {
  label: 'Components',
  icon: 'i-heroicons-square-3-stack-3d',
  lessons: [
    {
      id: 5,
      label: 'Leçon 1',
      icon: 'i-heroicons-document-text'
    },
    {
      id: 6,
      label: 'Leçon 2',
      icon: 'i-heroicons-document-text'
    }
  ]
}, {
  label: 'Utilities',
  icon: 'i-heroicons-wrench-screwdriver',
  lessons: [
    {
      id: 7,
      label: 'Leçon 1',
      icon: 'i-heroicons-document-text'
    }
  ]
}]
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar>
        <template #left>
          <ToggleDrawer />

          <UBreadcrumb divider="/" :links="[ { label: 'Formations', to: localePath({ name: 'formations' }) }, { label: 'Titre de la formation' } ]" />
        </template>
      </UDashboardNavbar>

      <UDashboardPanelContent class="text-sm" :ui="{ wrapper: 'p-0 flex-row overflow-y-hidden' }">
        <div class="w-9/12 p-4 overflow-y-auto">
          <NuxtPage />
        </div>

        <div class="w-3/12 border-l border-gray-200 dark:border-gray-800 flex flex-col">
          <UFormGroup label="Progression" class="p-4">
            <div class="flex items-end gap-2 justify-between">
              <div class="flex items-center gap-1">
                <LazyUIcon name="i-heroicons-bars-3-bottom-right" class="w-3.5 h-3.5 text-gray-400" />
                <p class="text-gray-400 text-xs">3/28</p>
              </div>
              <UProgress :value="10" class="max-w-36" :max="100" size="sm" color="green" indicator />
            </div>
          </UFormGroup>

          <UDivider />

          <UButton :to="localePath({ name: 'formations-id', params: { id: '4' } })" label="Introduction" size="sm" class="opacity-75 flex items-center justify-between gap-2 font-semibold hover:opacity-100 p-4 w-full text-left" :padded="false" trailing-icon="i-heroicons-arrow-right-20-solid" variant="ghost" color="white" />

          <UAccordion :items :ui="{ wrapper: 'flex flex-col w-full', item: { base: 'flex flex-col gap-1.5', padding: 'px-3' } }">
            <template #default="{ item, index, open }">
              <UButton color="gray" variant="ghost" class="border-t border-gray-200 dark:border-gray-700" :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">
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
              <UButton v-for="lesson in item.lessons" :key="lesson.id" :to="localePath({ name: 'formations-id-id', params: { id: lesson.id } })" leading-icon="i-heroicons-document-text" size="xs" color="gray" variant="soft" :label="lesson.label"/>
            </template>
          </UAccordion>

          <UDivider />

          <div class="p-4 mt-auto">
            <UButton :to="localePath({ name: 'formations-new' })" color="orange" variant="soft" size="sm" class="w-full" leading-icon="i-heroicons-pencil" label="Modifier la formation" />
          </div>
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>