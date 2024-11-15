<script setup lang="ts">
import Draggable from 'vuedraggable'

defineProps(['formation'])

const localePath = useLocalePath()
const dragging = ref(false)
const controlOnStart = ref(false)
const lessons = ref([
  { id: 1, title: 'Titre de la leçon 1', description: 'Description de la leçon', checked: false },
  { id: 2, title: 'Titre de la leçon 2', description: 'Description de la leçon', checked: false }
])

const additionalLessons = ref([
  { id: 3, title: 'Nouvelle Leçon 1', description: 'Description de la nouvelle leçon' },
  { id: 4, title: 'Nouvelle Leçon 2', description: 'Description de la nouvelle leçon' }
])

const dragOptions = computed(() => {
  return {
    animation: 200,
    group: 'lessons',
    disabled: false,
    ghostClass: 'ghost'
  }
})

const checkMove = (e) => {
  console.log('Future index : ', e.draggedContext.futureIndex)
}

const start = ({ originalEvent }) => {
  controlOnStart.value = originalEvent.ctrlKey
}

const clone = ({ title, id, description }) => {
  return { title, id, description, checked: false }
}

const pullFunction = () => {
  return controlOnStart.value ? 'clone' : true
}
</script>

<template>
  <div class="flex flex-row flex-1 gap-4">
    <div class="flex flex-col space-y-4 overflow-y-auto no-scrollbar w-9/12">
      <div class="flex gap-4 items-start justify-between">
        <p class="text-gray-600">Organisez votre formation en ajoutant des étapes et des leçons pour guider les apprenants dans leur parcours.</p>
        <UButton :to="localePath({ name: 'preview-id', params: { id: documentId } })" target="_blank" size="sm" leading-icon="i-heroicons-eye" label="Prévisualiser" />
      </div>

      <UDivider class="w-full" />

      <div class="flex gap-4">
        <div class="flex flex-col pb-2 gap-2 w-20">
          <UButton label="Infos" class="truncate" color="black" size="sm" block />
          <UDivider orientation="vertical" type="dashed" class="flex-1" />
        </div>

        <div class="bg-gray-100 dark:bg-gray-800 p-2 rounded-md flex-1 space-y-4 border border-gray-200 dark:border-gray-700">
          <UFormGroup label="Titre" name="title" required>
            <UInput name="title" placeholder="Ex. : Les bases du marketing digital" />
          </UFormGroup>

          <UFormGroup label="Courte description" name="description" description="Courte description visible dans la liste des formations" hint="Optionnel">
            <UTextarea name="description" placeholder="Ex. : Apprenez les stratégies essentielles pour réussir dans le marketing digital et optimiser votre présence en ligne" />
          </UFormGroup>
        </div>
      </div>

      <div class="flex gap-4">
        <div class="flex flex-col pb-2 gap-2 w-20">
          <UButton label="Step 1" class="truncate" color="black" size="sm" block />
          <UDivider orientation="vertical" type="dashed" class="flex-1" />
        </div>

        <div class="bg-gray-100 dark:bg-gray-800 p-2 rounded-md flex-1 space-y-4 border border-gray-200 dark:border-gray-700">
          <UFormGroup label="Titre" name="title" required>
            <UInput name="title" placeholder="Ex. : Les bases du marketing digital" />
          </UFormGroup>

          <UFormGroup label="Leçons" name="lessons" description="Organisez les leçons dans l'ordre souhaité" hint="Optionnel">
            <div class="rounded-md overflow-hidden relative">
              <TransitionGroup type="transition" :name="!dragging ? 'flip-list' : null">
                <Draggable
                  :list="lessons"
                  :class="lessons.length && 'divide-y'"
                  class="list-group divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 overflow-hidden rounded-md"
                  ghost-class="ghost"
                  group="lessons"
                  v-bind="dragOptions"
                  :move="checkMove"
                  @start="dragging = true"
                  @end="dragging = false"
                >
                  <template v-if="!lessons.length" #header>
                    <div class="p-2 border border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col items-center gap-2 rounded-b-md">
                      <UIcon name="i-heroicons-arrow-down-tray" class="w-4 h-4 text-gray-400 dark:text-gray-500" />
                      <p class="text-xs text-gray-400 dark:text-gray-500">Relâchez ici pour ajouter la leçon</p>
                    </div>
                  </template>
                  <template #item="{ element: lesson }">
                    <div class="list-group-item flex items-start gap-2 p-2 bg-white dark:bg-gray-800 cursor-grab active:overflow-hidden active:cursor-grabbing">
                      <NuxtImg src="https://support.discord.com/hc/theming_assets/01HZPN9XSQTZNQ61ZY6FH47BS1" alt="Test image" class="h-10 aspect-square rounded-lg object-cover" />
                      <div>
                        <p class="text-sm font-semibold">{{ lesson.title }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">{{ lesson.description }}</p>
                      </div>
                    </div>
                  </template>
                </Draggable>
              </TransitionGroup>
            </div>
          </UFormGroup>
        </div>
      </div>

      <div class="flex gap-4">
        <div class="flex flex-col pb-2 gap-2 w-20">
          <UButton label="Nouveau" class="truncate" size="sm" block />
          <UDivider orientation="vertical" type="dashed" class="flex-1" />
        </div>

        <div class="w-full p-2 border border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col items-center gap-2 rounded-md">
          <UIcon name="i-heroicons-arrow-down-tray" class="w-4 h-4 text-gray-400 dark:text-gray-500" />
          <p class="text-xs text-gray-400 dark:text-gray-500">Relâchez ici pour ajouter la leçon</p>
        </div>
      </div>
    </div>

    <!-- Sidebar de leçons additionnelles -->
    <div class="w-3/12 p-4 gap-2 rounded-lg border bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 flex flex-col">
      <UInput placeholder="Rechercher une leçon" autocomplete="off" icon="i-heroicons-magnifying-glass-20-solid" />

      <Draggable
        :list="additionalLessons"
        class="flex flex-col gap-2"
        :clone="clone"
        :group="{ name: 'lessons', pull: pullFunction }"
        @start="start"
      >
        <template #item="{ element: lesson }">
          <div class="flex items-start gap-2 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg cursor-grab active:overflow-hidden active:cursor-grabbing">
            <NuxtImg src="https://support.discord.com/hc/theming_assets/01HZPN9XSQTZNQ61ZY6FH47BS1" alt="Test image" class="w-10 h-10 rounded-lg object-cover" />
            <div>
              <p class="text-sm font-semibold">{{ lesson.title }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ lesson.description }}</p>
            </div>
          </div>
        </template>
      </Draggable>
    </div>
  </div>
</template>

<style scoped>
.ghost {
  background: rgba(55, 48, 163, .2);
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>
