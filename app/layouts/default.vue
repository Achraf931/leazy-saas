<script lang="ts" setup>
import { CreateFeedbackModal, CreateSuggestionModal } from '#components'

const modal = useModal()
const user = useSanctumUser()
const route = useRoute()
const {
  isNotificationsSlideoverOpen,
  isHelpSlideoverOpen,
  isDrawerSlideoverMode,
  isDrawerSlideoverOpen
} = useDashboard()
const { toggleDashboardSearch } = useUIState()
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
}/*, {
  id: 'inbox',
  label: t('drawer.inbox'),
  icon: 'i-heroicons-inbox',
  to: localePath({ name: 'inbox' }),
  badge: '4',
  tooltip: {
    text: 'Messages',
    shortcuts: ['G', 'I']
  }
}*/, {
  id: 'classes',
  label: 'Mes classes',
  icon: 'i-heroicons-academic-cap',
  defaultOpen: false,
  // to: localePath({ name: 'classes-id', params: { id: 1 } })
  children: user.value?.classes?.map(classe => ({
    label: classe.name,
    to: localePath({ name: 'classes-id', params: { id: classe.id } })
  })) || []
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

const subLinks = ref([{
  id: 'library',
  label: t('drawer.library.label'),
  icon: 'i-heroicons-folder-open',
  to: localePath({ name: 'library' }),
  collapsible: false,
  exact: true,
  children: [
    {
      label: t('drawer.library.lessons'),
      exact: true,
      to: localePath({ name: 'library-lessons' })
    },
    {
      label: t('drawer.library.chapters'),
      to: localePath({ name: 'library-chapters' }),
      active: computed(() => route.path.startsWith(localePath({ name: 'library-chapters' })))
    },
    {
      label: t('drawer.library.themes'),
      to: localePath({ name: 'library-themes' }),
      active: computed(() => route.path.startsWith(localePath({ name: 'library-themes' })))
    },
    {
      label: 'Formations',
      to: localePath({ name: 'library-formations' }),
      active: computed(() => route.path.startsWith(localePath({ name: 'library-formations' })))
    }]
}])

const otherLinks = computed(() => [{
  id: 'templates',
  label: 'Modèles',
  icon: 'i-heroicons-document-text',
  to: localePath({ name: 'templates' })
}, {
  id: 'blog',
  label: t('drawer.community'),
  icon: 'i-heroicons-arrow-top-right-on-square',
  to: 'https://leazy-blog.vercel.app',
  target: '_blank',
  tooltip: {
    text: 'Blog',
    shortcuts: ['G', 'B']
  }
}])

const reportLinks = [
  {
    id: 'feedbacks',
    label: t('drawer.feedbacks'),
    icon: 'i-heroicons-exclamation-triangle',
    click: () => handleFeedbackModal()
  }
]

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
    label: 'Aller à',
    commands: [...links.value.map(link => ({ ...link, shortcuts: link.tooltip?.shortcuts })), ...subLinks.value]
  },
  {
    key: 'help',
    label: 'Aide',
    commands: [...otherLinks.value, ...reportLinks, ...footerLinks]
  }
]

const handleFeedbackModal = () => {
  modal.open(CreateFeedbackModal, {
    onClose: () => modal.close()
  })
}

const handleSuggestionModal = () => {
  modal.open(CreateSuggestionModal, {
    onClose: () => modal.close()
  })
}
</script>

