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
    text: 'Accueil',
    shortcuts: ['G', 'H']
  }
}, {
  id: 'inbox',
  label: t('drawer.inbox'),
  icon: 'i-heroicons-inbox',
  to: localePath({ name: 'inbox' }),
  badge: '4',
  tooltip: {
    text: 'Messages',
    shortcuts: ['G', 'I']
  }
}, {
  id: 'classes',
  label: 'Mes classes',
  icon: 'i-heroicons-academic-cap',
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
  }])

const subLinks = computed(() => [{
  id: 'library',
  label: t('drawer.library.label'),
  icon: 'i-heroicons-folder-open',
  to: localePath({ name: 'library' }),
  collapsible: false,
  exact: true,
  children: [
    {
      label: t('drawer.library.lessons'),
      // badge: '23',
      to: localePath({ name: 'library-lessons' })
    },
    {
      label: t('drawer.library.chapters'),
      // badge: '10',
      to: localePath({ name: 'library-chapters' })
    },
    {
      label: t('drawer.library.themes'),
      // badge: '3',
      to: localePath({ name: 'library-themes' })
    }]
}, {
  id: 'templates',
  label: 'Templates',
  icon: 'i-heroicons-document-text',
  to: localePath({ name: 'templates' })
}])

const otherLinks = computed(() => [{
  id: 'blog',
  label: t('drawer.community'),
  icon: 'i-heroicons-arrow-top-right-on-square',
  to: 'https://leazy-blog.vercel.app',
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

            <UDashboardSidebarLinks :links="subLinks"/>

            <UDivider/>

            <UDashboardSidebarLinks :links="otherLinks" />

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

        <UDashboardSidebarLinks :links="subLinks"/>

        <UDivider/>

        <UDashboardSidebarLinks :links="otherLinks" />

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
