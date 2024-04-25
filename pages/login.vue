<script setup lang="ts">
import type { FormError } from '#ui/types'

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Connexion',
  description: 'Connectez-vous à votre compte'
})

const { login } = useSanctumAuth()

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
  },
  {
    name: 'remember_me',
    type: 'checkbox',
    label: 'Se souvenir de moi'
  }
]

const validate = (state: any) => {
  const errors: FormError[] = []

  if (!state.email) errors.push({path: 'email', message: 'Veuillez entrer votre email.'})

  if (!state.password) errors.push({path: 'password', message: 'Veuillez entrer votre mot de passe.'})

  return errors
}

const onSubmit = async (data: any) => {
  await login({ ...data, remember_me: true })
}
</script>

<template>
  <UCard class="max-w-sm w-full">
    <UAuthForm
      :fields="fields"
      :validate="validate"
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
