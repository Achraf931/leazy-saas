<script setup lang="ts">
definePageMeta({
  title: 'Titre de la formation'
})

const localePath = useLocalePath()
const { setBreadcrumbs } = useDashboard()
const { get } = useApi('chapters')
const open = ref(false)
const loading = ref(false)
const selected = ref(null)
const documentId = computed(() => useRoute().params.id)
const isOwner = computed(() => (localePath() === localePath({ name: 'library-formations-id-edit', params: { id: documentId.value } })))

setBreadcrumbs([
  {
    label: 'Bibliothèque',
    to: localePath({ name: 'library' })
  },
  {
    label: 'Formations',
    to: localePath({ name: 'library-formations' })
  },
  {
    label: 'Titre de la formation'
  }
])

const items = [{
  label: 'Getting Started',
  icon: 'i-heroicons-information-circle',
  defaultOpen: true,
  lessons: [
    {
      id: 1,
      label: 'Leçon 1',
      icon: 'i-heroicons-document-text'
    }
  ]
}, {
  label: 'Installation',
  icon: 'i-heroicons-arrow-down-tray',
  lessons: [
    {
      id: 2,
      label: 'Leçon 1',
      icon: 'i-heroicons-document-text'
    }
  ]
}, {
  label: 'Theming',
  icon: 'i-heroicons-eye-dropper',
  lessons: [
    {
      id: 3,
      label: 'Leçon 1',
      icon: 'i-heroicons-document-text'
    }
  ]
}, {
  label: 'Layouts',
  icon: 'i-heroicons-rectangle-group',
  lessons: [
    {
      id: 4,
      label: 'Leçon 1',
      icon: 'i-heroicons-document-text'
    }
  ]
}, {
  label: 'Components',
  icon: 'i-heroicons-square-3-stack-3d',
  lessons: [
    {
      id: 5,
      label: 'Leçon 1',
      icon: 'i-heroicons-document-text'
    },
    {
      id: 6,
      label: 'Leçon 2',
      icon: 'i-heroicons-document-text'
    }
  ]
}, {
  label: 'Utilities',
  icon: 'i-heroicons-wrench-screwdriver',
  lessons: [
    {
      id: 7,
      label: 'Leçon 1',
      icon: 'i-heroicons-document-text'
    }
  ]
}]

const search = async (q: string) => {
  loading.value = true

  const items: any[] = await get(null, { q })

  loading.value = false

  return 'data' in items ? items.data : items
}
</script>

<template>
  <UDashboardPanelContent class="text-sm" :ui="{ wrapper: 'flex-row gap-4 overflow-y-hidden' }">
    <template v-if="isOwner" #right>
      <UButton :to="localePath({ name: 'library-formations-id', params: { id: documentId } })" target="_blank" size="sm" leading-icon="i-heroicons-eye" label="Prévisualiser" />
    </template>

    <div class="w-9/12 overflow-y-auto no-scrollbar">
      <NuxtPage />
    </div>

    <div class="w-3/12 rounded-lg border bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 flex flex-col">
      <UFormGroup label="Ajouter depuis la bibliothèque" class="p-4">
        <UButton @click="open = true" label="Importer / Créer" color="primary" leading-icon="i-heroicons-arrow-down-tray" />
      </UFormGroup>

      <UDivider :ui="{ border: { base: 'dark:border-gray-700' } }" />

      <UButton :to="localePath({ name: 'library-formations-id', params: { id: '4' }, query: { tab: 'overview' } })" label="Introduction" size="sm" class="border-b border-gray-200 dark:border-gray-700 opacity-75 flex items-center justify-between gap-2 font-semibold hover:opacity-100 p-3 w-full text-left" :ui="{ rounded: 'rounded-none' }" :padded="false" trailing-icon="i-heroicons-arrow-right-20-solid" variant="ghost" color="gray" />

      <UAccordion :items="items" :ui="{ wrapper: 'flex flex-col w-full divide-y divide-gray-200 dark:divide-gray-700', item: { base: 'flex flex-col gap-1.5 bg-white dark:bg-gray-700', padding: 'px-1.5 pb-1.5' } }">
        <template #default="{ item, index, open }">
          <UButton color="gray" variant="ghost" :class="[open && 'border-b']" class="border-gray-200 dark:border-gray-700" :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">
            <span class="truncate font-semibold">{{ index + 1 }}. {{ item.label }}</span>

            <template #trailing>
              <UIcon
                name="i-heroicons-chevron-right-20-solid"
                class="w-5 h-5 ms-auto transform transition-transform duration-200"
                :class="[open && 'rotate-90']"
              />
            </template>
          </UButton>
        </template>

        <template #item="{ item }">
          <UButton v-for="lesson in item.lessons" :key="lesson.id" :to="localePath({ name: isOwner ? 'library-formations-id-lesson_id-edit' : 'library-formations-id-lesson_id', params: { id: documentId, lesson_id: lesson.id } })" leading-icon="i-heroicons-document-text" size="xs" color="gray" variant="ghost" :label="lesson.label"/>
          <UButton label="Ajouter une leçon" size="xs" leading-icon="i-heroicons-plus" color="gray" variant="ghost" />
        </template>
      </UAccordion>

      <UButton :to="localePath({ name: 'library-formations-id', params: { id: '4' }, query: { tab: 'resources' } })" label="Ressources" size="sm" class="border-t border-gray-200 dark:border-gray-700 opacity-75 flex items-center justify-between gap-2 font-semibold hover:opacity-100 p-3 w-full text-left" :ui="{ rounded: 'rounded-none' }" :padded="false" trailing-icon="i-heroicons-arrow-right-20-solid" variant="ghost" color="gray" />

      <UDivider :ui="{ border: { base: 'dark:border-gray-700' } }" />

      <div class="p-4 mt-auto">
        <UButton :to="localePath({ name: 'library-formations-id-edit', params: { id: documentId } })" color="orange" variant="soft" size="sm" class="w-full" leading-icon="i-heroicons-pencil" label="Modifier la formation" />
      </div>
    </div>

    <UModal v-model="open">
      <UCard :ui="{ footer: { base: 'flex items-center gap-2 justify-end' } }">
        <template #header>
          <div class="flex items-center justify-between gap-x-1.5">
            <p class="text-gray-900 dark:text-white font-semibold">Ajouter depuis la bibliothèque</p>
            <UButton icon="i-heroicons-x-mark" color="gray" variant="ghost" @click="open = false" />
          </div>
        </template>

        <UFormGroup label="Importer un chapitre">
          <UInputMenu
              v-model="selected"
              :search="search"
              label="Chapitre"
              :loading="loading"
              placeholder="Sélectionner un chapitre"
              :ui="{ wrapper: 'w-full' }"
              option-attribute="name"
              :search-lazy="true"
              by="id"
          />
        </UFormGroup>

        <UDivider label="Ou" class="mt-5 mb-4" />

        <UFormGroup label="Nom du chapitre">
          <UInput placeholder="Nom du chapitre" />
        </UFormGroup>

        <template #footer>
          <UButton label="Annuler" color="gray" variant="ghost" @click="open = false" />
          <UButton :loading="pending" type="submit" label="Enregistrer" color="black" />
        </template>
      </UCard>
    </UModal>
  </UDashboardPanelContent>
</template>
