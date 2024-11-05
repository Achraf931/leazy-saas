<script setup lang="ts">
const { get, post, patch } = useApi('chapters')
const emit = defineEmits(['close'])
const localePath = useLocalePath()
const toast = useToast()
const loading = ref(false)
const pending = ref(false)
const selected = ref([])
const { chapter, refresh } = defineProps({
  chapter: {
    type: Object,
    required: false
  },
  refresh: {
    type: Function,
    required: false
  }
})

const fields = reactive({
  name: chapter?.name || '',
  description: chapter?.description || '',
  theme_id: 1,
  image: chapter?.image || 'https://designshack.net/wp-content/uploads/placeholder-image-368x247.png'
})

const validate = (state) => {
  const errors = []

  if (!state.name) errors.push({ path: 'name', message: 'Le titre est requis' })
  if (!state.theme_id) errors.push({ path: 'theme_id', message: 'Le thème est requis' })

  return errors
}

const searchable = async (q: string) => {
  loading.value = true

  const themes: any[] = await get(null, { q }, 'themes')

  loading.value = false

  return 'data' in themes ? themes.data : themes
}

const onSubmit = async (state) => {
  pending.value = true
  const response = await (chapter ? patch : post)(chapter ? { ...state.data, id: chapter.id } : state.data)

  if (response) {
    toast.add({ icon: 'i-heroicons-check-circle', title: chapter ? 'Chapitre modifié' : 'Chapitre créé', color: 'green' })

    pending.value = false
    emit('close')
    if (refresh) refresh()
    else return navigateTo(localePath({ name: 'library-chapters' }))
  } else pending.value = false
}

const onError = () => {
  fields.image = 'https://designshack.net/wp-content/uploads/placeholder-image-368x247.png'
}
</script>

<template>
  <UModal prevent-close :ui="{ width: 'sm:max-w-md' }">
    <UCard>
      <div class="flex items-start justify-between gap-x-1.5 pb-5">
        <p class="text-gray-900 dark:text-white font-semibold">{{ `${chapter ? 'Modifier' : 'Créer'} un chapitre` }}</p>
        <UButton icon="i-heroicons-x-mark" color="gray" variant="ghost" @click="emit('close')" />
      </div>
      <UForm class="space-y-4" :state="fields" :validate="validate" @submit="onSubmit">
        <UFormGroup label="Titre" name="name" required>
          <UInput type="text" placeholder="Titre du chapitre" autofocus v-model="fields.name" />
        </UFormGroup>

        <UFormGroup label="Description" name="description" hint="Optionnel">
          <UTextarea placeholder="Description du chapitre" v-model="fields.description" />
        </UFormGroup>

        <UFormGroup label="Image" name="image" hint="Optionnel">
          <NuxtImg :src="fields.image" fit="cover" class="w-full aspect-video rounded-lg mb-2" @error="onError" />
          <UInput type="text" placeholder="URL de l'image" v-model="fields.image" />
        </UFormGroup>

        <UFormGroup label="Thème associé" required>
          <USelectMenu
            v-model="selected"
            :loading="loading"
            :searchable="searchable"
            searchable-placeholder="Rechercher un thème"
            class="w-full"
            placeholder="Sélectionner un thème"
            option-attribute="name"
            by="id"
          />
        </UFormGroup>

        <div class="flex justify-end gap-3">
          <UButton label="Annuler" color="gray" variant="ghost" @click="emit('close')" />
          <UButton :loading="pending" type="submit" :label="chapter ? 'Modifier' : 'Créer'" color="black" />
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>
