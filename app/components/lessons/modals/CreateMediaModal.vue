<script setup lang="ts">
import { isEmpty } from 'lodash-unified'
import { z } from 'zod'
import type { FormSubmitEvent, Form } from '#ui/types'

interface Props {
  media?: { id: string, title: string, description: string, image: string, url: string }
}

const { post, patch } = useApi('media')
const documentId = computed(() => useRoute().params.id)
const toast = useToast()
const pending = ref(false)
const loading = ref(false)
const props = defineProps<Props>()
const schema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Le titre est requis.'),
  description: z.string().min(1, 'La description est requise.'),
  image: z.string().optional(),
  url: z.string().min(1, 'L\'URL est requise.').url('L\'URL n\'est pas valide')
})
const media = useModel(props, 'media')

type Schema = z.output<typeof schema>

const form = ref<Form<Schema>>()
let state = reactive<Schema>({
  id: media.value.id || '',
  title: media.value.title || '',
  description: media.value.description || '',
  image: media.value.image || '',
  url: media.value.url || ''
})

const emit = defineEmits(['submited', 'close'])

const isValidUrl = (url) => {
  const urlRegex = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i

  return urlRegex.test(url)
}

const handleMedia = async (event: FormSubmitEvent<Schema>) => {
  if (!event.data) return
  const media = event.data
  loading.value = true
  form.value?.clear()

  const response = await (media.id ? patch : post)({
    lesson_id: documentId.value,
    title: media.title,
    description: media.description,
    image: media.image,
    url: media.url,
    type: 'link',
    ...(media.id && { id: media.id })
  }, 'media')

  if (response) {
    emit('submited', response)
    toast.add({ icon: 'i-heroicons-check-circle', title: `Média ${media.id ? 'modifié' : 'ajouté'} avec succès`, color: 'green' })
    loading.value = false
    return emit('close')
  }

  toast.add({ icon: 'i-heroicons-x-circle', title: 'Erreur lors de l\'ajout du média', color: 'red' })
  return loading.value = false
}

const autoFill = async () => {
  pending.value = true
  form.value?.clear()
  const data = await $fetch('/api/opengraph', {
    method: 'POST',
    body: {
      url: state.url
    }
  })

  if (data) {
    state.image = data.image || state.image
    state.title = data.title || data.site_title || data.site_name || state.title
    state.description = data.description || data.site_description || state.description
    return pending.value = false
  }

  toast.add({ icon: 'i-heroicons-x-circle', title: 'Erreur lors de la récupération des métadonnées', color: 'red' })
  return pending.value = false
}
</script>

<template>
  <UModal>
    <UForm
      ref="form"
      :schema="schema"
      :state="state"
      class="p-4"
      @submit="handleMedia"
    >
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
        <UFormGroup name="image" label="Image" hint="Optionnel">
          <NuxtImg v-if="!isEmpty(state.image)" class="rounded-lg w-full aspect-video object-cover" :src="state.image" :alt="state.title" />
          <UInput v-model="state.image" name="image" placeholder="URL de l'image" class="mt-1" />
        </UFormGroup>
        <UFormGroup label="Titre" name="title">
          <UInput v-model="state.title" name="title" placeholder="Titre du média" />
        </UFormGroup>
        <UFormGroup label="Description" name="description">
          <UTextarea v-model="state.description" name="description" placeholder="Courte description du média" />
        </UFormGroup>
        <UFormGroup label="URL" name="url">
          <UInput v-model="state.url" name="url" placeholder="https://blog.leazy.net" />
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
