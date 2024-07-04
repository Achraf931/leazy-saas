<script setup lang="ts">
import { BaseKit, type BaseKitOptions } from '@/extensions/index.js'
import { useLessonsStore } from '@/stores/library'

const store = useLessonsStore()
const isOpen = ref(false)
const { fetchLessons, addLesson } = store
const { lessons } = storeToRefs(store)

await fetchLessons()

const localePath = useLocalePath()
const toast = useToast()
const isLoading = ref(false)
const extensions: BaseKitOptions = [BaseKit]
const modal = reactive({
  template: null,
  open: false
})

const fields = reactive({
  name: undefined,
  description: undefined
})

const validate = (state) => {
  const errors = []

  if (!state.name) errors.push({ path: 'name', message: 'Le titre est requis' })

  return errors
}

const onSubmit = async (state) => {
  isLoading.value = true
  const response = await addLesson({ ...state.data })

  if (response) {
    toast.add({ icon: 'i-heroicons-check-circle', title: 'Nouvelle leçon crée', color: 'green' })

    setTimeout(async () => {
      isLoading.value = false
      return navigateTo(localePath({ name: 'lesson_id', params: { id: response.id } }))
    }, 2000)
  }
  else isLoading.value = false
}

const addFromTemplate = async (template) => {
  isLoading.value = true
  const response = await addLesson({ name: template.name, description: template.description, content: template.content })

  if (response) {
    toast.add({ icon: 'i-heroicons-check-circle', title: 'Nouvelle leçon crée', color: 'green' })

    setTimeout(async () => {
      isLoading.value = false
      modal.open = false
      return navigateTo(localePath({ name: 'lesson_id', params: { id: response.id } }))
    })
  } else isLoading.value = false
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar>
        <template #title>
          <ToggleDrawer />
          <h1 class="flex items-center gap-1.5 font-semibold text-gray-900 dark:text-white min-w-0">Templates</h1>
        </template>
      </UDashboardNavbar>

      <UDashboardPanelContent>
        <UDashboardSection title="Créer une nouvelle leçon" description="Ou choisissez un modèle de leçon pour commencer.">
          <template #links>
            <UButton trailing-icon="i-heroicons-plus" @click="isOpen = true" label="Créer une leçon" />
          </template>
          <UBlogList orientation="horizontal" :ui="{ wrapper: 'p-px overflow-y-auto gap-x-4 gap-y-6 sm:grid sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' }">
            <UBlogPost v-for="lesson in lessons.data" :key="lesson.id" @click="() => { modal.template = lesson; modal.open = true }" :ui="{ wrapper: 'gap-y-0', container: 'p-2 rounded-b-lg bg-white dark:bg-gray-800 border border-t-0 border-solid border-gray-200 dark:border-gray-800', image: { wrapper: 'ring-0 border border-solid border-gray-200 dark:border-gray-800 rounded-none rounded-t-lg' } }" class="cursor-pointer text-xs">
              <template #image>
                <Editor :model-value="JSON.parse(lesson.content)" content-class="preview-editor" :extensions="extensions" :editable="false" :disabled="true" :hideToolbar="true" :hideBubble="true" max-width="100%" />
              </template>
              <div class="mb-2">
                <h2 class="text-gray-900 dark:text-white font-semibold line-clamp-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200 text-base">{{ lesson.name }}</h2>
                <p class="line-clamp-2 text-gray-400 text-xs mt-0.5">{{ lesson.description }}</p>
              </div>
              <div v-if="lesson.chapter" class="flex items-start gap-2">
                <UBadge v-if="lesson.chapter.theme" variant="soft" color="yellow" size="xs">{{ lesson.chapter.theme.name }}</UBadge>
                <UBadge variant="soft" color="blue" size="xs">{{ lesson.chapter.name }}</UBadge>
              </div>
            </UBlogPost>
          </UBlogList>
        </UDashboardSection>
      </UDashboardPanelContent>
    </UDashboardPanel>

    <UDashboardModal v-model="modal.open" :title="modal.template?.name" :description="modal.template?.description" :ui="{ width: 'sm:max-w-4xl', height: 'sm:h-[95dvh]', margin: 'sm:my-0', body: { padding: 'px-0 py-4 pb-0 sm:p-4 sm:px-0 sm:pb-0', base: 'px-0 overflow-hidden' } }">
      <div class="flex-1 overflow-y-auto">
        <Editor :model-value="JSON.parse(modal.template.content)" content-class="template-editor" :extensions="extensions" :editable="false" :disabled="true" :hideToolbar="true" :hideBubble="true" max-width="100%" />
      </div>
      <template #footer>
        <div class="flex items-center justify-between w-full">
          <span class="text-xs text-gray-600 dark:text-gray-400">By <b>John Doe</b></span>
          <UButton :loading="isLoading" label="Utiliser ce modèle" @click="addFromTemplate(modal.template)" />
        </div>
      </template>
    </UDashboardModal>

    <UDashboardModal prevent-close v-model="isOpen" title="Créer une leçon" :ui="{ width: 'sm:max-w-md' }">
      <UForm class="space-y-4" :state="fields" :validate="validate" @submit="onSubmit">
        <UFormGroup label="Titre" name="name">
          <UInput type="text" placeholder="Titre de la leçon" autofocus v-model="fields.name" />
        </UFormGroup>

        <UFormGroup label="Description (optionnelle)" name="description">
          <UTextarea placeholder="Description de la leçon" v-model="fields.description" />
        </UFormGroup>

        <div class="flex justify-end gap-3">
          <UButton label="Annuler" color="gray" variant="ghost" @click="isOpen = false" />
          <UButton :loading="isLoading" type="submit" label="Créer" color="black" />
        </div>
      </UForm>
    </UDashboardModal>
  </UDashboardPage>
</template>

<style lang="scss">
.template-lesson {
  margin: 0!important;

  .tiptap.ProseMirror {
    padding: 0!important;
  }

  & img {
    height: auto!important;
  }
}
</style>
