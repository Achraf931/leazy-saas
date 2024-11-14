<script setup lang="ts">
import { isEmpty } from 'lodash-unified'
import { z } from 'zod'
import type { FormSubmitEvent, Form } from '#ui/types'

interface Props {
  chapter?: { id: number, name: string, description: string, image: string, theme_id?: number | null }
  refresh?: () => void
}

const { get, post, patch } = useApi('chapters')
const emit = defineEmits(['close'])
const localePath = useLocalePath()
const toast = useToast()
const loading = ref(false)
const pending = ref(false)
const { chapter, refresh } = defineProps<Props>()
const schema = z.object({
  name: z.string().min(1, 'Le titre est requis.'),
  description: z.string().optional(),
  theme_id: z.any().refine(option => option?.id !== null, { message: 'Le thème est requis.' }),
  image: z.string().optional()
})

type Schema = z.output<typeof schema>

const form = ref<Form<Schema>>()
const state = reactive<Schema>({
  name: chapter?.name || '',
  description: chapter?.description || '',
  theme_id: chapter?.theme_id || null,
  image: chapter?.image || 'https://designshack.net/wp-content/uploads/placeholder-image-368x247.png'
})

const searchable = async (q: string) => {
  loading.value = true

  const themes: any[] = await get(null, { q }, 'themes')

  loading.value = false

  return 'data' in themes ? themes.data : themes
}

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  pending.value = true
  form.value?.clear()
  const response = await (chapter ? patch : post)(chapter ? { ...event.data, id: chapter.id } : event.data)

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
      <UForm
        ref="form"
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Titre" name="name" required>
          <UInput type="text" name="name" placeholder="Ex. : Fondamentaux du SEO" autofocus v-model="state.name" />
        </UFormGroup>

        <UFormGroup label="Description" name="description" hint="Optionnel">
          <UTextarea name="description" placeholder="Ex. : Apprenez les premières étapes du SEO à travers plusieurs leçons pratiques" v-model="state.description" />
        </UFormGroup>

        <UFormGroup label="Image" name="image" hint="Optionnel">
          <NuxtImg v-if="!isEmpty(state.image)" placeholder :src="state.image" fit="cover" class="w-full aspect-video rounded-lg mb-2" />
          <UInput type="text" name="image" placeholder="URL de l'image" v-model="state.image" />
        </UFormGroup>

        <UFormGroup label="Thème associé" name="theme_id" required>
          <USelectMenu
            v-model="state.theme_id"
            :loading="loading"
            :searchable="searchable"
            searchable-placeholder="Rechercher un thème"
            class="w-full"
            name="theme_id"
            placeholder="Sélectionner un thème"
            option-attribute="name"
            value-attribute="id"
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
