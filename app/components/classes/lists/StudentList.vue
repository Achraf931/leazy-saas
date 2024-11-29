<script lang="ts" setup>
import type { Member } from '~/types'

defineProps({
  students: {
    type: Array as PropType<Member[]>,
    default: () => []
  }
})

function getItems(student: Member) {
  return [[{
    label: 'Modifier',
    click: () => console.log('Edit', student)
  }, {
    label: 'Supprimer',
    labelClass: 'text-red-500 dark:text-red-400',
    click: () => console.log('Remove', student)
  }]]
}

function onRoleChange(student: Member, role: string) {
  // Do something with data
  console.log(student.username, role)
}
</script>

<template>
  <ul class="divide-y divide-gray-200 dark:divide-gray-800" role="list">
    <li
      v-for="(student, index) in students" :key="index"
      class="flex items-center justify-between gap-3 py-3 px-4 sm:px-6"
    >
      <div class="flex items-center gap-3 min-w-0">
        <UAvatar size="md" v-bind="student.avatar" />
        
        <div class="text-sm min-w-0">
          <p class="text-gray-900 dark:text-white font-medium truncate">
            {{ student.name }}
          </p>
          <p class="text-gray-500 dark:text-gray-400 truncate">
            {{ student.username }}
          </p>
        </div>
      </div>
      
      <div class="flex items-center gap-3">
        <UBadge :color="student.role === 'enseignant' ? 'green' : 'primary'" size="xs" variant="subtle">
          {{ student.role }}
        </UBadge>
        
        <UDropdown v-if="false" :items="getItems(student)" position="bottom-end">
          <UButton color="gray" icon="i-heroicons-ellipsis-vertical" variant="ghost" />
        </UDropdown>
      </div>
    </li>
  </ul>
</template>
