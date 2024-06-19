<script setup lang="ts">
import frLocale from 'date-fns/locale/fr'
import { format } from 'date-fns'

const { isNotificationsSlideoverOpen } = useDashboard()
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
          <p class="text-sm">{{ format(new Date(), 'dd MMMM yyyy', { locale: frLocale, addSuffix: true }) }}</p>
        </template>
      </UDashboardNavbar>

      <UDashboardPanelContent>
        <UCard>
          <UAccordion variant="ghost" color="gray" :items="[{ label: 'Calendrier', defaultOpen: true }]" :ui="{ default: { class: 'w-fit p-0 hover:bg-transparent' } }">
            <template #item>
              <div class="flex items-center justify-center pt-1.5">
                <svg class="frappe-chart chart" width="860" height="184">
                  <defs></defs>
                  <g class="heatmap-chart chart-draw-area" transform="translate(50, 46)">
                    <text class="subdomain-name" x="-6" y="12" dy="8px" font-size="10px" fill="var(--charts-label-color)"
                          text-anchor="end">Lun
                    </text>
                    <text class="subdomain-name" x="-6" y="36" dy="8px" font-size="10px" fill="var(--charts-label-color)"
                          text-anchor="end">Mer
                    </text>
                    <text class="subdomain-name" x="-6" y="60" dy="8px" font-size="10px" fill="var(--charts-label-color)"
                          text-anchor="end">Jeu
                    </text>
                    <g class="heat-domain domain-5" transform="">
                      <rect class="day" x="0" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-06-02"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="0" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-06-03"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="12" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-06-04"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="12" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-06-05"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="12" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-06-06"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="12" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-06-07"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="12" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-06-08"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="12" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-06-09"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="12" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-06-10"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="24" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-06-11"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="24" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-06-12"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="24" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-06-13"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="24" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-06-14"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="24" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-06-15"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="24" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-06-16"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="24" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-06-17"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="36" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-06-18"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="36" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-06-19"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="36" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-06-20"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="36" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-06-21"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="36" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-06-22"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="36" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-06-23"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="36" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-06-24"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="48" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-06-25"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="48" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-06-26"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="48" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-06-27"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="48" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-06-28"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="48" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-06-29"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="48" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-06-30"
                            data-value="0" data-day="5"></rect>
                      <text class="domain-name" x="12" y="-12" dy="4.5px" font-size="9px" fill="var(--charts-label-color)"
                            text-anchor="start">JUI
                      </text>
                    </g>
                    <g class="heat-domain domain-6" transform="">
                      <rect class="day" x="60" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-07-01"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="72" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-07-02"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="72" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-07-03"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="72" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-07-04"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="72" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-07-05"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="72" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-07-06"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="72" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-07-07"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="72" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-07-08"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="84" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-07-09"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="84" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-07-10"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="84" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-07-11"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="84" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-07-12"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="84" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-07-13"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="84" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-07-14"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="84" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-07-15"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="96" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-07-16"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="96" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-07-17"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="96" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-07-18"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="96" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-07-19"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="96" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-07-20"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="96" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-07-21"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="96" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-07-22"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="108" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-07-23"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="108" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-07-24"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="108" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-07-25"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="108" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-07-26"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="108" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-07-27"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="108" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-07-28"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="108" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-07-29"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="120" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-07-30"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="120" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-07-31"
                            data-value="0" data-day="1"></rect>
                      <text class="domain-name" x="72" y="-12" dy="4.5px" font-size="9px" fill="var(--charts-label-color)"
                            text-anchor="start">JUL
                      </text>
                    </g>
                    <g class="heat-domain domain-7" transform="">
                      <rect class="day" x="132" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-08-01"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="132" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-08-02"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="132" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-08-03"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="132" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-08-04"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="132" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-08-05"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="144" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-08-06"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="144" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-08-07"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="144" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-08-08"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="144" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-08-09"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="144" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-08-10"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="144" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-08-11"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="144" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-08-12"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="156" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-08-13"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="156" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-08-14"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="156" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-08-15"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="156" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-08-16"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="156" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-08-17"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="156" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-08-18"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="156" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-08-19"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="168" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-08-20"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="168" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-08-21"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="168" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-08-22"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="168" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-08-23"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="168" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-08-24"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="168" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-08-25"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="168" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-08-26"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="180" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-08-27"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="180" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-08-28"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="180" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-08-29"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="180" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-08-30"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="180" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-08-31"
                            data-value="0" data-day="4"></rect>
                      <text class="domain-name" x="144" y="-12" dy="4.5px" font-size="9px" fill="var(--charts-label-color)"
                            text-anchor="start">AOU
                      </text>
                    </g>
                    <g class="heat-domain domain-8" transform="">
                      <rect class="day" x="192" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-09-01"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="192" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-09-02"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="204" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-09-03"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="204" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-09-04"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="204" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-09-05"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="204" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-09-06"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="204" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-09-07"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="204" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-09-08"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="204" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-09-09"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="216" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-09-10"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="216" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-09-11"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="216" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-09-12"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="216" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-09-13"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="216" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-09-14"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="216" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-09-15"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="216" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-09-16"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="228" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-09-17"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="228" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-09-18"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="228" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-09-19"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="228" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-09-20"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="228" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-09-21"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="228" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-09-22"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="228" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-09-23"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="240" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-09-24"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="240" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-09-25"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="240" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-09-26"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="240" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-09-27"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="240" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-09-28"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="240" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-09-29"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="240" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-09-30"
                            data-value="0" data-day="6"></rect>
                      <text class="domain-name" x="204" y="-12" dy="4.5px" font-size="9px" fill="var(--charts-label-color)"
                            text-anchor="start">SEP
                      </text>
                    </g>
                    <g class="heat-domain domain-9" transform="">
                      <rect class="day" x="264" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-10-01"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="264" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-10-02"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="264" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-10-03"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="264" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-10-04"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="264" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-10-05"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="264" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-10-06"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="264" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-10-07"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="276" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-10-08"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="276" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-10-09"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="276" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-10-10"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="276" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-10-11"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="276" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-10-12"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="276" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-10-13"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="276" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-10-14"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="288" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-10-15"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="288" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-10-16"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="288" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-10-17"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="288" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-10-18"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="288" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-10-19"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="288" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-10-20"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="288" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-10-21"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="300" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-10-22"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="300" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-10-23"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="300" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-10-24"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="300" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-10-25"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="300" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-10-26"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="300" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-10-27"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="300" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-10-28"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="312" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-10-29"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="312" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-10-30"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="312" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-10-31"
                            data-value="0" data-day="2"></rect>
                      <text class="domain-name" x="276" y="-12" dy="4.5px" font-size="9px" fill="var(--charts-label-color)"
                            text-anchor="start">OCT
                      </text>
                    </g>
                    <g class="heat-domain domain-10" transform="">
                      <rect class="day" x="324" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-11-01"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="324" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-11-02"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="324" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-11-03"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="324" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-11-04"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="336" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-11-05"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="336" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-11-06"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="336" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-11-07"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="336" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-11-08"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="336" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-11-09"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="336" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-11-10"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="336" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-11-11"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="348" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-11-12"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="348" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-11-13"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="348" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-11-14"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="348" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-11-15"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="348" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-11-16"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="348" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-11-17"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="348" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-11-18"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="360" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-11-19"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="360" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-11-20"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="360" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-11-21"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="360" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-11-22"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="360" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-11-23"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="360" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-11-24"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="360" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-11-25"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="372" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-11-26"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="372" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-11-27"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="372" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-11-28"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="372" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-11-29"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="372" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-11-30"
                            data-value="0" data-day="4"></rect>
                      <text class="domain-name" x="336" y="-12" dy="4.5px" font-size="9px" fill="var(--charts-label-color)"
                            text-anchor="start">NOV
                      </text>
                    </g>
                    <g class="heat-domain domain-11" transform="">
                      <rect class="day" x="384" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-12-01"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="384" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-12-02"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="396" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-12-03"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="396" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-12-04"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="396" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-12-05"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="396" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-12-06"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="396" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-12-07"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="396" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-12-08"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="396" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-12-09"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="408" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-12-10"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="408" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-12-11"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="408" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-12-12"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="408" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-12-13"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="408" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-12-14"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="408" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-12-15"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="408" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-12-16"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="420" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-12-17"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="420" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-12-18"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="420" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-12-19"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="420" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-12-20"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="420" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-12-21"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="420" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-12-22"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="420" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-12-23"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="432" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-12-24"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="432" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-12-25"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="432" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-12-26"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="432" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-12-27"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="432" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-12-28"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="432" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-12-29"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="432" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-12-30"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="444" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2023-12-31"
                            data-value="0" data-day="0"></rect>
                      <text class="domain-name" x="396" y="-12" dy="4.5px" font-size="9px" fill="var(--charts-label-color)"
                            text-anchor="start">DEC
                      </text>
                    </g>
                    <g class="heat-domain domain-0" transform="">
                      <rect class="day" x="456" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-01-01"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="456" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-01-02"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="456" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-01-03"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="456" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-01-04"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="456" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-01-05"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="456" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-01-06"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="468" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-01-07"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="468" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-01-08"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="468" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-01-09"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="468" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-01-10"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="468" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-01-11"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="468" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-01-12"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="468" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-01-13"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="480" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-01-14"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="480" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-01-15"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="480" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-01-16"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="480" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-01-17"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="480" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-01-18"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="480" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-01-19"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="480" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-01-20"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="492" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-01-21"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="492" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-01-22"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="492" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-01-23"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="492" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-01-24"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="492" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-01-25"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="492" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-01-26"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="492" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-01-27"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="504" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-01-28"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="504" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-01-29"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="504" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-01-30"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="504" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-01-31"
                            data-value="0" data-day="3"></rect>
                      <text class="domain-name" x="468" y="-12" dy="4.5px" font-size="9px" fill="var(--charts-label-color)"
                            text-anchor="start">JAN
                      </text>
                    </g>
                    <g class="heat-domain domain-1" transform="">
                      <rect class="day" x="516" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-02-01"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="516" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-02-02"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="516" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-02-03"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="528" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-02-04"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="528" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-02-05"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="528" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-02-06"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="528" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-02-07"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="528" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-02-08"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="528" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-02-09"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="528" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-02-10"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="540" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-02-11"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="540" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-02-12"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="540" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-02-13"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="540" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-02-14"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="540" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-02-15"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="540" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-02-16"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="540" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-02-17"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="552" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-02-18"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="552" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-02-19"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="552" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-02-20"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="552" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-02-21"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="552" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-02-22"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="552" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-02-23"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="552" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-02-24"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="564" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-02-25"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="564" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-02-26"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="564" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-02-27"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="564" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-02-28"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="564" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-02-29"
                            data-value="0" data-day="4"></rect>
                      <text class="domain-name" x="528" y="-12" dy="4.5px" font-size="9px" fill="var(--charts-label-color)"
                            text-anchor="start">FEV
                      </text>
                    </g>
                    <g class="heat-domain domain-2" transform="">
                      <rect class="day" x="576" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-03-01"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="576" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-03-02"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="588" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-03-03"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="588" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-03-04"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="588" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-03-05"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="588" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-03-06"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="588" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-03-07"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="588" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-03-08"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="588" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-03-09"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="600" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-03-10"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="600" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-03-11"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="600" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-03-12"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="600" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-03-13"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="600" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-03-14"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="600" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-03-15"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="600" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-03-16"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="612" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-03-17"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="612" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-03-18"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="612" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-03-19"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="612" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-03-20"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="612" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-03-21"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="612" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-03-22"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="612" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-03-23"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="624" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-03-24"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="624" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-03-25"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="624" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-03-26"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="624" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-03-27"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="624" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-03-28"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="624" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-03-29"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="624" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-03-30"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="636" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-03-31"
                            data-value="0" data-day="0"></rect>
                      <text class="domain-name" x="588" y="-12" dy="4.5px" font-size="9px" fill="var(--charts-label-color)"
                            text-anchor="start">MAR
                      </text>
                    </g>
                    <g class="heat-domain domain-3" transform="">
                      <rect class="day" x="648" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-04-01"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="648" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-04-02"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="648" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-04-03"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="648" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-04-04"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="648" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-04-05"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="648" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-04-06"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="660" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-04-07"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="660" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-04-08"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="660" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-04-09"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="660" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-04-10"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="660" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-04-11"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="660" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-04-12"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="660" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-04-13"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="672" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-04-14"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="672" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-04-15"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="672" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-04-16"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="672" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-04-17"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="672" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-04-18"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="672" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-04-19"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="672" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-04-20"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="684" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-04-21"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="684" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-04-22"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="684" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-04-23"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="684" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-04-24"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="684" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-04-25"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="684" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-04-26"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="684" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-04-27"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="696" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-04-28"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="696" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-04-29"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="696" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-04-30"
                            data-value="0" data-day="2"></rect>
                      <text class="domain-name" x="660" y="-12" dy="4.5px" font-size="9px" fill="var(--charts-label-color)"
                            text-anchor="start">AVR
                      </text>
                    </g>
                    <g class="heat-domain domain-4" transform="">
                      <rect class="day" x="708" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-05-01"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="708" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-05-02"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="708" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-05-03"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="708" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-05-04"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="720" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-05-05"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="720" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-05-06"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="720" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-05-07"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="720" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-05-08"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="720" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-05-09"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="720" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-05-10"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="720" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-05-11"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="732" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-05-12"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="732" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-05-13"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="732" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-05-14"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="732" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-05-15"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="732" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-05-16"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="732" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-05-17"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="732" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-05-18"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="744" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-05-19"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="744" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-05-20"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="744" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-05-21"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="744" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-05-22"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="744" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-05-23"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="744" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-05-24"
                            data-value="0" data-day="5"></rect>
                      <rect class="day" x="744" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-05-25"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="756" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-05-26"
                            data-value="0" data-day="0"></rect>
                      <rect class="day" x="756" y="12" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-05-27"
                            data-value="0" data-day="1"></rect>
                      <rect class="day" x="756" y="24" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-05-28"
                            data-value="0" data-day="2"></rect>
                      <rect class="day" x="756" y="36" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-05-29"
                            data-value="0" data-day="3"></rect>
                      <rect class="day" x="756" y="48" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-05-30"
                            data-value="0" data-day="4"></rect>
                      <rect class="day" x="756" y="60" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-05-31"
                            data-value="0" data-day="5"></rect>
                      <text class="domain-name" x="720" y="-12" dy="4.5px" font-size="9px" fill="var(--charts-label-color)"
                            text-anchor="start">MAI
                      </text>
                    </g>
                    <g class="heat-domain domain-5" transform="">
                      <rect class="day" x="768" y="72" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-06-01"
                            data-value="0" data-day="6"></rect>
                      <rect class="day" x="780" y="0" width="10" height="10" rx="3" fill="#ebedf0" data-date="2024-06-02"
                            data-value="0" data-day="0"></rect>
                      <text class="domain-name" x="780" y="-12" dy="4.5px" font-size="9px" fill="var(--charts-label-color)"
                            text-anchor="start">JUI
                      </text>
                    </g>
                  </g>
                  <g class="chart-legend" transform="translate(50, 150)">
                    <text class="subdomain-name" x="0" y="12" dy="9px" font-size="11px" fill="var(--charts-label-color)"
                          text-anchor="start">Moins
                    </text>
                    <rect class="heatmap-legend-unit" x="30" y="12" width="10" height="10" rx="3" fill="#ebedf0"></rect>
                    <rect class="heatmap-legend-unit" x="45" y="12" width="10" height="10" rx="3" fill="#c6e48b"></rect>
                    <rect class="heatmap-legend-unit" x="60" y="12" width="10" height="10" rx="3" fill="#7bc96f"></rect>
                    <rect class="heatmap-legend-unit" x="75" y="12" width="10" height="10" rx="3" fill="#239a3b"></rect>
                    <rect class="heatmap-legend-unit" x="90" y="12" width="10" height="10" rx="3" fill="#196127"></rect>
                    <text class="subdomain-name" x="108" y="12" dy="9px" font-size="11px" fill="var(--charts-label-color)"
                          text-anchor="start">Plus
                    </text>
                  </g>
                </svg>
              </div>
            </template>
          </UAccordion>

          <template #footer>
            <UAccordion variant="ghost" color="gray" :items="[{ label: 'Notifications', defaultOpen: true }]" :ui="{ default: { class: 'w-fit p-0 hover:bg-transparent' } }">
              <template #item>
                <ul class="timeline pt-1.5 relative">
                  <li class="relative leading-none">
                    <label class="timeline-event-icon">
                      <UIcon :name="`i-heroicons-pencil`" class="w-3.5 h-3.5" dynamic />
                    </label>
                    <div class="timeline-event-copy">
                      <p class="leading-3">Demande d'aide sur la leçon <strong class="cursor-pointer" @click="isNotificationsSlideoverOpen = true">"HTML pour les débutants"</strong> de la part de<strong> John Aplogan</strong> <span class="mx-1.5">•</span> <span class="text-xs">il y a 3 heures</span></p>
                    </div>
                  </li>
                  <li class="relative leading-none">
                    <label class="timeline-event-icon">
                      <UIcon :name="`i-heroicons-question-mark-circle`" class="w-3.5 h-3.5 text-orange-500" dynamic />
                    </label>
                    <div class="timeline-event-copy">
                      <p class="leading-3">Demande d'aide sur la leçon <strong class="cursor-pointer" @click="isNotificationsSlideoverOpen = true">"HTML pour les débutants"</strong> de la part de<strong> John Aplogan</strong> <span class="mx-1.5">•</span> <span class="text-xs">il y a 3 heures</span></p>
                    </div>
                  </li>
                  <li class="relative leading-none">
                    <label class="timeline-event-icon">
                      <UIcon :name="`i-heroicons-archive-box`" class="w-3.5 h-3.5" dynamic />
                    </label>
                    <div class="timeline-event-copy">
                      <p class="leading-3">Demande d'aide sur la leçon <strong class="cursor-pointer" @click="isNotificationsSlideoverOpen = true">"HTML pour les débutants"</strong> de la part de<strong> John Aplogan</strong> <span class="mx-1.5">•</span> <span class="text-xs">il y a 3 heures</span></p>
                    </div>
                  </li>
                  <li class="relative leading-none">
                    <label class="timeline-event-icon">
                      <UIcon :name="`i-heroicons-archive-box`" class="w-3.5 h-3.5" dynamic />
                    </label>
                    <div class="timeline-event-copy">
                      <p class="leading-3">Demande d'aide sur la leçon <strong class="cursor-pointer" @click="isNotificationsSlideoverOpen = true">"HTML pour les débutants"</strong> de la part de<strong> John Aplogan</strong> <span class="mx-1.5">•</span> <span class="text-xs">il y a 3 heures</span></p>
                    </div>
                  </li>
                  <li class="relative leading-none">
                    <label class="timeline-event-icon">
                      <UIcon :name="`i-heroicons-archive-box`" class="w-3.5 h-3.5" dynamic />
                    </label>
                    <div class="timeline-event-copy">
                      <p class="leading-3">Demande d'aide sur la leçon <strong class="cursor-pointer" @click="isNotificationsSlideoverOpen = true">"HTML pour les débutants"</strong> de la part de<strong> John Aplogan</strong> <span class="mx-1.5">•</span> <span class="text-xs">il y a 3 heures</span></p>
                    </div>
                  </li>
                  <li class="relative leading-none">
                    <label class="timeline-event-icon">
                      <UIcon :name="`i-heroicons-archive-box`" class="w-3.5 h-3.5" dynamic />
                    </label>
                    <div class="timeline-event-copy">
                      <p class="leading-3">Demande d'aide sur la leçon <strong class="cursor-pointer" @click="isNotificationsSlideoverOpen = true">"HTML pour les débutants"</strong> de la part de<strong> John Aplogan</strong> <span class="mx-1.5">•</span> <span class="text-xs">il y a 3 heures</span></p>
                    </div>
                  </li>
                  <li class="relative leading-none">
                    <label class="timeline-event-icon">
                      <UIcon :name="`i-heroicons-archive-box`" class="w-3.5 h-3.5" dynamic />
                    </label>
                    <div class="timeline-event-copy">
                      <p class="leading-3">Demande d'aide sur la leçon <strong class="cursor-pointer" @click="isNotificationsSlideoverOpen = true">"HTML pour les débutants"</strong> de la part de<strong> John Aplogan</strong> <span class="mx-1.5">•</span> <span class="text-xs">il y a 3 heures</span></p>
                    </div>
                  </li>
                  <li class="relative leading-none">
                    <label class="timeline-event-icon">
                      <UIcon :name="`i-heroicons-archive-box`" class="w-3.5 h-3.5" dynamic />
                    </label>
                    <div class="timeline-event-copy">
                      <p class="leading-3">Demande d'aide sur la leçon <strong class="cursor-pointer" @click="isNotificationsSlideoverOpen = true">"HTML pour les débutants"</strong> de la part de<strong> John Aplogan</strong> <span class="mx-1.5">•</span> <span class="text-xs">il y a 3 heures</span></p>
                    </div>
                  </li>
                  <li class="relative leading-none">
                    <label class="timeline-event-icon">
                      <UIcon :name="`i-heroicons-archive-box`" class="w-3.5 h-3.5" dynamic />
                    </label>
                    <div class="timeline-event-copy">
                      <p class="leading-3">Demande d'aide sur la leçon <strong class="cursor-pointer" @click="isNotificationsSlideoverOpen = true">"HTML pour les débutants"</strong> de la part de<strong> John Aplogan</strong> <span class="mx-1.5">•</span> <span class="text-xs">il y a 3 heures</span></p>
                    </div>
                  </li>
                  <li class="relative leading-none">
                    <label class="timeline-event-icon">
                      <UIcon :name="`i-heroicons-archive-box`" class="w-3.5 h-3.5" dynamic />
                    </label>
                    <div class="timeline-event-copy">
                      <p class="leading-3">Demande d'aide sur la leçon <strong class="cursor-pointer" @click="isNotificationsSlideoverOpen = true">"HTML pour les débutants"</strong> de la part de<strong> John Aplogan</strong> <span class="mx-1.5">•</span> <span class="text-xs">il y a 3 heures</span></p>
                    </div>
                  </li>
                </ul>
              </template>
            </UAccordion>
          </template>
        </UCard>
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
