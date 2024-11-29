<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent, Form } from '#ui/types'

interface Props {
  loading: boolean
}

defineProps<Props>()
const emit = defineEmits(['close', 'create'])

const schema = z.object({
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères.'),
  description: z.string().optional()
})

type Schema = z.output<typeof schema>

const form = ref<Form<Schema>>()
const state = reactive<Schema>({
  title: '',
  description: ''
})

const onSubmit = (event: FormSubmitEvent<Schema>) => {
  form.value?.clear()
  emit('create', event.data)
}
</script>

<template>
  <UModal prevent-close :ui="{ width: 'sm:max-w-md' }">
    <UCard>
      <div class="flex items-start justify-between gap-x-1.5 pb-5">
        <p class="text-gray-900 dark:text-white font-semibold">Nouvelle tâche</p>
        <UButton icon="i-heroicons-x-mark" color="gray" variant="ghost" @click="emit('close')" />
      </div>
      <UForm
        ref="form"
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Titre" name="title" required>
          <UInput
            v-model="state.title"
            type="text"
            name="title"
            placeholder="Ex. : Préparer le contenu du prochain article"
            autofocus
          />
        </UFormGroup>

        <UFormGroup label="Description" name="description" hint="Optionnel">
          <UTextarea
            v-model="state.description"
            name="description"
            placeholder="Ex. : Rechercher des idées, rédiger le brouillon, etc."
          />
        </UFormGroup>

        <div class="flex justify-end gap-3">
          <UButton label="Annuler" color="gray" variant="ghost" @click="emit('close')" />
          <UButton :loading="loading" type="submit" label="Créer" color="black" />
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>
