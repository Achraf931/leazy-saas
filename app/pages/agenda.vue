<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const q = ref('')
const tabItems = [/*{
  icon: 'i-heroicons-calendar-days',
  file: 'Calendar'
},*/ {
  icon: 'i-heroicons-queue-list',
  file: 'Timeline'
}]

const selectedTab = computed({
  get () {
    const index = tabItems.findIndex((item) => item.file === route.query.tab)
    if (index === -1) {
      return 0
    }

    return index
  },
  set (value) {
    router.replace({ query: { tab: tabItems[value].file } })
  }
})

const componentMap = {
  // Calendar: resolveComponent('Calendar'),
  Timeline: resolveComponent('Timeline')
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar>
        <template #title>
          <ToggleDrawer title="Agenda" />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <UInput
            v-model="q"
            icon="i-heroicons-magnifying-glass-20-solid"
            color="white"
            :trailing="false"
            placeholder="Rechercher"
          />
        </template>
        <template #right>
          <UTabs v-model="selectedTab" :items="tabItems" :ui="{ list: { height: 'h-9', base: 'border border-gray-200 dark:border-gray-700', tab: { height: 'h-6', size: 'text-[13px]', icon: 'm-0' } } }" />
        </template>
      </UDashboardToolbar>

      <UDashboardPanelContent>
        <div class="flex-1 flex flex-col gap-5 overflow-hidden" :class="{ 'overflow-y-auto snap-y snap-mandatory': modelValue === 1 }">
          <Suspense>
            <component :is="componentMap[tabItems[selectedTab].file]" />
            <template #fallback>
              <p class="text-center text-gray-400 dark:text-white text-sm mt-4">Chargement...</p>
            </template>
          </Suspense>
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style>
:root {
  --fc-small-font-size: 14px;
  --fc-page-bg-color: #fff;
  --fc-neutral-bg-color: rgba(208, 208, 208, 0.3);
  --fc-neutral-text-color: #808080;
  --fc-border-color: #ddd;

  --fc-button-text-color: black;
  --fc-button-bg-color: white;
  --fc-button-border-color: #D1D5D8;
  --fc-button-hover-bg-color: #F4F4F5;
  --fc-button-hover-border-color: #D1D5D8;
  --fc-button-active-bg-color: #818CF8;
  --fc-button-active-border-color: #6366F1;

  --fc-event-bg-color: #818CF8;
  --fc-event-border-color: #818CF8;
  --fc-event-text-color: #fff;
  --fc-event-selected-overlay-color: rgba(0, 0, 0, 0.25);

  --fc-more-link-bg-color: #d0d0d0;
  --fc-more-link-text-color: inherit;

  --fc-event-resizer-thickness: 8px;
  --fc-event-resizer-dot-total-width: 8px;
  --fc-event-resizer-dot-border-width: 1px;

  --fc-non-business-color: rgba(215, 215, 215, 0.3);
  --fc-bg-event-color: rgb(143, 223, 130);
  --fc-bg-event-opacity: 0.3;
  --fc-highlight-color: rgba(188, 232, 241, 0.3);
  --fc-today-bg-color: rgba(255, 220, 40, 0.15);
  --fc-now-indicator-color: red;

  --fc-daygrid-event-dot-width: 8px;

  --fc-list-event-dot-width: 10px;
  --fc-list-event-hover-bg-color: #f5f5f5;
}

.fc-event-main {
  display: flex;
}

.fc-toolbar-chunk {
  display: flex!important;
}

.fc .fc-toolbar.fc-header-toolbar {
  margin-bottom: 1rem;
}

.fc .fc-button-group > .fc-button, .fc .fc-button {
  box-shadow: none!important;
  font-size: 14px!important;
  padding: .200rem .500rem;
}

.fc .fc-button:disabled {
  cursor: not-allowed;
}

.fc .fc-button-primary:not(:disabled).fc-button-active, .fc .fc-button-primary:not(:disabled):active {
  color: white;
}

.fc .fc-button .fc-icon {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fc .fc-timegrid-slot-label-cushion {
  font-size: 12px;
}

.fc .fc-scrollgrid {
  overflow: hidden;
  border-radius: 8px;
}

.fc .fc-toolbar-title {
  font-size: 1.5rem;
  font-weight: 600;
}

.fc .fc-col-header-cell-cushion {
  font-size: 14px;
}
</style>
