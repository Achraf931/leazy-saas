<script setup lang="ts">
import type { FormError } from '#ui/types'

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Connexion',
  description: 'Connectez-vous à votre compte'
})

const fields = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Entrez votre email',
    rules: 'required|email'
  },
  {
    name: 'password',
    type: 'password',
    label: 'Mot de passe',
    placeholder: 'Entrez votre mot de passe',
    rules: 'required'
  }
]

const validate = (state: any) => {
  const errors: FormError[] = []

  if (!state.email) errors.push({path: 'email', message: 'Veuillez entrer votre email'})

  if (!state.password) errors.push({path: 'password', message: 'Veuillez entrer votre mot de passe'})

  return errors
}

const providers = [
  {
    label: 'Google',
    icon: 'i-simple-icons-google',
    color: 'white' as const,
    click: () => console.log('Google')
  }
]

const onSubmit = (data: any) => {
  console.log('Envoyé', data)
}
</script>

<template>
  <UCard class="max-w-sm w-full">
    <UAuthForm
      :fields="fields"
      :validate="validate"
      :providers="providers"
      title="Welcome back!"
      align="top"
      icon="i-heroicons-lock-closed"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      @submit="onSubmit"
    >
      <template #password-hint>
        <NuxtLink to="/" class="text-primary font-medium">Mot de passe oublié ?</NuxtLink>
      </template>

      <template #footer>
        En vous connectant, vous acceptez nos
        <NuxtLink to="/" class="text-primary font-medium">Conditions d'utilisation</NuxtLink>
        et notre
        <NuxtLink to="/" class="text-primary font-medium">Politique de confidentialité</NuxtLink>
      </template>
    </UAuthForm>
  </UCard>
</template>
