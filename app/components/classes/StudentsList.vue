<script setup lang="ts">
import type { Member } from '~/types'

defineProps({
  students: {
    type: Array as PropType<Member[]>,
    default: () => []
  }
})

function getItems (student: Member) {
  return [[{
    label: 'Modifier',
    click: () => console.log('Edit', student)
  }, {
    label: 'Supprimer',
    labelClass: 'text-red-500 dark:text-red-400',
    click: () => console.log('Remove', student)
  }]]
}

function onRoleChange (student: Member, role: string) {
  // Do something with data
  console.log(student.username, role)
}
</script>

<template>
  <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-800">
    <li v-for="(student, index) in students" :key="index" class="flex items-center justify-between gap-3 py-3 px-4 sm:px-6">
      <div class="flex items-center gap-3 min-w-0">
        <UAvatar v-bind="student.avatar" size="md" />

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
        <UBadge variant="subtle" size="xs" :color="student.role === 'enseignant' ? 'green' : 'primary'">
          {{ student.role }}
        </UBadge>

        <UDropdown v-if="false" :items="getItems(student)" position="bottom-end">
          <UButton icon="i-heroicons-ellipsis-vertical" color="gray" variant="ghost" />
        </UDropdown>
      </div>
    </li>
  </ul>
</template>
