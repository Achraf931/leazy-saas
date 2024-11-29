<script lang="ts" setup>
import { z } from 'zod'
import type { Form, FormSubmitEvent } from '#ui/types'

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
  <UModal :ui="{ width: 'sm:max-w-md' }">
    <UCard>
      <div class="flex items-start justify-between gap-x-1.5 pb-4">
        <div class="flex items-start gap-4">
          <div>
            <p class="text-gray-900 dark:text-white font-semibold">Suggérer une fonctionnalité</p>
            <p class="mt-1 text-gray-500 dark:text-gray-400 text-sm">
              Vous aimeriez voir certaines fonctionnalités sur Leazy ?
              <br />
              Dites-le nous !
            </p>
          </div>
        </div>
        <UButton color="gray" icon="i-heroicons-x-mark" variant="ghost" @click="emit('close')" />
      </div>
      
      <UForm
        ref="form"
        :schema="schema"
        :state="state"
        :validate-on="['submit']"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Titre" name="title" required>
          <UInput v-model="state.title" autofocus name="title" placeholder="Ex.: La possibilité de changer le thème" />
        </UFormGroup>
        
        <UFormGroup label="Description" name="description" required>
          <UTextarea v-model="state.description" name="description" placeholder="Décrivez-nous la fonctionnalité" />
        </UFormGroup>
        
        <div class="flex justify-end gap-3">
          <UButton color="gray" label="Annuler" variant="ghost" @click="emit('close')" />
          <UButton color="black" label="Envoyer" type="submit" />
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>
