<script setup lang="ts">
const localePath = useLocalePath()

const links = [[{
  label: 'Tout',
  icon: 'i-heroicons-folder-open',
  to: localePath({ name: 'library' }),
  exact: true
}, {
  label: 'Leçons',
  icon: 'i-heroicons-document-text',
  exactQuery: true,
  exactHash: true,
  exact: true,
  to: localePath({ name: 'library-lessons' })
}, {
  label: 'Chapitres',
  icon: 'i-lucide-notebook-text',
  exactQuery: true,
  exactHash: true,
  exact: true,
  to: localePath({ name: 'library-chapters' })
}, {
  label: 'Thèmes',
  icon: 'i-heroicons-book-open',
  exactQuery: true,
  exactHash: true,
  exact: true,
  to: localePath({ name: 'library-themes' })
}]]
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar>
        <template #title>
          <ToggleDrawer />
          <h1 class="flex items-center gap-1.5 font-semibold text-gray-900 dark:text-white min-w-0">
            Bibliothèque
          </h1>
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar class="py-0 px-1.5 overflow-x-auto">
        <UHorizontalNavigation :links="links" />
      </UDashboardToolbar>

      <NuxtPage />
    </UDashboardPanel>
  </UDashboardPage>
</template>
