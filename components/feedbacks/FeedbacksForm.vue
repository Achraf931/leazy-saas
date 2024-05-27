<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const emit = defineEmits(['close'])

const state = reactive({
  object: undefined,
  content: undefined
})

const pageSelected = ref('Accueil')

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.object) errors.push({ path: 'object', message: 'Veuillez saisir un objet.' })
  if (!state.content) errors.push({ path: 'content', message: 'Veuillez saisir une description.' })
  return errors
}

async function onSubmit (event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data)

  emit('close')
}
</script>

<template>
  <UForm :validate="validate" :validate-on="['submit']" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Le problème se situe :" name="page">
      <USelectMenu label="Page" :options="['Accueil', 'Librairie', 'Leçon (éditeur)', 'Leçons', 'Chapitres', 'Thèmes', 'Mon compte']" v-model="pageSelected" />
    </UFormGroup>
    <UFormGroup label="Objet" name="object">
      <UInput v-model="state.object" placeholder="Ex.: Ma leçon ne se met pas à jour" autofocus />
    </UFormGroup>

    <UFormGroup label="Feedback" name="content">
      <UTextarea v-model="state.content" placeholder="Décrivez-nous le problème" />
    </UFormGroup>

    <div class="flex justify-end gap-3">
      <UButton label="Annuler" color="gray" variant="ghost" @click="emit('close')" />
      <UButton type="submit" label="Envoyer" color="black" />
    </div>
  </UForm>
</template>
