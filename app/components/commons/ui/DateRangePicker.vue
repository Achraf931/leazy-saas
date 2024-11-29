<script lang="ts" setup>
import { type Duration, format, isSameDay, sub } from 'date-fns'

const ranges = [
  { label: '7 derniers jours', duration: { days: 7 } },
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
        :class="[open && 'bg-gray-50 dark:bg-gray-800']"
        color="gray"
        trailing-icon="i-heroicons-chevron-down-20-solid"
        variant="ghost"
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
            :class="[isRangeSelected(range.duration) ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50']"
            :label="range.label"
            class="rounded-none px-6"
            color="gray"
            truncate
            variant="ghost"
            @click="selectRange(range.duration)"
          />
        </div>
        
        <DatePicker
          v-model="selected"
          @close="close"
        />
      </div>
    </template>
  </UPopover>
</template>
