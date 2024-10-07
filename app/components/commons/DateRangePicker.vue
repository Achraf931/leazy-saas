<script setup lang="ts">
import { sub, format, isSameDay, type Duration } from 'date-fns'

const ranges = [
  {label: '7 derniers jours', duration: { days: 7 } },
  { label: '14 derniers jours', duration: { days: 14 } },
  { label: '30 derniers jours', duration: { days: 30 } },
  { label: '3 derniers mois', duration: { months: 3 } },
  { label: '6 derniers mois', duration: { months: 6 } },
  { label: 'L\'année dernière', duration: { years: 1 } }
]

const selected = defineModel({
  type: Object as PropType<Range>,
  required: true
})

function isRangeSelected(duration: Duration) {
  return isSameDay(selected.value.start, sub(new Date(), duration)) && isSameDay(selected.value.end, new Date())
}

function selectRange(duration: Duration) {
  selected.value = { start: sub(new Date(), duration), end: new Date() }
}
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <template #default="{ open }">
      <UButton
          color="gray"
          variant="ghost"
          :class="[open && 'bg-gray-50 dark:bg-gray-800']"
          trailing-icon="i-heroicons-chevron-down-20-solid"
      >
        {{ format(selected.start, 'd MMM, yyy') }} - {{ format(selected.end, 'd MMM, yyy') }}
      </UButton>
    </template>

    <template #panel="{ close }">
      <div class="flex items-center sm:divide-x divide-gray-200 dark:divide-gray-800">
        <div class="hidden sm:flex flex-col py-4">
          <UButton
              v-for="(range, index) in ranges"
              :key="index"
              :label="range.label"
              color="gray"
              variant="ghost"
              class="rounded-none px-6"
              :class="[isRangeSelected(range.duration) ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50']"
              truncate
              @click="selectRange(range.duration)"
          />
        </div>

        <CommonsDatePicker
            v-model="selected"
            @close="close"
        />
      </div>
    </template>
  </UPopover>
</template>