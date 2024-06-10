<script setup lang="ts">
import type { Member } from '~/types'

const { data: students } = await useFetch<Member[]>('/api/students', { default: () => [] })

const q = ref('')
const isInviteModalOpen = ref(false)

const filteredStudents = computed(() => {
  return students.value.filter(member => {
    return member.name.search(new RegExp(q.value, 'i')) !== -1 || member.username.search(new RegExp(q.value, 'i')) !== -1
  })
})
</script>

<template>
  <UDashboardPanelContent>
    <UDashboardSection title="Gérer la classe" description="Inviter de nouveaux élèves par email.">
      <template #links>
        <UButton label="Inviter des élèves" color="black" @click="isInviteModalOpen = true" />
      </template>

      <UCard :ui="{ header: { padding: 'p-4 sm:px-6' }, body: { padding: '' } }" class="min-w-0">
        <template #header>
          <UInput v-model="q" icon="i-heroicons-magnifying-glass" placeholder="Rechercher un élève" autofocus />
        </template>

        <!-- ~/components/settings/MembersList.vue -->
        <ClassesStudentsList :students="filteredStudents" />
      </UCard>
    </UDashboardSection>

    <UDashboardModal v-model="isInviteModalOpen" title="Inviter un élève" description="Inviter de nouveaux élèves par email" :ui="{ width: 'sm:max-w-md' }">
      <!-- ~/components/settings/MembersForm.vue -->
      <ClassesStudentsForm @close="isInviteModalOpen = false" />
    </UDashboardModal>
  </UDashboardPanelContent>
</template>
