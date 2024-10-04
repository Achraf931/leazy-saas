<script setup lang="ts">
import type { Mail } from '~/types'

const tabItems = [{
  label: 'Tout'
}, {
  label: 'Non lu'
}]
const selectedTab = ref(0)

const dropdownItems = [[{
  label: 'Marquer comme :',
  disabled: true
}, {
  label: 'Non lu',
  icon: 'i-heroicons-check-circle'
}, {
  label: 'Important',
  icon: 'i-heroicons-exclamation-circle'
}]]

const { data: mails } = await useFetch<Mail[]>('/api/mails', { default: () => [] })

// Filter mails based on the selected tab
const filteredMails = computed(() => {
  if (selectedTab.value === 1) {
    return mails.value.filter(mail => !!mail.unread)
  }

  return mails.value
})

const selectedMail = ref<Mail | null>()

const isMailPanelOpen = computed({
  get () {
    return !!selectedMail.value
  },
  set (value: boolean) {
    if (!value) {
      selectedMail.value = null
    }
  }
})

// Reset selected mail if it's not in the filtered mails
watch(filteredMails, () => {
  if (!filteredMails.value.find(mail => mail.id === selectedMail.value?.id)) {
    selectedMail.value = null
  }
})
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel id="inbox" :width="400" :resizable="{ min: 300, max: 500 }">
      <template #handle="{ onDrag }">
        <UDashboardPanelHandle :ui="{ container: 'group-hover:bg-primary-500 dark:group-hover:bg-primary-400' }" @mousedown="onDrag" />
      </template>

      <UDashboardNavbar :badge="filteredMails.length">
        <template #title>
          <ToggleDrawer title="Messages" />
        </template>

        <template #right>
          <UTabs v-model="selectedTab" :items="tabItems" :ui="{ wrapper: '', list: { height: 'h-9', tab: { height: 'h-7', size: 'text-[13px]' } } }" />
        </template>
      </UDashboardNavbar>

      <!-- ~/components/inbox/InboxList.vue -->
      <InboxList v-model="selectedMail" :mails="filteredMails" />
    </UDashboardPanel>

    <UDashboardPanel v-model="isMailPanelOpen" collapsible grow side="right">
      <template v-if="selectedMail">
        <InboxMail :mail="selectedMail" />
      </template>
      <div v-else class="flex-1 hidden lg:flex items-center justify-center">
        <UIcon name="i-heroicons-inbox" class="w-32 h-32 text-gray-400 dark:text-gray-500" />
      </div>
    </UDashboardPanel>
  </UDashboardPage>
</template>
