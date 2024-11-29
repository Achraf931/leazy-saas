<script lang="ts" setup>
import { isEmpty } from 'lodash-unified'
import { z } from 'zod'
import type { Form, FormSubmitEvent } from '#ui/types'

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
    toast.add({
      icon: 'i-heroicons-check-circle',
      title: chapter ? 'Chapitre modifié' : 'Chapitre créé',
      color: 'green'
    })
    
    pending.value = false
    emit('close')
    if (refresh) refresh()
    else return navigateTo(localePath({ name: 'library-chapters' }))
  } else pending.value = false
}
</script>

<template>
  <UModal :ui="{ width: 'sm:max-w-md' }" prevent-close>
    <UCard>
      <div class="flex items-start justify-between gap-x-1.5 pb-5">
        <p class="text-gray-900 dark:text-white font-semibold">{{ `${chapter ? 'Modifier' : 'Créer'} un chapitre` }}</p>
        <UButton color="gray" icon="i-heroicons-x-mark" variant="ghost" @click="emit('close')" />
      </div>
      <UForm
        ref="form"
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Titre" name="name" required>
          <UInput v-model="state.name" autofocus name="name" placeholder="Ex. : Fondamentaux du SEO" type="text" />
        </UFormGroup>
        
        <UFormGroup hint="Optionnel" label="Description" name="description">
          <UTextarea
            v-model="state.description"
            name="description"
            placeholder="Ex. : Apprenez les premières étapes du SEO à travers plusieurs leçons pratiques"
          />
        </UFormGroup>
        
        <UFormGroup hint="Optionnel" label="Image" name="image">
          <NuxtImg
            v-if="!isEmpty(state.image)" :src="state.image" class="w-full aspect-video rounded-lg mb-2" fit="cover"
            placeholder
          />
          <UInput v-model="state.image" name="image" placeholder="URL de l'image" type="text" />
        </UFormGroup>
        
        <UFormGroup label="Thème associé" name="theme_id" required>
          <USelectMenu
            v-model="state.theme_id"
            :loading="loading"
            :searchable="searchable"
            class="w-full"
            name="theme_id"
            option-attribute="name"
            placeholder="Sélectionner un thème"
            searchable-placeholder="Rechercher un thème"
            value-attribute="id"
          />
        </UFormGroup>
        
        <div class="flex justify-end gap-3">
          <UButton color="gray" label="Annuler" variant="ghost" @click="emit('close')" />
          <UButton :label="chapter ? 'Modifier' : 'Créer'" :loading="pending" color="black" type="submit" />
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>
