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
    <UDashboardSection title="Gérer la classe">
      <template v-if="false" #links>
        <UButton label="Ajouter des élèves" color="black" @click="isInviteModalOpen = true" />
      </template>

      <UCard :ui="{ header: { padding: 'p-4 pt-0 sm:px-6' }, body: { padding: '' } }" class="min-w-0">
        <template #header>
          <UInput v-model="q" icon="i-heroicons-magnifying-glass" placeholder="Rechercher un élève" autofocus />
        </template>

        <ClassesStudentsList :students="filteredStudents" />
      </UCard>
    </UDashboardSection>

    <UModal v-model="isInviteModalOpen" :ui="{ width: 'sm:max-w-md' }">
      <UCard>
        <div class="flex items-start justify-between gap-x-1.5 pb-4">
          <div class="flex items-start gap-4">
            <div>
              <p class="text-gray-900 dark:text-white font-semibold">Ajouter un élève</p>
              <p class="mt-1 text-gray-500 dark:text-gray-400 text-sm">Ajouter de nouveaux élèves par email</p>
            </div>
          </div>
          <UButton icon="i-heroicons-x-mark" color="gray" variant="ghost" @click="isNewFeedbackModalOpen = false" />
        </div>
        <ClassesStudentsForm @close="isInviteModalOpen = false" />
      </UCard>
    </UModal>
  </UDashboardPanelContent>
</template>
