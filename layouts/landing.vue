<script setup lang="ts">
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'fr'
  }
})
</script>

<template>
  <LandingHeader />

  <UMain>
    <NuxtPage />
  </UMain>

  <LandingFooter />
</template>
