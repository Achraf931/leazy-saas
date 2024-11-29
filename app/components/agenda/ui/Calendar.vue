<script setup>
// import VueCal from 'vue-cal'
import { format } from 'date-fns'
import tippy from 'tippy.js'

const vueCal = ref(null)
const activeView = ref('week')
const selectedDate = ref(null)
const selected = ref({
  first: true,
  last: true
})

const events = reactive([
  {
    start: '2024-06-12 14:00',
    end: '2024-06-12 15:00',
    title: 'SPG - L\'imprimerie moderne',
    content: 'Cours sur l\'imprimerie moderne',
    class: 'leisure first',
    deletable: true,
    resizable: true,
    draggable: true,
    repeat: {
      every: 'week'
    }
  },
  {
    start: '2024-06-12 12:00',
    end: '2024-06-12 13:00',
    title: 'Pause',
    content: 'Discuss the new project',
    class: 'break',
    deletable: true,
    resizable: true,
    draggable: true,
    background: true,
    repeat: {
      every: 'week', // You can repeat on multiple days of the week.
      until: '2025-11-30' // Don't need a time here as it will take the same as original event date.
    }
  },
  {
    start: '2024-06-12 10:00',
    end: '2024-06-12 11:00',
    title: 'TPG - Histoire - Géo',
    content: 'Cours sur la seconde guerre mondiale',
    class: 'sport last',
    deletable: true,
    resizable: true,
    draggable: true
  }
])

const onEventClick = (event, e) => {
  tippy(e.target, {
    content: 'Hello!',
    animation: 'scale',
    duration: 200,
    interactive: true,
    trigger: 'manual',
    placement: 'left',
    theme: 'slash-command',
    maxWidth: '16rem',
    offset: [16, 8],
    popperOptions: {
      strategy: 'fixed',
      modifiers: [
        {
          name: 'flip',
          enabled: false
        }
      ]
    }
  })
}

const onEventCreate = (event, e) => {
  console.log(event)
}

const filteredEvents = computed(() => {
  return events.filter(event => {
    return selected.value.first && event.class.includes('first') || selected.value.last && event.class.includes('last')
  })
})

const newEvent = () => {
  const now = new Date()
  const start = format(now.setHours(8), 'yyyy-MM-dd HH:mm')
  vueCal.value.createEvent(start, 120, {
    title: 'Nouvel événement',
    content: 'Description de l\'événement',
    class: 'sport last',
    deletable: true,
    resizable: true,
    draggable: true
  })
}
</script>

