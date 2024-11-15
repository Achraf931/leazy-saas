<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent, Form } from '#ui/types'

const emit = defineEmits(['close'])
const schema = z.object({
  title: z.string().min(1, 'Le titre est requis.'),
  description: z.string().min(1, 'La description est requise.')
})

type Schema = z.output<typeof schema>

const form = ref<Form<Schema>>()
const state = reactive<Schema>({
  title: '',
  description: ''
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  emit('close')
}
</script>

<template>
  <UForm
    ref="form"
    :schema="schema"
    :validate-on="['submit']"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormGroup label="Titre" name="title" required>
      <UInput v-model="state.title" name="title" placeholder="Ex.: La possibilité de changer le thème" autofocus />
    </UFormGroup>

    <UFormGroup label="Description" name="description" required>
      <UTextarea v-model="state.description" name="description" placeholder="Décrivez-nous la fonctionnalité" />
    </UFormGroup>

    <div class="flex justify-end gap-3">
      <UButton label="Annuler" color="gray" variant="ghost" @click="emit('close')" />
      <UButton type="submit" label="Envoyer" color="black" />
    </div>
  </UForm>
</template>
