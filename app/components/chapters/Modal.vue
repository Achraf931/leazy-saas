<script setup lang="ts">
const { get, post, patch } = useApi('chapters')
const emit = defineEmits(['close'])
const localePath = useLocalePath()
const toast = useToast()
const pending = ref(false)
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
  theme_id: 1,
  image: 'https://imgproxy.services.pitch.com/_/resizing_type:fit/plain/pitch-publish-user-assets/templates/posters/moodboard.jpg'
})

const validate = (state) => {
  const errors = []

  if (!state.name) errors.push({ path: 'name', message: 'Le titre est requis' })

  return errors
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
</script>

<template>
  <UModal prevent-close :ui="{ width: 'sm:max-w-md' }">
    <UCard>
      <div class="flex items-start justify-between gap-x-1.5 pb-5">
        <p class="text-gray-900 dark:text-white font-semibold">{{ `${chapter ? 'Modifier' : 'Créer'} un chapitre` }}</p>
        <UButton icon="i-heroicons-x-mark" color="gray" variant="ghost" @click="emit('close')" />
      </div>
      <UForm class="space-y-4" :state="fields" :validate="validate" @submit="onSubmit">
        <UFormGroup label="Titre" name="name">
          <UInput type="text" placeholder="Titre du chapitre" autofocus v-model="fields.name" />
        </UFormGroup>

        <UFormGroup label="Image" name="image">
          <UInput type="text" placeholder="URL de l'image" v-model="fields.image" />
        </UFormGroup>

        <div class="flex justify-end gap-3">
          <UButton label="Annuler" color="gray" variant="ghost" @click="emit('close')" />
          <UButton :loading="pending" type="submit" :label="chapter ? 'Modifier' : 'Créer'" color="black" />
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>