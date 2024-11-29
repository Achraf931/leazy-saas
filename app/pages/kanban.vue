<script lang="ts" setup>
import { CreateTaskModal } from '#components'
import Draggable from 'vuedraggable'
import { useKeyModifier, useLocalStorage } from '@vueuse/core'
import type { Column, Task } from '@/types'

const modal = useModal()
const q = ref('')
const isLoading = ref(false)
const columns = useLocalStorage<Column[]>('kanban', [
  {
    id: 1,
    title: 'À trier',
    icon: 'i-mdi-dots-circle',
    color: 'dark:text-gray-500 text-gray-400',
    tasks: []
  },
  {
    id: 2,
    title: 'En attente',
    icon: 'i-mdi-circle-outline',
    color: 'dark:text-gray-500 text-gray-400',
    tasks: []
  },
  {
    id: 3,
    title: 'À faire',
    icon: 'i-mdi-circle-slice-2',
    color: 'text-blue-500 dark:text-blue-400',
    tasks: []
  },
  {
    id: 4,
    title: 'En cours',
    icon: 'i-mdi-circle-slice-4',
    color: 'text-yellow-500 dark:text-yellow-400',
    tasks: []
  },
  {
    id: 5,
    title: 'Terminé',
    icon: 'i-mdi-check-circle-outline',
    color: 'text-green-500 dark:text-green-400',
    tasks: []
  }
], {
  serializer: {
    read: (value) => {
      return JSON.parse(value).map((column: Column) => {
        column.tasks = column.tasks.map((task: Task) => {
          task.createdAt = new Date(task.createdAt)
          return task
        })
        return column
      })
    },
    write: value => JSON.stringify(value)
  }
})

const alt = useKeyModifier('alt')

function createColumn() {
  const column: Column = {
    id: Date.now(),
    title: '',
    icon: 'i-mdi-circle-outline',
    color: 'dark:text-gray-500 text-gray-400',
    tasks: []
  }
  columns.value.push(column)
  nextTick(() => {
    (
      document.querySelector(
        '.column:last-of-type'
      ) as HTMLInputElement
    ).focus()
  })
}

function deleteColumn(columnId: string) {
  columns.value = columns.value.filter(c => c.id !== columnId)
}

const updateTask = ({ task, column, id }) => {
  if (id) {
    columns.value = columns.value.map((c) => {
      if (c.id === id) {
        c.tasks.push(task)
      }
      return c
    })
    
    const index = columns.value.findIndex(c => c.id === column.id)
    columns.value[index].tasks = columns.value[index].tasks.filter(t => t.id !== task.id)
  } else {
    const index = columns.value.findIndex(c => c.id === column.id)
    columns.value[index].tasks = columns.value[index].tasks.map((t) => {
      if (t.id === task.id) {
        return task
      }
      return t
    })
  }
}

const onSubmit = async (task: any, id: number) => {
  isLoading.value = true
  const column = columns.value.find(c => c.id === id)
  column.tasks.push({
    id: Date.now(),
    title: task.title,
    description: task.description,
    createdAt: new Date()
  })
  
  isLoading.value = false
  await modal.close()
}

const handleModal = (id: number) => {
  modal.open(CreateTaskModal, {
    loading: isLoading.value,
    onCreate: task => onSubmit(task, id),
    onClose: () => modal.close()
  })
}
</script>

<template>
  <UDashboardPage :ui="{ wrapper: 'overflow-hidden' }">
    <UDashboardPanel
      :ui="{ wrapper: 'overflow-hidden' }"
      grow
    >
      <UDashboardNavbar>
        <template #title>
          <ToggleDrawer title="Mes tâches" />
        </template>
        
        <template #right>
          <UInput
            v-model="q"
            :trailing="false"
            color="white"
            icon="i-heroicons-magnifying-glass-20-solid"
            placeholder="Rechercher une tâche..."
            size="sm"
          />
          
          <UButton
            class="hidden"
            color="black"
            label="Ajouter une colonne"
            size="sm"
            @click="createColumn"
          />
        </template>
      </UDashboardNavbar>
      
      <UDashboardPanelContent :ui="{ wrapper: 'flex-row overflow-x-auto overflow-y-hidden' }">
        <div class="flex flex-1 space-x-3">
          <div
            v-for="column in columns"
            :key="column.id"
            class="relative flex flex-col w-72"
          >
            <header
              class="flex items-center justify-between pb-2.5 gap-3 border-b border-gray-200 dark:border-gray-800 mb-1.5"
            >
              <div class="flex items-center gap-2">
                <UIcon
                  :class="column.color"
                  :name="column.icon"
                  class="w-4 h-4"
                  dynamic
                />
                <span class="text-sm font-medium">{{ column.title }}</span>
                <span class="text-sm dark:text-gray-500 text-gray-400">{{ column.tasks.length }}</span>
              </div>
              
              <div class="flex items-center -my-1">
                <UButton
                  color="gray"
                  icon="i-heroicons-plus"
                  size="xs"
                  variant="ghost"
                  @click="handleModal(column.id)"
                />
                <UPopover :popper="{ placement: 'bottom-end' }">
                  <UButton
                    color="gray"
                    icon="i-heroicons-ellipsis-horizontal"
                    size="xs"
                    variant="ghost"
                  />
                  
                  <template #panel>
                    <div class="p-0.5 flex flex-col gap-0.5">
                      <UButton
                        color="gray"
                        icon="i-heroicons-eye-slash"
                        label="Cacher"
                        size="xs"
                        variant="ghost"
                      />
                    </div>
                  </template>
                </UPopover>
              </div>
            </header>
            
            <Draggable
              v-model="column.tasks"
              :animation="150"
              :group="{ name: 'tasks', pull: alt ? 'clone' : true }"
              class="smooth-dnd-container vertical flex-1 pb-3 overflow-y-auto"
              item-key="id"
            >
              <template #item="{ element: task }: { element: Task }">
                <TaskCard
                  :column="column"
                  :columns="columns"
                  :task="task"
                  @delete="column.tasks = column.tasks.filter((t) => t.id !== $event)"
                  @update="updateTask"
                />
              </template>
            </Draggable>
          </div>
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
