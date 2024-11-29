<script lang="ts" setup>
import { z } from 'zod'
import type { Form, FormSubmitEvent } from '#ui/types'

interface Props {
  token?: string
}

const props = defineProps<Props>()

const toast = useToast()
const { login } = useSanctumAuth()

const schema = z.object({
  email: z.string().email('Veuillez saisir une adresse e-mail valide.'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères.'),
  remember_me: z.boolean()
})

type Schema = z.output<typeof schema>

const form = ref<Form<Schema>>()
const state = reactive<Schema>({
  email: '',
  password: '',
  remember_me: false
})

const loading = ref(false)

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  loading.value = true
  
  form.value?.clear()
  
  try {
    await login(event.data)
  } catch {
    toast.add({
      title: 'Erreur lors de la connexion',
      description: 'Veuillez vérifier vos informations de connexion.',
      color: 'red'
    })
  }
  
  loading.value = false
}
</script>

<template>
  <UCard class="w-full max-w-sm">
    <UForm
      ref="form"
      :schema="schema"
      :state="state"
      class="space-y-6"
      @submit="onSubmit"
    >
      <div class="text-center">
        <UIcon class="w-8 h-8 mb-2" name="i-heroicons-lock-closed" />
        <h2 class="text-2xl text-gray-900 dark:text-white font-bold">Welcome back!</h2>
      </div>
      <span
        v-if="props.token"
        class="text-sm text-green-500"
      >
        Your password has been reset!
      </span>
      
      <UFormGroup label="E-mail" name="email">
        <UInput
          v-model="state.email"
          autocomplete="username"
          icon="i-heroicons-at-symbol"
          trailing
        />
      </UFormGroup>
      
      <UFormGroup label="Mot de passe" name="password">
        <template #hint>
          <NuxtLinkLocale class="text-sm text-primary" to="/">
            Mot de passe oublié ?
          </NuxtLinkLocale>
        </template>
        
        <UInput
          v-model="state.password"
          autocomplete="current-password"
          icon="i-heroicons-eye"
          trailing
          type="password"
        />
      </UFormGroup>
      
      <UFormGroup name="remember_me">
        <UCheckbox v-model="state.remember_me" label="Se souvenir de moi" name="remember_me" />
      </UFormGroup>
      
      <UButton :loading="loading" block type="submit">
        Me connecter
      </UButton>
      
      <div class="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
        En vous connectant, vous acceptez nos
        <NuxtLinkLocale class="text-primary" to="/">Conditions d'utilisation</NuxtLinkLocale>
        et notre
        <NuxtLinkLocale class="text-primary" to="/">Politique de confidentialité</NuxtLinkLocale>
        .
      </div>
    </UForm>
  </UCard>
</template>
