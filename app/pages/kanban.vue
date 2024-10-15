<script setup lang="ts">
import type { Column, Task } from '@/types'
import Draggable from 'vuedraggable'
import { useLocalStorage, useKeyModifier } from '@vueuse/core'

const q = ref('')
const modal = ref({ open: false, column: null })
const isLoading = ref(false)
const fields = reactive({
  title: undefined,
  description: undefined
})
const columns = useLocalStorage<Column[]>('kanban', [
  {
    id: 1,
    title: 'À trier',
    icon: 'i-mdi-dots-circle',
    color: 'dark:text-gray-500 text-gray-400',
    tasks: [],
  },
  {
    id: 2,
    title: 'En attente',
    icon: 'i-mdi-circle-outline',
    color: 'dark:text-gray-500 text-gray-400',
    tasks: [],
  },
  {
    id: 3,
    title: 'À faire',
    icon: 'i-mdi-circle-slice-2',
    color: 'text-blue-500 dark:text-blue-400',
    tasks: [],
  },
  {
    id: 4,
    title: 'En cours',
    icon: 'i-mdi-circle-slice-4',
    color: 'text-yellow-500 dark:text-yellow-400',
    tasks: [],
  },
  {
    id: 5,
    title: 'Terminé',
    icon: 'i-mdi-check-circle-outline',
    color: 'text-green-500 dark:text-green-400',
    tasks: [],
  },
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
    write: (value) => JSON.stringify(value)
  }
})

const validate = (state) => {
  const errors = []

  if (!state.title) errors.push({ path: 'name', message: 'Le titre est requis' })

  return errors
}

const alt = useKeyModifier('alt')

function createColumn() {
  const column: Column = {
    id: Date.now(),
    title: "",
    icon: "i-mdi-circle-outline",
    color: "dark:text-gray-500 text-gray-400",
    tasks: [],
  }
  columns.value.push(column);
  nextTick(() => {
    (
        document.querySelector(
            ".column:last-of-type"
        ) as HTMLInputElement
    ).focus();
  });
}

function deleteColumn(columnId: string) {
  columns.value = columns.value.filter(c => c.id !== columnId);
}

const updateTask = ({ task, column, id }) => {
  if (id) {
    columns.value = columns.value.map((c) => {
      if (c.id === id) {
        c.tasks.push(task)
      }
      return c
    })

    const index = columns.value.findIndex((c) => c.id === column.id)
    columns.value[index].tasks = columns.value[index].tasks.filter((t) => t.id !== task.id)
  } else {
    const index = columns.value.findIndex((c) => c.id === column.id)
    columns.value[index].tasks = columns.value[index].tasks.map((t) => {
      if (t.id === task.id) {
        return task
      }
      return t
    })
  }
}

const onSubmit = async (id) => {
  isLoading.value = true
  const column = columns.value.find((c) => c.id === id)
  column.tasks.push({
    id: Date.now(),
    title: fields.title,
    description: fields.description,
    createdAt: new Date()
  })

  fields.title = undefined
  fields.description = undefined
  isLoading.value = false
  modal.value = { open: false, column: null }
}
</script>

<template>
  <UDashboardPage :ui="{ wrapper: 'overflow-hidden' }">
    <UDashboardPanel grow :ui="{ wrapper: 'overflow-hidden' }">
      <UDashboardNavbar>
        <template #title>
          <ToggleDrawer title="Mes tâches" />
        </template>

       <template #right>
         <UInput
             v-model="q"
             icon="i-heroicons-magnifying-glass-20-solid"
             size="sm"
             color="white"
             :trailing="false"
             placeholder="Rechercher une tâche..."
         />

          <UButton
            class="hidden"
            label="Ajouter une colonne"
            color="black"
            size="sm"
            @click="createColumn"
          />
       </template>
      </UDashboardNavbar>

      <UDashboardPanelContent :ui="{ wrapper: 'flex-row overflow-x-auto overflow-y-hidden' }">
        <div class="flex flex-1 space-x-3">
            <div v-for="column in columns" :key="column.id" class="relative flex flex-col w-72">
                <header class="flex items-center justify-between pb-2.5 gap-3 border-b border-gray-200 dark:border-gray-800 mb-1.5">
                  <div class="flex items-center gap-2">
                    <UIcon :name="column.icon" class="w-4 h-4" :class="column.color" dynamic />
                    <span class="text-sm font-medium">{{ column.title }}</span>
                    <span class="text-sm dark:text-gray-500 text-gray-400">{{ column.tasks.length }}</span>
                  </div>

                  <div class="flex items-center -my-1">
                    <UButton size="xs" variant="ghost" color="gray" icon="i-heroicons-plus" @click="() => { modal.column = column.id; modal.open = true }" />
                    <ClientOnly>
                      <UPopover :popper="{ placement: 'bottom-end' }">
                        <UButton size="xs" variant="ghost" color="gray" icon="i-heroicons-ellipsis-horizontal" />

                        <template #panel>
                          <div class="p-0.5 flex flex-col gap-0.5">
                            <UButton size="xs" label="Cacher" icon="i-heroicons-eye-slash" color="gray" variant="ghost" />
                          </div>
                        </template>
                      </UPopover>
                    </ClientOnly>
                  </div>
                </header>

                <Draggable
                    v-model="column.tasks"
                    :group="{ name: 'tasks', pull: alt ? 'clone' : true}"
                    :animation="150"
                    class="smooth-dnd-container vertical flex-1 pb-3 overflow-y-auto"
                    item-key="id"
                >
                  <template #item="{ element: task }: { element: Task }">
                      <KanbanTask :task="task" :column="column" :columns="columns" @update="updateTask" @delete="column.tasks = column.tasks.filter((t) => t.id !== $event)"/>
                  </template>
                </Draggable>
              </div>
          </div>

        <UModal prevent-close v-model="modal.open" :ui="{ width: 'sm:max-w-md' }">
          <UCard>
            <div class="flex items-start justify-between gap-x-1.5 pb-5">
              <p class="text-gray-900 dark:text-white font-semibold">Nouvelle tâche</p>
              <UButton icon="i-heroicons-x-mark" color="gray" variant="ghost" @click="modal.open = false" />
            </div>
            <UForm class="space-y-4" :state="fields" :validate="validate" @submit="onSubmit(modal.column)">
              <UFormGroup label="Titre" name="title">
                <UInput type="text" placeholder="Titre de la tâche" autofocus v-model="fields.title" />
              </UFormGroup>

              <UFormGroup label="Description (optionnelle)" name="description">
                <UTextarea placeholder="Description de la tâche" v-model="fields.description" />
              </UFormGroup>

              <div class="flex justify-end gap-3">
                <UButton label="Annuler" color="gray" variant="ghost" @click="modal.open = false" />
                <UButton :loading="isLoading" type="submit" label="Créer" color="black" />
              </div>
            </UForm>
          </UCard>
        </UModal>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
