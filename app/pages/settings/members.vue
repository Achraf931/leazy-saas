<script setup lang="ts">
import type { Member } from '~/types'

const { data: members } = await useFetch<Member[]>('/api/members', { default: () => [] })

const q = ref('')
const isInviteModalOpen = ref(false)

const filteredMembers = computed(() => {
  return members.value.filter(member => {
    return member.name.search(new RegExp(q.value, 'i')) !== -1 || member.username.search(new RegExp(q.value, 'i')) !== -1
  })
})
</script>

<template>
  <UDashboardPanelContent class="pb-24">
    <UDashboardSection title="Manage access" description="Inviter de nouveaux membres par email." orientation="horizontal" :ui="{ container: 'lg:sticky top-2' }">
      <template #links>
        <UButton label="Inviter des personnes" color="black" @click="isInviteModalOpen = true" />
      </template>

      <UCard :ui="{ header: { padding: 'p-4 sm:px-6' }, body: { padding: '' } }" class="min-w-0">
        <template #header>
          <UInput v-model="q" icon="i-heroicons-magnifying-glass" placeholder="Rechercher un utilisateur" autofocus />
        </template>

        <!-- ~/components/settings/MembersList.vue -->
        <SettingsMembersList :members="filteredMembers" />
      </UCard>
    </UDashboardSection>

    <UDashboardModal v-model="isInviteModalOpen" title="Invite people" description="Inviter de nouveaux membres par email" :ui="{ width: 'sm:max-w-md' }">
      <!-- ~/components/settings/MembersForm.vue -->
      <SettingsMembersForm @close="isInviteModalOpen = false" />
    </UDashboardModal>
  </UDashboardPanelContent>
</template>
