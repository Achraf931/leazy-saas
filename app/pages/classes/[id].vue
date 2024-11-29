<script lang="ts" setup>
import { AddStudentModal } from '#components'

const { data: students } = await useFetch('/api/students', { default: () => [] })

const modal = useModal()
const q = ref('')

const filteredStudents = computed(() => {
  return students.value.filter(member => {
    return member.name.search(new RegExp(q.value, 'i')) !== -1 || member.username.search(new RegExp(q.value, 'i')) !== -1
  })
})

const handleModal = () => {
  modal.open(AddStudentModal, {
    onClose: () => modal.close()
  })
}
</script>

<template>
  <UDashboardPanelContent>
    <UDashboardSection title="Gérer la classe">
      <template v-if="false" #links>
        <UButton color="black" label="Ajouter des élèves" @click="handleModal" />
      </template>
      
      <UCard :ui="{ header: { padding: 'p-4 pt-0 sm:px-6' }, body: { padding: '' } }" class="min-w-0">
        <template #header>
          <UInput v-model="q" autofocus icon="i-heroicons-magnifying-glass" placeholder="Rechercher un élève" />
        </template>
        
        <StudentList :students="filteredStudents" />
      </UCard>
    </UDashboardSection>
  </UDashboardPanelContent>
</template>
