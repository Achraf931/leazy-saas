<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Connexion',
  description: 'Connectez-vous à votre compte'
})

const route = useRoute()
const resetToken = route.query.reset as string | undefined
</script>

<template>
  <LoginForm :token="resetToken" />
</template>
