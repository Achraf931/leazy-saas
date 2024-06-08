<script setup lang="ts">
const route = useRoute()
const { isNotificationsSlideoverOpen, isHelpSlideoverOpen, isDrawerSlideoverMode, isDrawerSlideoverOpen } = useDashboard()
const { toggleDashboardSearch } = useUIState()
const isNewUserModalOpen = ref(false)
const isNewFeedbackModalOpen = ref(false)
const localePath = useLocalePath()
const { t } = useI18n()

const links = computed(() => [{
  id: 'home',
  label: t('drawer.home'),
  icon: 'i-heroicons-home',
  to: '/',
  tooltip: {
    text: 'Home',
    shortcuts: ['G', 'H']
  }
}, {
  id: 'inbox',
  label: t('drawer.inbox'),
  icon: 'i-heroicons-inbox',
  to: localePath({ name: 'inbox' }),
  badge: '4',
  tooltip: {
    text: 'Inbox',
    shortcuts: ['G', 'I']
  }
}, {
  id: 'classes',
  label: 'Mes classes',
  icon: 'i-heroicons-academic-cap',
  exactQuery: true,
  exactHash: true,
  exact: true,
  to: localePath({ name: 'classes-id', params: { id: 1 } })
}, {
id: 'agenda',
  label: 'Agenda',
  icon: 'i-heroicons-calendar-days',
  to: localePath({ name: 'agenda' })
}, {
    id: 'kanban',
    label: 'Mes tâches',
    icon: 'i-heroicons-rectangle-stack',
    to: localePath({ name: 'kanban' })
  }, {
  id: 'library',
  label: t('drawer.library.label'),
  icon: 'i-heroicons-folder-open',
  to: localePath({ name: 'library' }),
  collapsible: false,
  children: [
    {
      label: t('drawer.library.lessons'),
      badge: {
        label: '+',
        variant: 'ghost',
        padded: false
      },
      exactQuery: true,
      exactHash: true,
      exact: true,
      to: localePath({ name: 'library-lessons' })
    },
    {
      label: t('drawer.library.chapters'),
      badge: {
        label: '+',
        variant: 'ghost',
        padded: false
      },
      exactQuery: true,
      exactHash: true,
      exact: true,
      to: localePath({ name: 'library-chapters' })
    },
    {
      label: t('drawer.library.themes'),
      badge: {
        label: '+',
        variant: 'ghost',
        padded: false
      },
      exactQuery: true,
      exactHash: true,
      exact: true,
      to: localePath({ name: 'library-themes' })
    }]
}])

const subLinks = computed(() => [{
  id: 'blog',
  label: t('drawer.community'),
  icon: 'i-heroicons-newspaper',
  to: '/landing',
  target: '_blank',
  tooltip: {
    text: 'Blog',
    shortcuts: ['G', 'B']
  }
}, {
  id: 'feedbacks',
  label: t('drawer.feedbacks'),
  icon: 'i-heroicons-exclamation-triangle',
  click: () => {
    isNewFeedbackModalOpen.value = true
  }
}])

const footerLinks = [
  {
    label: t('commons.help'),
    icon: 'i-heroicons-question-mark-circle',
    click: () => isHelpSlideoverOpen.value = true
  }
]

const groups = [
  {
    key: 'links',
    label: 'Go to',
    commands: links.value.map(link => ({ ...link, shortcuts: link.tooltip?.shortcuts }))
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
          window.open(`https://github.com/nuxt-ui-pro/dashboard/blob/main/pages${ route.path === '/' ? '/index' : route.path }.vue`, '_blank')
        }
      }
    ]
  }
]
</script>

