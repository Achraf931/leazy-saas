<script lang="ts" setup>
import { z } from 'zod'
import type { Form, FormSubmitEvent } from '#ui/types'

interface Props {
  formation?: { id: number, name: string, description: string }
  refresh?: () => void
}

const { post, patch } = useApi('formations')
const emit = defineEmits(['close'])
const localePath = useLocalePath()
const toast = useToast()
const pending = ref(false)
const { formation, refresh } = defineProps<Props>()
const schema = z.object({
  name: z.string().min(1, 'Le titre est requis.'),
  description: z.string().optional()
})

type Schema = z.output<typeof schema>

const form = ref<Form<Schema>>()
const state = reactive<Schema>({
  name: formation?.name || '',
  description: formation?.description || ''
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  pending.value = true
  form.value?.clear()
  const response = await (formation ? patch : post)(formation ? { ...event.data, id: formation.id } : { ...event.data })
  
  if (response) {
    toast.add({
      icon: 'i-heroicons-check-circle',
      title: formation ? 'Formation modifiée' : 'Formation créée',
      color: 'green'
    })
    
    pending.value = false
    emit('close')
    if (refresh) refresh()
    else return navigateTo(localePath({ name: 'library-formation-id', params: { id: response.id } }))
  } else pending.value = false
}
</script>

<template>
  <UModal :ui="{ width: 'sm:max-w-md' }" prevent-close>
    <UCard>
      <div class="flex items-start justify-between gap-x-1.5 pb-5">
        <p class="text-gray-900 dark:text-white font-semibold">{{
            `${formation ? 'Modifier' : 'Créer'} une formation`
          }}</p>
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
          <UInput
            v-model="state.name" autofocus name="name" placeholder="Ex. : Les bases du marketing digital" type="text"
          />
        </UFormGroup>
        
        <UFormGroup
          description="Courte description visible dans la liste des formations" hint="Optionnel" label="Description"
          name="description"
        >
          <UTextarea
            v-model="state.description"
            name="description"
            placeholder="Ex. : Apprenez les stratégies essentielles pour réussir dans le marketing digital et optimiser votre présence en ligne"
          />
        </UFormGroup>
        
        <div class="flex justify-end gap-3">
          <UButton color="gray" label="Annuler" variant="ghost" @click="emit('close')" />
          <UButton :label="formation ? 'Modifier' : 'Créer'" :loading="pending" color="black" type="submit" />
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>