<template>
  <UDashboardLayout>
    <USlideover
      v-if="isDrawerSlideoverMode" v-model="isDrawerSlideoverOpen" :overlay="false" :ui="{ wrapper: 'top-[--header-height] h-[calc(100vh-var(--header-height))]', width: 'max-w-max' }"
      side="left"
    >
      <template #default>
        <UDashboardPanel id="slideorder-drawer" :width="250" class="flex-1" collapsible>
          <UDashboardNavbar :ui="{ left: 'flex-1' }">
            <template #left>
              <UserDropdown />
            </template>
          </UDashboardNavbar>
          
          <UDashboardSidebar>
            <template #header>
              <div class="flex items-center gap-2 w-full">
                <UButton
                  :label="$t('commons.search')" class="flex-1" color="gray" icon="i-heroicons-magnifying-glass"
                  @click="toggleDashboardSearch"
                />
                <UTooltip :shortcuts="['N']" text="Notifications">
                  <UButton color="white" square variant="soft" @click="isNotificationsSlideoverOpen = true">
                    <UChip color="red" inset>
                      <UIcon class="w-5 h-5" name="i-heroicons-bell" />
                    </UChip>
                  </UButton>
                </UTooltip>
              </div>
            </template>
            
            <UDashboardSidebarLinks :links="links" />
            
            <UDivider />
            
            <UDashboardSidebarLinks :links="subLinks" />
            
            <UDivider />
            
            <UDashboardSidebarLinks :links="otherLinks" />
            
            <div class="flex-1 flex items-end">
              <div
                class="suggestion-block cursor-pointer text-white w-full p-3 bg-primary-500 hover:bg-primary-600 rounded-lg"
                @click="handleSuggestionModal"
              >
                <div class="flex items-center gap-2">
                  <UIcon class="w-5 h-5" name="i-heroicons-light-bulb" />
                  <h3 class="font-bold">Une idée ?</h3>
                </div>
                <p class="mt-2 text-left text-sm font-medium">Suggérer nous des fonctionnalités que vous aimeriez voir
                  sur
                  Leazy !</p>
              </div>
            </div>
            
            <UDivider class="sticky bottom-0" />
            
            <template #footer>
              <UDashboardSidebarLinks :links="footerLinks" />
            </template>
          </UDashboardSidebar>
        </UDashboardPanel>
      </template>
    </USlideover>
    <UDashboardPanel v-else id="default-drawer" :resizable="{ min: 200, max: 300 }" :width="250" collapsible>
      <template #handle="{ onDrag }">
        <UDashboardPanelHandle
          :ui="{ container: 'group-hover:bg-primary-500 dark:group-hover:bg-primary-400' }"
          @mousedown="onDrag"
        />
      </template>
      
      <UDashboardNavbar :ui="{ left: 'flex-1' }">
        <template #left>
          <UserDropdown />
        </template>
      </UDashboardNavbar>
      
      <UDashboardSidebar>
        <template #header>
          <div class="flex items-center gap-2 w-full">
            <UButton
              :label="$t('commons.search')" class="flex-1" color="gray" icon="i-heroicons-magnifying-glass"
              @click="toggleDashboardSearch"
            />
            <UTooltip :shortcuts="['N']" text="Notifications">
              <UButton color="white" square variant="soft" @click="isNotificationsSlideoverOpen = true">
                <UChip color="red" inset>
                  <UIcon class="w-5 h-5" name="i-heroicons-bell" />
                </UChip>
              </UButton>
            </UTooltip>
          </div>
        </template>
        
        <UDashboardSidebarLinks :links="links" />
        
        <UDivider />
        
        <UDashboardSidebarLinks :links="subLinks" />
        
        <UDivider />
        
        <UDashboardSidebarLinks :links="otherLinks" />
        
        <UDivider />
        
        <UDashboardSidebarLinks :links="reportLinks" />
        
        <div class="flex-1 flex items-end">
          <div
            class="suggestion-block cursor-pointer text-white w-full p-3 bg-primary-500 hover:bg-primary-600 rounded-lg"
            @click="handleSuggestionModal"
          >
            <div class="flex items-center gap-2">
              <UIcon class="w-5 h-5" name="i-heroicons-light-bulb" />
              <h3 class="font-bold">Une idée ?</h3>
            </div>
            <p class="mt-2 text-left text-sm font-medium">Suggérer nous des fonctionnalités que vous aimeriez voir sur
              Leazy !</p>
          </div>
        </div>
        
        <UDivider class="sticky bottom-0" />
        
        <template #footer>
          <UDashboardSidebarLinks :links="footerLinks" />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>
    
    <slot />
    
    <HelpSlideover />
    
    <NotificationSlideover />
    
    <LazyUDashboardSearch :groups="groups" />
  </UDashboardLayout>
</template>

<style lang="scss" scoped>
.suggestion-block {
  background: linear-gradient(-45deg, #f97316, #ec4899, #6366f1, #10b981);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
