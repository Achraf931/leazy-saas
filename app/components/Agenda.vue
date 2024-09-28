<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Number,
    default: null
  }
})

const dates = [
  {
    id: 1,
    date: '31 Juin',
    events: [
      {
        time: '14:00',
        end: '15:00',
        title: 'Cours de géographie'
      },
      {
        time: '15:00',
        end: '16:00',
        title: 'Cours de mathématiques'
      },
      {
        time: '16:00',
        end: '17:00',
        title: 'Cours de français'
      }
    ]
  },
  {
    id: 2,
    date: '1 Juillet',
    events: [
      {
        time: '10:00',
        end: '11:00',
        title: 'Cours de géographie'
      },
      {
        time: '11:00',
        end: '12:00',
        title: 'Cours de mathématiques'
      },
      {
        time: '12:00',
        end: '13:00',
        title: 'Cours de français'
      },
      {
        time: '13:00',
        end: '14:00',
        title: 'Cours de géographie'
      },
      {
        time: '14:00',
        end: '15:00',
        title: 'Cours de géographie'
      },
      {
        time: '15:00',
        end: '16:00',
        title: 'Cours de mathématiques'
      },
      {
        time: '16:00',
        end: '17:00',
        title: 'Cours de français'
      }
    ]
  },
  {
    id: 3,
    date: '2 Juillet',
    events: [
      {
        time: '14:00',
        end: '15:00',
        title: 'Cours de géographie'
      },
      {
        time: '15:00',
        end: '16:00',
        title: 'Cours de mathématiques'
      },
      {
        time: '16:00',
        end: '17:00',
        title: 'Cours de français'
      }
    ]
  },
  {
    id: 4,
    date: '3 Juillet',
    events: [
      {
        time: '14:00',
        end: '15:00',
        title: 'Cours de géographie'
      },
      {
        time: '15:00',
        end: '16:00',
        title: 'Cours de mathématiques'
      },
      {
        time: '16:00',
        end: '17:00',
        title: 'Cours de français'
      }
    ]
  },
  {
    id: 5,
    date: '4 Juillet',
    events: [
      {
        time: '14:00',
        end: '15:00',
        title: 'Cours de géographie'
      },
      {
        time: '14:30',
        end: '15:30',
        title: 'Cours de géographie'
      },
      {
        time: '15:00',
        end: '16:00',
        title: 'Cours de mathématiques'
      },
      {
        time: '16:00',
        end: '17:00',
        title: 'Cours de français'
      }
    ]
  },
  {
    id: 6,
    date: '5 Juillet',
    events: [
      {
        time: '14:00',
        end: '15:00',
        title: 'Cours de géographie'
      },
      {
        time: '15:00',
        end: '16:00',
        title: 'Cours de mathématiques'
      },
      {
        time: '16:00',
        end: '17:00',
        title: 'Cours de français'
      }
    ]
  }
]
</script>

<template>
  <UDashboardPanelContent class="p-0">
    <div class="flex-1 flex flex-col gap-5 overflow-hidden" :class="{ 'overflow-y-auto snap-y snap-mandatory': modelValue === 1 }">
      <template v-if="modelValue === 1">
        <div v-for="item in dates" :key="item.id" class="flex gap-5 snap-start w-full">
          <h3 class="text-sm opacity-50" :class="{ 'text-primary font-bold !opacity-100': item.id === 1 }">{{ item.date }}</h3>
          <div class="flex-1 flex flex-col gap-2">
            <NuxtLink v-for="(event, index) in item.events" :key="index" :class="{ 'bg-primary-50 !opacity-100 hover:!opacity-75': item.id === 1 }" :to="localePath({ name: 'agenda_id', params: { id: 1 } })" class="overflow-hidden flex items-center justify-start cursor-pointer rounded-lg gap-2 bg-gray-50 dark:bg-gray-800 opacity-50 hover:opacity-75">
              <p class="h-full flex items-center justify-center px-2 bg-indigo-500 text-sm">
                {{ event.time }}
                <br />
                {{ event.end }}
              </p>

              <div class="p-2">
                <p class="text-sm font-semibold">
                  {{ event.title }}
                </p>
                <p class="text-xs opacity-75">
                  Amphi E - Terminale PG
                </p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </template>
      <Calendar v-else />
    </div>
  </UDashboardPanelContent>
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
