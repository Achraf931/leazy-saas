<script setup lang="ts">
const route = useRoute()
const appConfig = useAppConfig()
const { isHelpSlideoverOpen } = useDashboard()
const { toggleDashboardSearch } = useUIState()
const isNewUserModalOpen = ref(false)
const isNewFeedbackModalOpen = ref(false)

const links = [{
  id: 'home',
  label: 'Accueil',
  icon: 'i-heroicons-home',
  to: '/',
  tooltip: {
    text: 'Home',
    shortcuts: ['G', 'H']
  }
}, {
  id: 'inbox',
  label: 'Messages',
  icon: 'i-heroicons-inbox',
  to: '/inbox',
  badge: '4',
  tooltip: {
    text: 'Inbox',
    shortcuts: ['G', 'I']
  }
}, {
  id: 'settings',
  label: 'Médias',
  to: '/settings',
  icon: 'i-heroicons-photo',
  tooltip: {
    text: 'Settings',
    shortcuts: ['G', 'S']
  }
}, {
  id: 'users',
  label: 'Bibliothèque',
  icon: 'i-heroicons-document-text',
  to: '/library',
  collapsible: false,
  children: [
    {
      label: 'Thèmes',
      to: '/library/themes'
    },
    {
      label: 'Chapitres',
      to: '/library/chapters'
    },
    {
      label: 'Leçons',
      to: '/library/lessons'
    }],
  tooltip: {
    text: 'Leçons',
    shortcuts: ['G', 'L']
  }
}, {
  id: 'feedbacks',
  label: 'Signaler un problème',
  icon: 'i-heroicons-exclamation-triangle',
  click: () => {
    isNewFeedbackModalOpen.value = true
  },
}]

const footerLinks = [
  {
    label: 'Aide & Support',
    icon: 'i-heroicons-question-mark-circle',
    click: () => isHelpSlideoverOpen.value = true
  }
]

const groups = [
  {
    key: 'links',
    label: 'Go to',
    commands: links.map(link => ({ ...link, shortcuts: link.tooltip?.shortcuts }))
  },
  {
    key: 'code',
    label: 'Code',
    commands: [
      {
        id: 'source',
        label: 'View page source',
        icon: 'i-simple-icons-github',
        click: () => {
          window.open(`https://github.com/nuxt-ui-pro/dashboard/blob/main/pages${route.path === '/' ? '/index' : route.path}.vue`, '_blank')
        }
      }
    ]
  }
]

const defaultColors = ref(['green', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet'].map(color => ({ label: color, chip: color, click: () => appConfig.ui.primary = color })))
const colors = computed(() => defaultColors.value.map(color => ({ ...color, active: appConfig.ui.primary === color.label })))
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel :width="250" :resizable="{ min: 200, max: 300 }" collapsible>
      <UDashboardNavbar class="!border-transparent" :ui="{ left: 'flex-1' }">
        <template #left>
          <UserDropdown />
        </template>
      </UDashboardNavbar>

      <UDashboardSidebar>
        <template #header>
          <div class="flex items-center gap-2">
            <UButtonGroup size="sm" orientation="horizontal" class="w-full">
              <UButton class="flex-1" label="Nouvelle leçon" icon="i-heroicons-plus" color="gray" @click="isNewUserModalOpen = true" />
              <UDropdown :items="[[{ label: 'Nouveau thème', icon: 'i-heroicons-plus', click: () => console.log('new theme') }, { label: 'Nouveau chapitre', icon: 'i-heroicons-plus', click: () => console.log('new chapter') }]]" :ui="{ width: 'w-auto', item: { disabled: 'cursor-text select-text' } }" :popper="{ strategy: 'absolute', placement: 'top-end' }">
                <UButton icon="i-heroicons-chevron-down-20-solid" color="gray" />
              </UDropdown>
            </UButtonGroup>
            <UButton trailing-icon="i-heroicons-magnifying-glass" color="gray" @click="toggleDashboardSearch" />
          </div>
        </template>

        <UDashboardSidebarLinks :links="links" />

        <UDivider />

        <UDashboardSidebarLinks :links="[{ label: 'Couleurs', draggable: true, children: colors }]" @update:links="colors => defaultColors = colors" />

        <div class="flex-1" />

        <UDivider class="sticky bottom-0" />

        <template #footer>
          <UDashboardSidebarLinks :links="footerLinks" />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />

    <UDashboardModal v-model="isNewUserModalOpen" title="New user" description="Add a new user to your database" :ui="{ width: 'sm:max-w-md' }">
      <!-- ~/components/users/UsersForm.vue -->
      <UsersForm @close="isNewUserModalOpen = false" />
    </UDashboardModal>

    <UDashboardModal v-model="isNewFeedbackModalOpen" title="Nouveau feedback" description="Signalez-nous un problème rencontré" :ui="{ width: 'sm:max-w-md' }">
      <!-- ~/components/feedbacks/FeedbacksForm.vue -->
      <FeedbacksForm @close="isNewFeedbackModalOpen = false" />
    </UDashboardModal>

    <HelpSlideover />

    <NotificationsSlideover />

    <ClientOnly>
      <LazyUDashboardSearch :groups="groups" />
    </ClientOnly>
  </UDashboardLayout>
</template>
