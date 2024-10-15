<script setup lang="ts">
import type { Column, Task } from '@/types'

const props = defineProps<{
  task: Task
  column: Column
  columns: Column[]
}>()

const emit = defineEmits<{
  (e: "delete", payload: number): void
  (e: "update", payload: { task: Task, column: Column }): void
}>()

const editMode = ref(false)
const priority = ref(0)

const priorityIcon = computed(() => {
  switch (priority.value) {
    case 0:
      return "bg-green-500"
    case 1:
      return "bg-yellow-500"
    case 2:
      return "bg-red-500"
    default:
      return ""
  }
})

const deleteTask = () => {
  emit("delete", props.task.id)
}

const changePriority = (index) => {
  priority.value = index
  savePriorityToLocal()
}

const switchTaskToColumn = (task, column, id) => {
  emit("update", { task, column, id })
}

const savePriorityToLocal = () => {
  localStorage.setItem(`taskPriority_${props.task.id}`, priority.value.toString())
}

onMounted(() => {
  const savedPriority = localStorage.getItem(`taskPriority_${props.task.id}`)
  if (savedPriority !== null) {
    priority.value = parseInt(savedPriority)
  }
})

const updateTask = (task) => {
  editMode.value = false
}
</script>

<template>
  <div @dblclick="editMode = true" class="relative cursor-pointer group p-3 mb-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-opacity-75 focus:bg-opacity-75 dark:hover:bg-opacity-75 dark:focus:bg-opacity-75 rounded-md" tabindex="0">
    <div class="flex items-center gap-1.5 justify-between mb-1.5">
<!--        <div class="w-3 h-3 rounded-full" @click="changePriority" :class="priorityIcon" />-->
      <UInput v-if="editMode" v-model="task.title" size="xs" color="white" placeholder="Titre de la tâche..." />
      <p v-else class="text-sm font-semibold">{{ task.title }}</p>
      <div class="flex items-center justify-between gap-1">
        <UButton icon="i-heroicons-pencil-square" :padded="false" size="xs" variant="ghost" color="gray" @click="editMode = !editMode" />
        <UButton icon="i-heroicons-trash" :padded="false" size="xs" variant="ghost" color="gray" @click="deleteTask" />
      </div>
    </div>

    <UTextarea v-if="editMode" v-model="task.description" size="xs" color="white" placeholder="Description de la tâche..." />
    <p v-else-if="task.description && !editMode" class="text-sm">
      {{ task.description }}
    </p>

    <div v-if="!editMode" class="mt-2 flex items-center gap-1">
      <ClientOnly>
        <UPopover :popper="{ placement: 'bottom' }" :ui="{ base: 'flex flex-col gap-0.5 p-0.5' }">
          <UButton size="2xs" color="white" :label="column.title">
            <template #leading>
              <UIcon :name="column.icon" class="w-3 h-3" :class="column.color" dynamic />
            </template>
          </UButton>

          <template #panel>
            <template v-for="target in columns">
              <UButton size="2xs" color="white" :label="target.title" @click="switchTaskToColumn(task, column, target.id)">
                <template #leading>
                  <UIcon :name="target.icon" class="w-3 h-3" :class="target.color" dynamic />
                </template>
              </UButton>
            </template>
          </template>
        </UPopover>
      </ClientOnly>

      <ClientOnly>
        <UPopover :popper="{ placement: 'bottom' }" :ui="{ base: 'flex flex-col gap-0.5 p-0.5' }">
          <UButton size="2xs" color="white" :label="['Basse', 'Moyenne', 'Haute'][priority]">
            <template #leading>
              <UIcon name="i-heroicons-flag" class="w-3 h-3" :class="['bg-green-500', 'bg-yellow-500', 'bg-red-500'][priority]" />
            </template>
          </UButton>

          <template #panel>
            <template v-for="(priority, index) in ['Basse', 'Moyenne', 'Haute']">
              <UButton size="2xs" color="white" :label="priority" @click="changePriority(index)">
                <template #leading>
                  <UIcon name="i-heroicons-flag" class="w-3 h-3" :class="['bg-green-500', 'bg-yellow-500', 'bg-red-500'][index]" />
                </template>
              </UButton>
            </template>
          </template>
        </UPopover>
      </ClientOnly>

      <p class="text-xs ml-auto opacity-75">{{ task.createdAt.toLocaleDateString() }}</p>
    </div>
    <div v-else>
      <UButton class="mt-2" size="xs" label="Enregistrer" @click="updateTask(task)" />
    </div>
  </div>
</template>
