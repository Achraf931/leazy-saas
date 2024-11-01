<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
import { isEmpty } from 'lodash'

const { post, patch } = useApi('media')
const documentId = computed(() => useRoute().params.id)
const toast = useToast()
const pending = ref(false)
const loading =ref(false)
const props = defineProps({
  media: {
    type: Object,
    default: () => ({
      id: '',
      title: '',
      description: '',
      image: '',
      url: ''
    })
  }
})

const media = useModel(props, 'media')

let state = reactive({
  id: media.value.id || '',
  title: media.value.title,
  description: media.value.description,
  image: media.value.image,
  url: media.value.url
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.title) errors.push({ path: 'title', message: 'Le titre est requis' })
  if (!state.description) errors.push({ path: 'description', message: 'La description est requise' })
  if (!state.image) errors.push({ path: 'image', message: 'L\'image est requise' })
  if (!state.url) errors.push({ path: 'url', message: 'L\'URL est requise' })
  return errors
}

const emit = defineEmits(['submited', 'close'])

const isValidUrl = (url) => {
  const urlRegex = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i

  return urlRegex.test(url)
}

const handleMedia = async (event: FormSubmitEvent<any>) => {
  if (!event.data) return
  const media = event.data
  loading.value = true

  const response = await (media.id ? patch : post)({
    lesson_id: documentId.value,
    title: media.title,
    description: media.description,
    image: media.image,
    url: media.url,
    type: 'link'
  }, 'media')

  if (response) {
    emit('submited', response)
    toast.add({ icon: 'i-heroicons-check-circle', title: 'Média ajouté avec succès', color: 'green' })
    loading.value = false
    return emit('close')
  }

  toast.add({ icon: 'i-heroicons-x-circle', title: 'Erreur lors de l\'ajout du média', color: 'red' })
  return loading.value = false
}

const autoFill = async () => {
  pending.value = true
  const data = await $fetch('/api/opengraph', {
    method: 'POST',
    body: {
      url: state.url
    }
  })

  if (data) {
    state.image = data.image || state.image,
    state.title = data.title || data.site_title || data.site_name || state.title,
    state.description = data.description || data.site_description || state.description
    return pending.value = false
  }

  toast.add({ icon: 'i-heroicons-x-circle', title: 'Erreur lors de la récupération des métadonnées', color: 'red' })
  return pending.value = false
}
</script>

<template>
  <UModal>
    <UForm class="p-4" @submit="handleMedia" :validate :state>
      <div class="flex items-start justify-between gap-x-1.5 mb-5">
        <div>
          <p class="text-gray-900 dark:text-white font-semibold">
            {{ state.id ? 'Modifier' : 'Créer' }} un média
          </p>
          <p class="mt-1 text-gray-500 dark:text-gray-400 text-sm">
            {{ state.id ? 'Modifiez' : 'Créez' }} le lien dans la zone de texte ci-dessous.
          </p>
        </div>
        <UButton icon="i-heroicons-x-mark" color="gray" variant="ghost" @click="emit('close')" />
      </div>

      <div class="flex flex-col gap-2">
        <UFormGroup name="image" label="Image">
          <NuxtImg v-if="!isEmpty(state.image)" class="rounded-lg w-full aspect-video object-cover" :src="state.image" :alt="state.title" />
          <UInput v-model="state.image" placeholder="URL de l'image" class="mt-1" />
        </UFormGroup>
        <UFormGroup label="Titre" name="title">
          <UInput v-model="state.title" placeholder="Titre du média" />
        </UFormGroup>
        <UFormGroup label="Description" name="description">
          <UTextarea v-model="state.description" placeholder="Courte description du média" />
        </UFormGroup>
        <UFormGroup label="URL" name="url">
          <UInput v-model="state.url" placeholder="https://blog.leazy.net" />
        </UFormGroup>
      </div>

      <div class="mt-5 flex items-center justify-between gap-2">
        <UTooltip text="Remplir les champs automatiquement à partir de l'URL" :popper="{ placement: 'top' }">
          <UButton :disabled="isEmpty(state.url) || !isValidUrl(state.url)" label="Remplir automatiquement" icon="i-heroicons-sparkles" :loading="pending" variant="ghost" color="gray" @click="autoFill" />
        </UTooltip>
        <div class="flex items-center justify-end gap-2">
          <UButton label="Annuler" variant="white" @click="emit('close')" />
          <UButton :label="state.id ? 'Modifier' : 'Créer'" :loading type="submit" />
        </div>
      </div>
    </UForm>
  </UModal>
</template>