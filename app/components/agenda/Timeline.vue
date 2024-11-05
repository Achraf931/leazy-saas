<script setup lang="ts">
const dates = [
  {
    id: 1,
    date: '31 Juin',
    events: [
      {
        time: '14:00',
        end: '15:00',
        title: 'Cours de géographie',
        badge: 'DST'
      },
      {
        time: '15:00',
        end: '16:00',
        title: 'Cours de mathématiques',
        badge: 'DS'
      },
      {
        time: '16:00',
        end: '17:00',
        title: 'Cours de français',
        badge: 'Contrôle'
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
        title: 'Cours de géographie',
        badge: 'Rendu de devoirs'
      },
      {
        time: '11:00',
        end: '12:00',
        title: 'Cours de mathématiques',
        badge: 'DS'
      },
      {
        time: '12:00',
        end: '13:00',
        title: 'Cours de français',
        badge: 'Contrôle'
      },
      {
        time: '13:00',
        end: '14:00',
        title: 'Cours de géographie',
        badge: 'Rendu de devoirs'
      },
      {
        time: '14:00',
        end: '15:00',
        title: 'Cours de géographie',
        badge: 'Rendu de devoirs'
      },
      {
        time: '15:00',
        end: '16:00',
        title: 'Cours de mathématiques',
        badge: 'DS'
      },
      {
        time: '16:00',
        end: '17:00',
        title: 'Cours de français',
        badge: 'Contrôle'
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
        title: 'Cours de géographie',
        badge: 'Rendu de devoirs'
      },
      {
        time: '15:00',
        end: '16:00',
        title: 'Cours de mathématiques',
        badge: 'DS'
      },
      {
        time: '16:00',
        end: '17:00',
        title: 'Cours de français',
        badge: 'Contrôle'
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
        title: 'Cours de géographie',
        badge: 'Rendu de devoirs'
      },
      {
        time: '15:00',
        end: '16:00',
        title: 'Cours de mathématiques',
        badge: 'DS'
      },
      {
        time: '16:00',
        end: '17:00',
        title: 'Cours de français',
        badge: 'Contrôle'
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
        title: 'Cours de géographie',
        badge: 'Rendu de devoirs'
      },
      {
        time: '14:30',
        end: '15:30',
        title: 'Cours de géographie',
        badge: 'Rendu de devoirs'
      },
      {
        time: '15:00',
        end: '16:00',
        title: 'Cours de mathématiques',
        badge: 'DS'
      },
      {
        time: '16:00',
        end: '17:00',
        title: 'Cours de français',
        badge: 'Contrôle'
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
        title: 'Cours de géographie',
        badge: 'Rendu de devoirs'
      },
      {
        time: '15:00',
        end: '16:00',
        title: 'Cours de mathématiques',
        badge: 'DS'
      },
      {
        time: '16:00',
        end: '17:00',
        title: 'Cours de français',
        badge: 'Contrôle'
      }
    ]
  }
]
</script>

<template>
  <div v-for="item in dates" :key="item.id" class="flex gap-5 snap-start w-full">
    <h3 class="text-sm opacity-50" :class="{ 'text-primary font-bold !opacity-100': item.id === 1 }">{{ item.date }}</h3>
    <div class="flex-1 flex flex-col gap-2">
      <NuxtLinkLocale v-for="(event, index) in item.events" :key="index" :class="{ 'bg-primary-50 !opacity-100 hover:!opacity-75': item.id === 1 }" :to="{ name: 'agenda_id', params: { id: 1 } }" class="overflow-hidden flex items-center justify-start cursor-pointer rounded-lg gap-2 bg-gray-50 dark:bg-gray-800 opacity-50 hover:opacity-75">
        <p class="h-full flex items-center justify-center px-2 bg-indigo-500 text-white text-sm">
          {{ event.time }}
          <br />
          {{ event.end }}
        </p>

        <div class="p-2 flex-1">
          <p class="w-full flex items-center justify-between gap-2 text-sm font-semibold">
            {{ event.title }}
            <UBadge :label="event.badge" size="xs" />
          </p>
          <p class="text-xs opacity-75">
            Amphi E - Terminale PG
          </p>
        </div>
      </NuxtLinkLocale>
    </div>
  </div>
</template>