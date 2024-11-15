<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent, Form } from '#ui/types'

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
  const response = await (lesson ? patch : post)(lesson ? { ...event.data, id: lesson.id } : { ...event.data, content: '{}', level_id: 1 })

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
  <UModal prevent-close :ui="{ width: 'sm:max-w-md' }">
    <UCard>
      <div class="flex items-start justify-between gap-x-1.5 pb-5">
        <p class="text-gray-900 dark:text-white font-semibold">{{ `${lesson ? 'Modifier' : 'Créer'} une leçon` }}</p>
        <UButton icon="i-heroicons-x-mark" color="gray" variant="ghost" @click="emit('close')" />
      </div>
      <UForm
        ref="form"
        class="space-y-4"
        :schema="schema"
        :state="state"
        @submit="onSubmit"
      >
        <UFormGroup label="Titre" name="name" required>
          <UInput type="text" name="name" placeholder="Ex. : Technique de base en SEO" autofocus v-model="state.name" />
        </UFormGroup>

        <UFormGroup label="Description" name="description" hint="Optionnel">
          <UTextarea
            v-model="state.description"
            name="description"
            placeholder="Ex. : Apprenez les bases du SEO pour optimiser la visibilité de vos contenus sur les moteurs de recherche"
          />
        </UFormGroup>

        <div class="flex justify-end gap-3">
          <UButton label="Annuler" color="gray" variant="ghost" @click="emit('close')" />
          <UButton :loading="pending" type="submit" :label="lesson ? 'Modifier' : 'Créer'" color="black" />
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>