<template>
  <UDashboardLayout>
    <USlideover v-if="isDrawerSlideoverMode" v-model="isDrawerSlideoverOpen" :overlay="false" side="left" :ui="{ wrapper: 'top-[--header-height] h-[calc(100vh-var(--header-height))]', width: 'max-w-max' }">
      <template #default>
        <UDashboardPanel id="slideorder-drawer" :width="250" class="flex-1" collapsible>
          <UDashboardNavbar :ui="{ left: 'flex-1' }">
            <template #left>
              <UserDropdown/>
            </template>
          </UDashboardNavbar>

          <UDashboardSidebar>
            <template #header>
              <div class="flex items-center gap-2 w-full">
                <UButton :label="$t('commons.search')" class="flex-1" icon="i-heroicons-magnifying-glass" color="gray" @click="toggleDashboardSearch"/>
                <UTooltip text="Notifications" :shortcuts="['N']">
                  <UButton color="white" variant="soft" square @click="isNotificationsSlideoverOpen = true">
                    <UChip color="red" inset>
                      <UIcon name="i-heroicons-bell" class="w-5 h-5" />
                    </UChip>
                  </UButton>
                </UTooltip>
              </div>
            </template>

            <UDashboardSidebarLinks :links="links"/>

            <UDivider/>

            <UDashboardSidebarLinks :links="subLinks">
              <template #badge="{ link }">
                <UIcon v-if="link.target === '_blank'" name="i-lucide-arrow-up-right" dynamic class="w-4 h-4 ml-auto"/>
              </template>
            </UDashboardSidebarLinks>

            <div class="flex-1"/>

            <UDivider class="sticky bottom-0"/>

            <template #footer>
              <UDashboardSidebarLinks :links="footerLinks"/>
            </template>
          </UDashboardSidebar>
        </UDashboardPanel>
      </template>
    </USlideover>
    <UDashboardPanel v-else id="default-drawer" :width="250" :resizable="{ min: 200, max: 300 }" collapsible>
      <template #handle="{ onDrag }">
        <UDashboardPanelHandle :ui="{ container: 'group-hover:bg-primary-500 dark:group-hover:bg-primary-400' }" @mousedown="onDrag" />
      </template>

      <UDashboardNavbar :ui="{ left: 'flex-1' }">
        <template #left>
          <UserDropdown/>
        </template>
      </UDashboardNavbar>

      <UDashboardSidebar>
        <template #header>
          <div class="flex items-center gap-2 w-full">
            <UButton :label="$t('commons.search')" class="flex-1" icon="i-heroicons-magnifying-glass" color="gray" @click="toggleDashboardSearch"/>
            <UTooltip text="Notifications" :shortcuts="['N']">
              <UButton color="white" variant="soft" square @click="isNotificationsSlideoverOpen = true">
                <UChip color="red" inset>
                  <UIcon name="i-heroicons-bell" class="w-5 h-5" />
                </UChip>
              </UButton>
            </UTooltip>
          </div>
        </template>

        <UDashboardSidebarLinks :links="links"/>

        <UDivider/>

        <UDashboardSidebarLinks :links="subLinks">
          <template #badge="{ link }">
            <UIcon v-if="link.target === '_blank'" name="i-heroicons-arrow-up-right" class="w-4 h-4 ml-auto"/>
          </template>
        </UDashboardSidebarLinks>

        <div class="flex-1"/>

        <UDivider class="sticky bottom-0"/>

        <template #footer>
          <UDashboardSidebarLinks :links="footerLinks"/>
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot/>

    <UDashboardModal v-model="isNewUserModalOpen" title="New user" description="Add a new user to your database"
                     :ui="{ width: 'sm:max-w-md' }">
      <!-- ~/components/users/UsersForm.vue -->
      <UsersForm @close="isNewUserModalOpen = false"/>
    </UDashboardModal>

    <UDashboardModal v-model="isNewFeedbackModalOpen" title="Nouveau feedback"
                     description="Signalez-nous un problème rencontré" :ui="{ width: 'sm:max-w-md' }">
      <!-- ~/components/feedbacks/FeedbacksForm.vue -->
      <FeedbacksForm @close="isNewFeedbackModalOpen = false"/>
    </UDashboardModal>

    <HelpSlideover/>

    <NotificationsSlideover/>

    <ClientOnly>
      <LazyUDashboardSearch :groups="groups"/>
    </ClientOnly>
  </UDashboardLayout>
</template>
