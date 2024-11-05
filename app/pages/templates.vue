<script setup lang="ts">
import { LessonsModal } from '#components'

const localePath = useLocalePath()
const toast = useToast()
const modal = useModal()
const { get, post } = useApi('lessons')
const pending = ref(false)
const levels = ref([])
const sort = ref('Plus récent')
const showLessons = ref(true)
const showChapters = ref(true)
const showFormations = ref(true)

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
          <ToggleDrawer title="Modèles" />
        </template>
      </UDashboardNavbar>

      <UDashboardPanelContent class="space-y-6">
        <section class="mb-5 grid">
          <NuxtImg src="https://www.notion.so/images/page-cover/gradients_5.png" alt="Discord" class="aspect-[16/3.5] col-start-1 col-end-13 row-start-1 row-end-4 h-full w-full opacity-50 rounded-xl" />
          <div class="col-start-2 col-end-12 row-start-2 row-end-3 flex flex-col justify-center text-center gap-3 p-4 z-10">
            <h1 class="font-bold text-xl">Bienvenue sur la communauté de <span class="text-primary">Leazy</span></h1>
            <p>
              Explorez les ressources partagées par les autres enseignants pour vous inspirer.
              <br />
              Personnalisez ces modèles pour vos propres cours.
            </p>
          </div>
          <div class="col-start-1 col-end-13 row-start-3 row-end-4 flex items-end gap-4 p-4 z-10">
            <UInput icon="i-heroicons-magnifying-glass" placeholder="Rechercher un modèle" />
            <UFormGroup label="Niveaux" :ui="{ label: { base: 'font-semibold' } }">
              <CommonsSelectMenu v-model="levels" endpoint="levels" placeholder="Niveaux" />
            </UFormGroup>
            <UFormGroup label="Matières" :ui="{ label: { base: 'font-semibold' } }">
              <CommonsSelectMenu v-model="levels" endpoint="levels" placeholder="Matières" />
            </UFormGroup>
            <UButton trailing-icon="i-heroicons-plus" @click="handleModal" label="Créer sans modèle" class="ml-auto" />
          </div>
        </section>

        <UDashboardSection class="!mt-0 sticky -top-4 left-0 bg-white dark:bg-gray-800 z-10">
          <template #title>
            <div class="flex items-center gap-4">
              <p class="font-normal text-sm">Filtrer par :</p>
              <UCheckbox v-model="showLessons" name="lessons" label="Leçons" :ui="{ base: 'w-3.5 h-3.5', inner: 'ms-1.5' }" />
              <UCheckbox v-model="showChapters" name="chapters" label="Chapitres" :ui="{ base: 'w-3.5 h-3.5', inner: 'ms-1.5' }" />
              <UCheckbox v-model="showFormations" name="formations" label="Formations" :ui="{ base: 'w-3.5 h-3.5', inner: 'ms-1.5' }" />
            </div>
          </template>
          <template #links>
            <p class="text-sm">{{ lessons.data?.length }} résultats</p>
            <USelectMenu v-model="sort" :options="['Plus récent', 'Plus ancien', 'Nom A-Z', 'Nom Z-A']" class="ml-2" />
          </template>
        </UDashboardSection>

        <p v-if="!showLessons && !showChapters && !showFormations" class="text-center text-gray-400 dark:text-white text-sm mt-4">Aucun modèle trouvé</p>
        <template v-else>
          <section v-if="showLessons">
            <h2 class="font-bold text-lg mb-1">Modèles de leçons</h2>
            <UBlogList v-if="lessons?.data?.length" orientation="horizontal" :ui="{ wrapper: 'p-px gap-x-4 gap-y-6 sm:grid sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' }">
              <LessonsCard v-for="lesson in lessons.data" :key="lesson.id" @click="() => { preview.template = lesson; preview.open = true }" :lesson template />
            </UBlogList>
            <p v-else class="text-center text-gray-400 dark:text-white text-sm mt-4">Aucun modèle de leçon trouvé</p>
          </section>

          <section v-if="showChapters">
            <h2 class="font-bold text-lg mb-1">Modèles de chapitres</h2>
            <UBlogList v-if="lessons?.data?.length" orientation="horizontal" :ui="{ wrapper: 'p-px gap-x-4 gap-y-6 sm:grid sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' }">
              <LessonsCard v-for="lesson in lessons.data" :key="lesson.id" @click="() => { preview.template = lesson; preview.open = true }" :lesson template />
            </UBlogList>
            <p v-else class="text-center text-gray-400 dark:text-white text-sm mt-4">Aucun modèle de chapitre trouvé</p>
          </section>

          <section v-if="showFormations">
            <h2 class="font-bold text-lg mb-1">Modèles de formations</h2>
            <UBlogList v-if="lessons?.data?.length" orientation="horizontal" :ui="{ wrapper: 'p-px gap-x-4 gap-y-6 sm:grid sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' }">
              <LessonsCard v-for="lesson in lessons.data" :key="lesson.id" @click="() => { preview.template = lesson; preview.open = true }" :lesson template />
            </UBlogList>
            <p v-else class="text-center text-gray-400 dark:text-white text-sm mt-4">Aucun modèle de formation trouvé</p>
          </section>
        </template>
      </UDashboardPanelContent>
    </UDashboardPanel>

    <UDashboardModal v-model="preview.open" :title="preview.template?.name" :description="preview.template?.description" :ui="{ width: 'sm:max-w-4xl', height: 'sm:h-[95dvh]', margin: 'sm:my-0', body: { padding: 'px-0 py-4 pb-0 sm:p-4 sm:px-0 sm:pb-0', base: 'px-0 overflow-hidden' } }">
      <div class="flex-1 overflow-y-auto">
        <LeazyEditor :model-value="JSON.parse(preview.template.content)" content-class="template-editor" :editable="false" :disabled="true" :hideToolbar="true" :hideBubble="true" max-width="100%" />
      </div>
      <template #footer>
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            Créé par : <UserInfoPopover :user="{ name: 'John Doe', created_at: '05/12/2022', avatar: 'https://img.freepik.com/psd-gratuit/illustration-3d-avatar-profil-humain_23-2150671142.jpg' }" />
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
