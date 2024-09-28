<script setup lang="ts">
import frLocale from 'date-fns/locale/fr'
import { format } from 'date-fns'

const courses = ref({
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
})

interface TimelineItem {
  date: string
  label: string
  title: string
  content: string
}

const props = defineProps<{
  items: TimelineItem[]
}>()

const notifications = reactive([
  {
    date: 'Aujourd\'hui',
    type: 'alert'
  },
  {
    date: 'Hier',
    author: 'Charfeddine Hamrouni',
    avatar: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/d95c1f148207527.62d1246c25004.jpg',
    type: 'info'
  },
  {
    date: 'Avant-hier',
    author: 'John Aplogan',
    content: 'Notre société ne se sent pas en guerre, nous ne nous sentons pas en guerre. Notre ventre n’a pas faim et nos sens ne sont pas constamment aux aguets',
    avatar: 'https://img.freepik.com/psd-gratuit/illustration-3d-avatar-profil-humain_23-2150671142.jpg',
    type: 'help'
  }
])

const time = ref(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))

let timer

const updateClock = () => {
  time.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

onMounted(() => {
  timer = setInterval(updateClock, 1000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar>
        <template #title>
          <ToggleDrawer />
          <h1 class="flex items-center gap-1.5 font-semibold text-gray-900 dark:text-white min-w-0">Accueil</h1>
        </template>

        <template #right>
          <p class="text-sm">{{ format(new Date(), 'dd MMMM yyyy', { locale: frLocale, addSuffix: true }) }} - {{ time }}</p>
        </template>
      </UDashboardNavbar>

      <UDashboardPanelContent>
        <div class="grid grid-cols-3 gap-4">
          <div class="h-[400px] col-span-3 md:col-span-2 font-semibold bg-gray-100 dark:bg-gray-800 text-4xl flex items-center justify-center p-4 rounded-lg">
            Coming soon...
          </div>
          <div class="flex flex-col col-span-3 md:col-span-1 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h3 class="font-semibold">Cours du jour</h3>
            <div class="flex-1 flex flex-col gap-2 mt-4">
              <NuxtLink v-for="(event, index) in courses.events" :key="index" :to="localePath({ name: 'agenda_id', params: { id: 1 } })" class="overflow-hidden flex items-center justify-start cursor-pointer rounded-lg bg-gray-50 dark:bg-gray-700 hover:opacity-75">
                <p class="h-full flex items-center justify-center px-2 bg-indigo-500 text-xs font-semibold opacity-75">
                  {{ event.time }}
                  <br />
                  {{ event.end }}
                </p>

                <div class="p-2 pl-4 flex-1 border border-gray-200 dark:border-gray-600 rounded-r-lg">
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
          <div class="col-span-3 md:col-span-1 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h3 class="font-semibold">Liste des tâches</h3>
            <div class="mt-4">
              <div class="relative cursor-pointer group p-3 mb-1.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-opacity-75 focus:bg-opacity-75 dark:hover:bg-opacity-75 dark:focus:bg-opacity-75 rounded-md" tabindex="0" data-draggable="true"><div class="flex items-center gap-1.5 justify-between mb-1.5"><!--        <div class="w-3 h-3 rounded-full" @click="changePriority" :class="priorityIcon" />--><p class="text-sm font-semibold">Première tâche</p><button type="button" class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-xs gap-x-1.5 p-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"><span class="i-heroicons-trash flex-shrink-0 h-4 w-4" aria-hidden="true"></span><!--v-if--><!--v-if--></button></div><!--v-if--><div class="mt-2 flex items-center gap-1"><!-- eslint-disable-next-line vue/no-template-shadow --><div class="relative" data-headlessui-state=""><div class="inline-flex w-full" role="button" id="headlessui-popover-button-ndcv2Y3vSTA_29" aria-expanded="false" data-headlessui-state=""><button type="button" class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-xs gap-x-1 px-2 py-1 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-900 dark:text-white bg-white hover:bg-gray-50 disabled:bg-white dark:bg-gray-900 dark:hover:bg-gray-800/50 dark:disabled:bg-gray-900 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"><svg data-v-4fa0a2a1="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="icon w-3 h-3 dark:text-gray-500 text-gray-400" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 19c1.1 0 2 .9 2 2s-.9 2-2 2s-2-.9-2-2s.9-2 2-2m0-18c1.1 0 2 .9 2 2s-.9 2-2 2s-2-.9-2-2s.9-2 2-2M6 16c1.1 0 2 .9 2 2s-.9 2-2 2s-2-.9-2-2s.9-2 2-2m-3-6c1.1 0 2 .9 2 2s-.9 2-2 2s-2-.9-2-2s.9-2 2-2m3-6c1.1 0 2 .9 2 2s-.9 2-2 2s-2-.9-2-2s.9-2 2-2m12 12c1.1 0 2 .9 2 2s-.9 2-2 2s-2-.9-2-2s.9-2 2-2m3-6c1.1 0 2 .9 2 2s-.9 2-2 2s-2-.9-2-2s.9-2 2-2m-3-6c1.1 0 2 .9 2 2s-.9 2-2 2s-2-.9-2-2s.9-2 2-2"></path></svg><span class="">À trier</span><!--v-if--></button></div><!----><!--v-if--><!--v-if--></div><div hidden="" style="position: fixed; height: 0px; padding: 0px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; border-width: 0px; display: none;"></div><!-- eslint-disable-next-line vue/no-template-shadow --><div class="relative" data-headlessui-state=""><div class="inline-flex w-full" role="button" id="headlessui-popover-button-ndcv2Y3vSTA_31" aria-expanded="false" data-headlessui-state=""><button type="button" class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-xs gap-x-1 px-2 py-1 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-900 dark:text-white bg-white hover:bg-gray-50 disabled:bg-white dark:bg-gray-900 dark:hover:bg-gray-800/50 dark:disabled:bg-gray-900 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"><span class="i-heroicons-flag w-3 h-3 bg-green-500"></span><span class="">Basse</span><!--v-if--></button></div><!----><!--v-if--><!--v-if--></div><div hidden="" style="position: fixed; height: 0px; padding: 0px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; border-width: 0px; display: none;"></div><p class="text-xs ml-auto opacity-75">26/09/2024</p></div></div>
            </div>
          </div>
          <div class="col-span-3 md:col-span-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
            <h3 class="font-semibold">Mes notifications <UKbd class="ml-2">3</UKbd></h3>
            <div class="mt-4 space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
              <div v-for="(item, index) in notifications" :key="index" class="relative">
                <div class="flex items-center md:space-x-3 mb-1">
                  <div class="flex items-center space-x-3 md:space-x-1 md:space-x-reverse">
                    <!-- Icon -->
                    <div class="flex items-center justify-center w-8 h-8 rounded-full shadow md:order-1" :class="item.type === 'help' ? 'bg-primary text-white' : item.type === 'info' ? 'bg-white dark:bg-gray-600 text-gray-400 dark:text-gray-200' : 'bg-yellow-500'">
                      <UIcon :name="item.type === 'help' ? 'i-heroicons-chat-bubble-bottom-center-text-solid' : item.type === 'info' ? 'i-heroicons-information-circle-solid' : 'i-heroicons-exclamation-triangle-solid'" class="w-5 h-5" dynamic />
                    </div>
                  </div>
                  <!-- Title -->
                  <div class="ml-4 md:ml-14">
                    <p class="text-gray-500 dark:text-gray-400 text-xs">{{ item.date }}</p>
                    <div class="text-sm text-gray-400 flex items-center gap-2">
                      <template v-if="'author' in item">
                        <UAvatar size="xs" :title="item.author" :src="item.avatar" />
                        <span class="text-gray-800 dark:text-white font-semibold">{{ item.author }}</span>
                        <template v-if="item.type === 'help'">
                          demande de l'aide
                        </template>
                        <template v-else>
                          s'est connecté
                        </template>
                      </template>
                      <template v-else>
                      <span class="text-gray-800 dark:text-white">
                        Vous avez <span class="font-semibold">4</span> tâches à faire pour <span class="font-semibold">aujourd'hui</span>
                      </span>
                      </template>
                    </div>
                  </div>
                </div>
                <!-- Card -->
                <div v-if="'content' in item" class="flex gap-2 ml-[3.35rem]">
                  <UIcon name="i-heroicons-arrow-turn-down-right" class="w-5 h-5 min-w-5 min-h-5" dynamic />
                  <div class="bg-white dark:bg-gray-700 p-2 text-xs rounded border border-gray-200 dark:border-gray-600 opacity-75 italic">
                    {{ item.content }}...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style lang="scss">
.timeline {
  &:before {
    @apply content-[''] absolute top-0 left-[6.5px] w-px h-full bg-gray-200 dark:bg-gray-500;
  }
}

.timeline-event-copy {
  position: relative;
  padding-left: 35px;
  padding-bottom: 20px;
}

.timeline li:last-child .timeline-event-copy {
  padding-bottom: 0;
}

.timeline-event-icon {
  @apply flex items-center justify-center absolute top-0 w-3.5 h-3.5 rounded-full bg-white dark:bg-gray-800 outline outline-8 outline-white dark:outline-gray-900;
}
</style>
