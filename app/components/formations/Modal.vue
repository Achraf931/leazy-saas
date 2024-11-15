<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent, Form } from '#ui/types'

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
    toast.add({ icon: 'i-heroicons-check-circle', title: formation ? 'Formation modifiée' : 'Formation créée', color: 'green' })

    pending.value = false
    emit('close')
    if (refresh) refresh()
    else return navigateTo(localePath({ name: 'library-formation-id', params: { id: response.id } }))
  } else pending.value = false
}
</script>

<template>
  <UModal prevent-close :ui="{ width: 'sm:max-w-md' }">
    <UCard>
      <div class="flex items-start justify-between gap-x-1.5 pb-5">
        <p class="text-gray-900 dark:text-white font-semibold">{{ `${formation ? 'Modifier' : 'Créer'} une formation` }}</p>
        <UButton icon="i-heroicons-x-mark" color="gray" variant="ghost" @click="emit('close')" />
      </div>
      <UForm
        ref="form"
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Titre" name="name" required>
          <UInput type="text" name="name" placeholder="Ex. : Les bases du marketing digital" autofocus v-model="state.name" />
        </UFormGroup>

        <UFormGroup label="Description" name="description" description="Courte description visible dans la liste des formations" hint="Optionnel">
          <UTextarea name="description" placeholder="Ex. : Apprenez les stratégies essentielles pour réussir dans le marketing digital et optimiser votre présence en ligne" v-model="state.description" />
        </UFormGroup>

        <div class="flex justify-end gap-3">
          <UButton label="Annuler" color="gray" variant="ghost" @click="emit('close')" />
          <UButton :loading="pending" type="submit" :label="formation ? 'Modifier' : 'Créer'" color="black" />
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>
