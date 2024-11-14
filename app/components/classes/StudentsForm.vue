<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent, Form } from '#ui/types'

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
  <UForm
    ref="form"
    :schema="schema"
    :state="state"
    :validate-on="['submit']"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" name="email" type="email" placeholder="john.doe@example.com" autofocus />
    </UFormGroup>

    <UFormGroup label="Role" name="role">
      <USelectMenu v-model="state.role" name="role" :options="['enseignant', 'élève']" :ui-menu="{ select: 'capitalize', option: { base: 'capitalize' } }" />
    </UFormGroup>

    <div class="flex justify-end gap-3">
      <UButton label="Cancel" color="gray" variant="ghost" @click="emit('close')" />
      <UButton type="submit" label="Save" color="black" />
    </div>
  </UForm>
</template>
