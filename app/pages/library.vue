<script setup lang="ts">
definePageMeta({
  title: 'Bibliothèque'
})

const localePath = useLocalePath()
const route = useRoute()
const { breadcrumbs } = useDashboard()

const links = ref([{
  label: 'Tout',
  icon: 'i-heroicons-folder-open',
  to: localePath({ name: 'library' }),
  exact: true
}, {
  label: 'Leçons',
  icon: 'i-heroicons-document-text',
  to: localePath({ name: 'library-lessons' })
}, {
  label: 'Chapitres',
  icon: 'i-lucide-notebook-text',
  to: localePath({ name: 'library-chapters' }),
  active: computed(() => route.path.startsWith(localePath({ name: 'library-chapters' })))
}, {
  label: 'Thèmes',
  icon: 'i-heroicons-book-open',
  to: localePath({ name: 'library-themes' }),
  active: computed(() => route.path.startsWith(localePath({ name: 'library-themes' })))
}, {
  label: 'Formations',
  icon: 'i-heroicons-rectangle-stack',
  to: localePath({ name: 'library-formations' }),
  active: computed(() => route.path.startsWith(localePath({ name: 'library-formations' })))
}])
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar>
        <template #title>
          <ToggleDrawer />

          <UBreadcrumb divider="/" :links="breadcrumbs" />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar class="py-0 px-1.5 overflow-x-auto">
        <UHorizontalNavigation :links="links" />
      </UDashboardToolbar>

      <NuxtPage />
    </UDashboardPanel>
  </UDashboardPage>
</template>