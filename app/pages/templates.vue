<script setup lang="ts">
import { LessonsModal } from '#components'

const localePath = useLocalePath()
const toast = useToast()
const modal = useModal()
const { get, post } = useApi('lessons')
const pending = ref(false)

const preview = reactive({
  template: null,
  open: false
})

const { data: lessons, refresh, error } = await useAsyncData('lessons', () => get(null, null))

if (error.value) toast.add({ icon: 'i-heroicons-exclamation-circle', title: 'Erreur', description: 'Une erreur est survenue lors du chargement des leçons', color: 'red', actions: [{ label: 'Réessayer', click: () => refresh() }] })

const addFromTemplate = async (template) => {
  pending.value = true
  const response = await post({ name: template.name, description: template.description, content: template.content })

  if (response) {
    toast.add({ icon: 'i-heroicons-check-circle', title: 'Nouvelle leçon crée', color: 'green' })

    pending.value = false
    preview.open = false
    return navigateTo(localePath({ name: 'lesson_id', params: { id: response.id } }))
  } else pending.value = false
}

const handleModal = () => {
  modal.open(LessonsModal, {
    onClose: () => modal.close()
  })
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar>
        <template #title>
          <ToggleDrawer title="Templates" />
        </template>
      </UDashboardNavbar>

      <UDashboardPanelContent>
        <UDashboardSection title="Créer une nouvelle leçon" description="Ou choisissez un modèle de leçon pour commencer.">
          <template #links>
            <UButton trailing-icon="i-heroicons-plus" @click="handleModal" label="Créer une leçon" />
          </template>
          <UBlogList v-if="lessons?.data?.length" orientation="horizontal" :ui="{ wrapper: 'p-px overflow-y-auto gap-x-4 gap-y-6 sm:grid sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' }">
            <Suspense>
              <LessonsCard v-for="lesson in lessons.data" :key="lesson.id" @click="() => { preview.template = lesson; preview.open = true }" :lesson template />
            </Suspense>
          </UBlogList>
          <p v-else class="text-center text-gray-400 dark:text-white text-sm mt-4">Aucune modèle de leçon trouvé</p>
        </UDashboardSection>
      </UDashboardPanelContent>
    </UDashboardPanel>

    <UDashboardModal v-model="preview.open" :title="preview.template?.name" :description="preview.template?.description" :ui="{ width: 'sm:max-w-4xl', height: 'sm:h-[95dvh]', margin: 'sm:my-0', body: { padding: 'px-0 py-4 pb-0 sm:p-4 sm:px-0 sm:pb-0', base: 'px-0 overflow-hidden' } }">
      <div class="flex-1 overflow-y-auto">
        <LeazyEditor :model-value="JSON.parse(preview.template.content)" content-class="template-editor" :editable="false" :disabled="true" :hideToolbar="true" :hideBubble="true" max-width="100%" />
      </div>
      <template #footer>
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            Créé par : <UAvatar size="3xs" title="John Doe" src="https://img.freepik.com/psd-gratuit/illustration-3d-avatar-profil-humain_23-2150671142.jpg" />
            <b class="font-medium">John Doe</b>
          </div>
          <UButton :loading="pending" label="Utiliser ce modèle" @click="addFromTemplate(preview.template)" />
        </div>
      </template>
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
