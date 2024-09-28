<script setup lang="ts">
import { BaseKit, type BaseKitOptions } from '@/extensions/index.js'
import {formatDistanceToNow} from "date-fns";
import frLocale from "date-fns/locale/fr";

const extensions: BaseKitOptions = [BaseKit]
const localePath = useLocalePath()
const toast = useToast()

const { get, post } = useApi('lessons')

const { data: lessons, refresh, error } = await useAsyncData('lessons', () => get(null, null))

if (error.value) toast.add({ icon: 'i-heroicons-exclamation-circle', title: 'Erreur', description: 'Une erreur est survenue lors du chargement des leçons', color: 'red', actions: [{ label: 'Réessayer', click: () => refresh() }] })

const pending = ref(false)

const isOpen = ref(false)

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
  pending.value = true
  const response = await post({ ...state.data })

  if (response) {
    toast.add({ icon: 'i-heroicons-check-circle', title: 'Nouvelle leçon crée', color: 'green' })

    pending.value = false
    return navigateTo(localePath({ name: 'lesson_id', params: { id: response.id } }))
  } else pending.value = false
}

const addFromTemplate = async (template) => {
  pending.value = true
  const response = await post({ name: template.name, description: template.description, content: template.content })

  if (response) {
    toast.add({ icon: 'i-heroicons-check-circle', title: 'Nouvelle leçon crée', color: 'green' })

    pending.value = false
    modal.open = false
    return navigateTo(localePath({ name: 'lesson_id', params: { id: response.id } }))
  } else pending.value = false
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar>
        <template #title>
          <ToggleDrawer />
          <h1 class="flex items-center gap-1.5 font-semibold min-w-0">Templates</h1>
        </template>
      </UDashboardNavbar>

      <UDashboardPanelContent>
        <UDashboardSection title="Créer une nouvelle leçon" description="Ou choisissez un modèle de leçon pour commencer.">
          <template #links>
            <UButton trailing-icon="i-heroicons-plus" @click="isOpen = true" label="Créer une leçon" />
          </template>
          <UBlogList orientation="horizontal" :ui="{ wrapper: 'p-px overflow-y-auto gap-x-4 gap-y-6 sm:grid sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' }">
            <UBlogPost v-for="lesson in lessons.data" :key="lesson.id" @click="() => { modal.template = lesson; modal.open = true }" :ui="{ wrapper: 'gap-y-0 hover:opacity-75', container: 'p-2 rounded-b-lg bg-gray-100 dark:bg-gray-800 border border-t-0 border-solid border-gray-200 dark:border-gray-700', image: { wrapper: 'ring-0 border-x border-t border-gray-200 dark:border-gray-700 rounded-none rounded-t-lg' } }" class="cursor-pointer text-xs">
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
              <div class="mt-2">
                <div class="flex items-center gap-1">
                  <UIcon name="i-heroicons-clock" class="w-3.5 h-3.5 text-gray-400" />
                  <p class="text-gray-400 text-xs">Créé {{ formatDistanceToNow(new Date(lesson.created_at), { locale: frLocale, addSuffix: true }) }}</p>
                </div>
                <div class="flex items-center gap-2 mt-2">
                  <UAvatar size="3xs" title="John Doe" src="https://img.freepik.com/psd-gratuit/illustration-3d-avatar-profil-humain_23-2150671142.jpg" />
                  <p class="font-medium">John Doe</p>
                </div>
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
          <div class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            Créé par : <UAvatar size="3xs" title="John Doe" src="https://img.freepik.com/psd-gratuit/illustration-3d-avatar-profil-humain_23-2150671142.jpg" />
            <b class="font-medium">John Doe</b>
          </div>
          <UButton :loading="pending" label="Utiliser ce modèle" @click="addFromTemplate(modal.template)" />
        </div>
      </template>
    </UDashboardModal>

    <UModal prevent-close v-model="isOpen" :ui="{ width: 'sm:max-w-md' }">
      <UCard>
        <div class="flex items-start justify-between gap-x-1.5 pb-5">
          <p class="font-semibold">Créer une leçon</p>
          <UButton icon="i-heroicons-x-mark" color="gray" variant="ghost" @click="isOpen = false" />
        </div>
        <UForm class="space-y-4" :state="fields" :validate="validate" @submit="onSubmit">
          <UFormGroup label="Titre" name="name">
            <UInput type="text" placeholder="Titre de la leçon" autofocus v-model="fields.name" />
          </UFormGroup>

          <UFormGroup label="Description (optionnelle)" name="description">
            <UTextarea placeholder="Description de la leçon" v-model="fields.description" />
          </UFormGroup>

          <div class="flex justify-end gap-3">
            <UButton label="Annuler" color="gray" variant="ghost" @click="isOpen = false" />
            <UButton :loading="pending" type="submit" label="Créer" color="black" />
          </div>
        </UForm>
      </UCard>
    </UModal>
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
