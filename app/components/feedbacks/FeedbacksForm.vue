<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent, Form } from '#ui/types'

const emit = defineEmits(['close'])
const schema = z.object({
  page: z.string().min(1, 'La page est requise.'),
  object: z.string().min(1, 'L\'objet est requis.'),
  content: z.string().min(1, 'Le contenu est requis.')
})

type Schema = z.output<typeof schema>

const pageSelected = ref('Accueil')
const form = ref<Form<Schema>>()
const state = reactive<Schema>({
  page: pageSelected.value || '',
  object: '',
  content: ''
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
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
    <UFormGroup label="Le problème se situe :" name="page" required>
      <USelectMenu label="Page" name="page" :options="['Accueil', 'Librairie', 'Leçon (éditeur)', 'Leçons', 'Chapitres', 'Thèmes', 'Mon compte']" v-model="pageSelected" />
    </UFormGroup>
    <UFormGroup label="Objet" name="object" required>
      <UInput v-model="state.object" name="object" placeholder="Ex.: Ma leçon ne se met pas à jour" autofocus />
    </UFormGroup>

    <UFormGroup label="Feedback" name="content" required>
      <UTextarea v-model="state.content" name="content" placeholder="Décrivez-nous le problème" />
    </UFormGroup>

    <div class="flex justify-end gap-3">
      <UButton label="Annuler" color="gray" variant="ghost" @click="emit('close')" />
      <UButton type="submit" label="Envoyer" color="black" />
    </div>
  </UForm>
</template>
