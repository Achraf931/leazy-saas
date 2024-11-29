<script lang="ts" setup>
import { z } from 'zod'
import type { Form, FormSubmitEvent } from '#ui/types'

const emit = defineEmits(['close'])

const schema = z.object({
  email: z.string().email('L\'email est invalide.'),
  role: z.enum(['enseignant', 'élève'])
})

type Schema = z.output<typeof schema>

const form = ref<Form<Schema>>()
const state = reactive<Schema>({
  role: 'élève',
  email: undefined
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  form.value?.clear()
  // Do something with data
  console.log(event.data)
  
  emit('close')
}
</script>

<template>
  <UModal :ui="{ width: 'sm:max-w-md' }">
    <UCard>
      <div class="flex items-start justify-between gap-x-1.5 pb-4">
        <div class="flex items-start gap-4">
          <div>
            <p class="text-gray-900 dark:text-white font-semibold">Ajouter un élève</p>
            <p class="mt-1 text-gray-500 dark:text-gray-400 text-sm">Ajouter de nouveaux élèves par email</p>
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
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" autofocus name="email" placeholder="john.doe@example.com" type="email" />
        </UFormGroup>
        
        <UFormGroup label="Role" name="role">
          <USelectMenu
            v-model="state.role" :options="['enseignant', 'élève']"
            :ui-menu="{ select: 'capitalize', option: { base: 'capitalize' } }"
            name="role"
          />
        </UFormGroup>
        
        <div class="flex justify-end gap-3">
          <UButton color="gray" label="Cancel" variant="ghost" @click="emit('close')" />
          <UButton color="black" label="Save" type="submit" />
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>
