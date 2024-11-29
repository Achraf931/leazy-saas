<script lang="ts" setup>
import { z } from 'zod'
import type { Form, FormSubmitEvent } from '#ui/types'

interface Props {
  lesson?: { id: number, name: string, description: string }
  refresh?: () => void
}

const { post, patch } = useApi('lessons')
const emit = defineEmits(['close'])
const localePath = useLocalePath()
const toast = useToast()
const pending = ref(false)
const { lesson, refresh } = defineProps<Props>()
const schema = z.object({
  name: z.string().min(1, 'Le titre est requis.'),
  description: z.string().optional()
})

type Schema = z.output<typeof schema>

const form = ref<Form<Schema>>()
const state = reactive<Schema>({
  name: lesson?.name || '',
  description: lesson?.description || ''
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  pending.value = true
  form.value?.clear()
  const response = await (lesson ? patch : post)(lesson ? { ...event.data, id: lesson.id } : {
    ...event.data,
    content: '{}',
    level_id: 1
  })
  
  if (response) {
    toast.add({ icon: 'i-heroicons-check-circle', title: lesson ? 'Leçon modifiée' : 'Leçon créée', color: 'green' })
    
    pending.value = false
    emit('close')
    if (refresh) refresh()
    else return navigateTo(localePath({ name: 'lesson_id', params: { id: response.id } }))
  } else pending.value = false
}
</script>

<template>
  <UModal :ui="{ width: 'sm:max-w-md' }" prevent-close>
    <UCard>
      <div class="flex items-start justify-between gap-x-1.5 pb-5">
        <p class="text-gray-900 dark:text-white font-semibold">{{ `${lesson ? 'Modifier' : 'Créer'} une leçon` }}</p>
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
          <UInput v-model="state.name" autofocus name="name" placeholder="Ex. : Technique de base en SEO" type="text" />
        </UFormGroup>
        
        <UFormGroup hint="Optionnel" label="Description" name="description">
          <UTextarea
            v-model="state.description"
            name="description"
            placeholder="Ex. : Apprenez les bases du SEO pour optimiser la visibilité de vos contenus sur les moteurs de recherche"
          />
        </UFormGroup>
        
        <div class="flex justify-end gap-3">
          <UButton color="gray" label="Annuler" variant="ghost" @click="emit('close')" />
          <UButton :label="lesson ? 'Modifier' : 'Créer'" :loading="pending" color="black" type="submit" />
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>
