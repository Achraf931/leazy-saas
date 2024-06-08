<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import frLocale from '@fullcalendar/core/locales/fr'

const props = defineProps({
  modelValue: {
    type: Number,
    default: null
  }
})

const currentEvents = ref([])

const dates = [
  {
    id: 1,
    date: '31 Juin 2024',
    events: [
      {
        time: '14:00',
        title: 'Cours de géographie'
      },
      {
        time: '15:00',
        title: 'Cours de mathématiques'
      },
      {
        time: '16:00',
        title: 'Cours de français'
      }
    ]
  },
  {
    id: 2,
    date: '1 Juillet 2024',
    events: [
      {
        time: '10:00',
        title: 'Cours de géographie'
      },
      {
        time: '11:00',
        title: 'Cours de mathématiques'
      },
      {
        time: '12:00',
        title: 'Cours de français'
      },
      {
        time: '13:00',
        title: 'Cours de géographie'
      },
      {
        time: '14:00',
        title: 'Cours de géographie'
      },
      {
        time: '15:00',
        title: 'Cours de mathématiques'
      },
      {
        time: '16:00',
        title: 'Cours de français'
      }
    ]
  },
  {
    id: 3,
    date: '2 Juillet 2024',
    events: [
      {
        time: '14:00',
        title: 'Cours de géographie'
      },
      {
        time: '15:00',
        title: 'Cours de mathématiques'
      },
      {
        time: '16:00',
        title: 'Cours de français'
      }
    ]
  },
  {
    id: 4,
    date: '3 Juillet 2024',
    events: [
      {
        time: '14:00',
        title: 'Cours de géographie'
      },
      {
        time: '15:00',
        title: 'Cours de mathématiques'
      },
      {
        time: '16:00',
        title: 'Cours de français'
      }
    ]
  },
  {
    id: 5,
    date: '4 Juillet 2024',
    events: [
      {
        time: '14:00',
        title: 'Cours de géographie'
      },
      {
        time: '14:30',
        title: 'Cours de géographie'
      },
      {
        time: '15:00',
        title: 'Cours de mathématiques'
      },
      {
        time: '16:00',
        title: 'Cours de français'
      }
    ]
  },
  {
    id: 6,
    date: '5 Juillet 2024',
    events: [
      {
        time: '14:00',
        title: 'Cours de géographie'
      },
      {
        time: '15:00',
        title: 'Cours de mathématiques'
      },
      {
        time: '16:00',
        title: 'Cours de français'
      }
    ]
  }
]

const handleWeekendsToggle = () => {
  calendarOptions.weekends = !calendarOptions.weekends
}

const handleDateSelect = (selectInfo) => {
  const title = prompt('Please enter a new title for your event')
  const calendarApi = selectInfo.view.calendar

  calendarApi.unselect() // clear date selection

  if (title) {
    calendarApi.addEvent({
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr
    })
  }
}

const handleEventClick = (clickInfo) => {
  if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    clickInfo.event.remove()
  }
}

const handleEvents = (events) => {
  currentEvents.value = events
}

const calendarOptions = reactive({
  plugins: [interactionPlugin, timeGridPlugin, dayGridPlugin],
  initialView: 'timeGridWeek',
  locale: frLocale,
  nowIndicator: true,
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  eventLimit: false,
  slotMinTime: '08:00:00',
  slotMaxTime: '20:00:00',
  allDaySlot: false,
  select: handleDateSelect,
  eventClick: handleEventClick,
  eventsSet: handleEvents,
  weekday: 'short',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay' // user can switch between the two
  },
  initialEvents: [
    {
      id: 1,
      title: 'All day event',
      start: new Date(2024, 5, 8, 12, 30).toISOString().replace(/T.*$/, '') + 'T10:30:00',
      end: new Date(2024, 5, 8, 12, 30).toISOString().replace(/T.*$/, '') + 'T12:30:00'
    },
    {
      id: 2,
      title: 'Timed event',
      start: new Date(2024, 5, 6, 14, 30).toISOString().replace(/T.*$/, '') + 'T12:00:00',
      end: new Date(2024, 5, 6, 14, 30).toISOString().replace(/T.*$/, '') + 'T14:00:00'
    }
  ]
})
</script>

<template>
  <UDashboardPanelContent class="p-0">
    <div class="flex-1 flex flex-col gap-5" :class="{ 'overflow-y-auto snap-y snap-mandatory': modelValue === 0 }">
      <template v-if="modelValue === 0">
        <div v-for="item in dates" :key="item.id" class="flex gap-5 snap-start w-full">
          <h3 class="text-sm">{{ item.date }}</h3>
          <div class="overflow-hidden rounded-md flex-1">
            <div v-for="(event, index) in item.events" :key="index" :class="{ 'bg-primary-100': date === 1 && index === 1 }" class="flex items-center justify-start gap-2 p-2 bg-gray-100 dark:bg-gray-800 hover:opacity-75">
              <div class="flex items-center gap-1">
                <div class="rounded-full w-2 h-2 bg-green-500" />
                <p class="text-sm font-semibold">
                  {{ event.time }}
                </p>
              </div>

              <p class="text-sm">
                {{ event.title }}
              </p>

              <div class="flex items-center gap-1 ml-auto">
                <UButton size="2xs" variant="soft" label="Voir" />
                <UButton size="2xs" color="gray" variant="soft" icon="i-heroicons-ellipsis-vertical" />
              </div>
            </div>
          </div>
        </div>
      </template>
      <div v-else>
        <FullCalendar :options='calendarOptions'>
          <template v-slot:eventContent='arg'>
            <b class="mr-2">{{ arg.timeText }}</b>
            <i>{{ arg.event.title }}</i>
          </template>
        </FullCalendar>
      </div>
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