<template>
<!--  <div class="flex items-start justify-start gap-4 relative flex-1 overflow-hidden">
    <div class="flex flex-col gap-3 sticky top-0 left-0 max-w-[210px]">
      <UButton block label="Ajouter un événement" @click="newEvent" />
      
      <VueCal
        :disable-views="['day', 'week', 'year', 'years']"
        :events="filteredEvents"
        :time="false"
        :time-from="8 * 60"
        active-view="month"
        class="*:leading-7 *:cursor-pointer sticky top-0 left-0"
        hide-view-selector
        locale="fr"
        xsmall
        @cell-focus="selectedDate = $event"
      >
      </VueCal>
      
      <div class="flex flex-col justify-start gap-2">
        <p class="block font-medium text-gray-700 dark:text-gray-200">Mes classes</p>
        <UCheckbox
          v-model="selected.last" :ui="{ wrapper: 'items-center overflow-hidden', container: 'h-auto', base: 'w-3 h-3', label: 'text-xs text-ellipsis truncate', inner: 'ms-1.5 truncate', border: 'border-primary' }" color="primary"
          label="Terminal Production Graphique"
        />
        <UCheckbox
          v-model="selected.first" :ui="{ wrapper: 'items-center overflow-hidden', container: 'h-auto', base: 'w-3 h-3', label: 'text-xs text-ellipsis truncate', inner: 'ms-1.5 truncate', border: 'border-orange-400' }" color="orange"
          label="Seconde Production Graphique"
        />
      </div>
    </div>
    
    <VueCal
      ref="vueCal"
      :active-view="activeView"
      :cell-click-hold="false"
      :drag-to-create-threshold="15"
      :events="filteredEvents"
      :on-event-click="onEventClick"
      :selected-date="selectedDate"
      :snap-to-time="15"
      :sticky-split-labels="true"
      :time-from="8 * 60"
      :time-step="30"
      :time-to="19 * 60"
      editable-events
      events-count-on-year-view
      events-on-month-view="short"
      hide-view-selector
      hide-weekends
      locale="fr"
      resize-x
      show-all-day-events="short"
      small
      today-button
    >
      <template #arrow-prev>
        <UButton class="mr-2" color="white" icon="i-heroicons-chevron-left-20-solid" size="2xs" square />
      </template>
      <template #arrow-next>
        <UButton color="white" icon="i-heroicons-chevron-right-20-solid" size="2xs" square />
      </template>
      <template #title="{ title, view }">
        <div class="flex items-center gap-2">
          <h2 class="text-lg font-semibold">{{ title }}</h2>
        </div>
      </template>
      
      <template #event="{ event, view }">
        <UPopover :popper="{ placement: 'left-start' }" class="z-10">
          <div class="px-2 py-1 text-left">
            <p class="text-sm font-semibold">{{ event.title }}</p>
            <time class="text-xs">{{ event.start.formatTime('HH:mm') }} - {{ event.end.formatTime('HH:mm') }}</time>
          </div>
          
          <template #panel="{ close }">
            <div class="text-left text-sm p-3 flex flex-col gap-2 bg-white text-gray-600 z-10">
              <div class="flex items-center justify-end gap-2">
                <UButton color="gray" icon="i-heroicons-pencil" size="2xs" variant="ghost" />
                <UButton color="gray" icon="i-heroicons-trash" size="2xs" variant="ghost" />
                <UButton
                  class="ml-2" color="gray" icon="i-heroicons-x-mark" size="2xs" variant="ghost" @click="close"
                />
              </div>
              
              <div>
                <p class="text-sm font-semibold">{{ event.title }}</p>
                <time class="text-xs">{{ event.start.formatTime('HH:mm') }} - {{ event.end.formatTime('HH:mm') }}</time>
                <p class="text-sm mt-2">{{ event.content }}</p>
              </div>
              
              <NuxtLinkLocale
                :to="{ name: 'agenda_id', params: { id: 1 } }"
                class="flex items-center justify-start gap-3 w-full px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 border border-border border-gray-200 dark:border-gray-700 cursor-pointer rounded-lg transition-all"
              >
                <UIcon class="w-4 h-4" name="i-lucide-file-spreadsheet" />
                <span class="text-sm">La seconde guerre mondiale</span>
                <UIcon class="text-red-500 ml-auto" name="i-heroicons-trash" />
              </NuxtLinkLocale>
              
              &lt;!&ndash;                <UButton class="ml-auto" icon="i-heroicons-x-mark" size="2xs" color="gray" variant="ghost" @click="close" />
                              <UFormGroup label="Titre">
                                <UInput v-model="event.title" />
                              </UFormGroup>

                              <UFormGroup label="Date">
                                <UInput :model-value="event.start.format()" type="date" />
                              </UFormGroup>

                              <div class="flex items-center gap-2">
                                <UFormGroup label="Début">
                                  <UInput :value="event.start.formatTime()" type="time" />
                                </UFormGroup>

                                <UFormGroup label="Fin">
                                  <UInput :value="event.end.formatTime()" type="time" />
                                </UFormGroup>
                              </div>

                              <UFormGroup label="Description">
                                <UTextarea v-model="event.content" />
                              </UFormGroup>&ndash;&gt;
              
              &lt;!&ndash;              <div class="flex items-start justify-end">
                              <UButton icon="i-heroicons-pencil" size="2xs" color="gray" variant="ghost" />
                              <UButton icon="i-heroicons-trash" size="2xs" color="gray" variant="ghost" />
                              <UButton class="ml-2" icon="i-heroicons-x-mark" size="2xs" color="gray" variant="ghost" @click="close" />
                            </div>
                            <h3 class="font-semibold">{{ event.title }}</h3>
                            <time class="text-xs">{{ event.start.formatTime('dddd HH:mm') }} - {{ event.end.formatTime('HH:mm') }}</time>
                            <p class="mt-2">{{ event.content }}</p>

                            <div class="flex items-center gap-1 mt-3">
                              <div class="lesson bg-primary text-white rounded-md px-2 py-1 text-xs w-16 h-20">
                                <p class="text-xs">Cours</p>
                                <p class="text-xs">1</p>
                              </div>
                            </div>&ndash;&gt;
            </div>
          </template>
        </UPopover>
      </template>
      
      <template #today-button>
        <UTooltip :popper="{ placement: 'top' }" text="Aujourd'hui">
          <UButton color="white" label="Aujourd'hui" size="2xs" />
        </UTooltip>
        
        <UPopover :popper="{ placement: 'bottom' }" :ui="{ base: 'p-1 flex flex-col gap-1' }">
          <UButton
            :label="activeView === 'day' ? 'Jour' : activeView === 'week' ? 'Semaine' : activeView === 'month' ? 'Mois' : activeView === 'year' ? 'Année' : 'Années'"
            class="mx-2" color="white" size="2xs" trailing-icon="i-heroicons-chevron-down-20-solid"
          />
          
          <template #panel="{ close }">
            <template
              v-for="view in [{ name: 'day', label: 'Jour' }, { name: 'week', label: 'Semaine' }, { name: 'month', label: 'Mois' }, { name: 'year', label: 'Année' }, { name: 'years', label: 'Années' }]"
            >
              <UButton
                :color="activeView === view.name ? 'primary' : 'gray'" :label="view.label" :variant="activeView === view.name ? 'soft' : 'ghost'"
                size="xs"
                @click="() => { activeView = view.name; close() }"
              />
            </template>
          </template>
        </UPopover>
      </template>
    </VueCal>
  </div>-->
</template>

<style>
/*@import 'vuecal.css';*/

.vuecal {
  @apply rounded-md;
}

.vuecal__title-bar {
  @apply bg-transparent border-b border-gray-200 dark:border-gray-800;
}

.vuecal__event {
  @apply bg-[#D6D5FF];
}

.vuecal__title {
  @apply justify-start;
}

.vuecal__event.break {
  background: repeating-linear-gradient(45deg, transparent, transparent 10px, #f2f2f2 10px, #f2f2f2 20px); /* IE 10+ */
  color: #999;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.vuecal__event.break .vuecal__event-time {
  display: none;
  align-items: center;
}

.vuecal__event.leisure {
  background: rgb(253 186 116);
}

.vuecal__cell-events-count {
  width: 18px;
  height: 2px;
  margin-top: 5px;
  background-color: #6366F1;
  color: transparent;
}
</style>
