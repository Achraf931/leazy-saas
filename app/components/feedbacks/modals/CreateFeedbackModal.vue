<script lang="ts" setup>
import { z } from 'zod'
import type { Form, FormSubmitEvent } from '#ui/types'

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
  <UModal :ui="{ width: 'sm:max-w-md' }">
    <UCard>
      <div class="flex items-start justify-between gap-x-1.5 pb-4">
        <div class="flex items-start gap-4">
          <div>
            <p class="text-gray-900 dark:text-white font-semibold">Nouveau feedback</p>
            <p class="mt-1 text-gray-500 dark:text-gray-400 text-sm">Signalez-nous un problème rencontré</p>
          </div>
        </div>
        <UButton icon="i-heroicons-x-mark" color="gray" variant="ghost" @click="emit('close')"/>
      </div>
      <UForm
        ref="form"
        :schema="schema"
        :state="state"
        :validate-on="['submit']"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Le problème se situe :" name="page" required>
          <USelectMenu
            v-model="pageSelected"
            :options="['Accueil', 'Librairie', 'Leçon (éditeur)', 'Leçons', 'Chapitres', 'Thèmes', 'Mon compte']"
            label="Page"
            name="page"
          />
        </UFormGroup>
        <UFormGroup label="Objet" name="object" required>
          <UInput v-model="state.object" autofocus name="object" placeholder="Ex.: Ma leçon ne se met pas à jour" />
        </UFormGroup>
        
        <UFormGroup label="Feedback" name="content" required>
          <UTextarea v-model="state.content" name="content" placeholder="Décrivez-nous le problème" />
        </UFormGroup>
        
        <div class="flex justify-end gap-3">
          <UButton color="gray" label="Annuler" variant="ghost" @click="emit('close')" />
          <UButton color="black" label="Envoyer" type="submit" />
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>
