<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const emit = defineEmits(['close'])

const state = reactive({
  title: undefined,
  description: undefined
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.title) errors.push({ path: 'title', message: 'Veuillez saisir un titre.' })
  if (!state.description) errors.push({ path: 'description', message: 'Veuillez saisir une description.' })
  return errors
}

async function onSubmit (event: FormSubmitEvent<any>) {
  // Do something with data
  emit('close')
}
</script>

<template>
  <UForm :validate="validate" :validate-on="['submit']" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Titre" name="title">
      <UInput v-model="state.title" placeholder="Ex.: La possibilité de changer le thème" autofocus />
    </UFormGroup>

    <UFormGroup label="Description" name="description">
      <UTextarea v-model="state.description" placeholder="Décrivez-nous la fonctionnalité" />
    </UFormGroup>

    <div class="flex justify-end gap-3">
      <UButton label="Annuler" color="gray" variant="ghost" @click="emit('close')" />
      <UButton type="submit" label="Envoyer" color="black" />
    </div>
  </UForm>
</template>
