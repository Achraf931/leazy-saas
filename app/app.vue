<script setup lang="ts">
useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'fr'
  }
})

const title = 'Leazy, bientôt dans vos écoles !'
const description = 'Rejoignez Leazy, la plateforme éducative pensée pour les enseignants. Libérez votre potentiel pédagogique, collaborez avec vos pairs et façonnez ensemble l\'avenir de l\'enseignement.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: '/logo-leazy-plein.png',
  twitterImage: '/logo-leazy-plein.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UNotifications />
    <UModals />
    <USlideovers />
  </div>
</template>

<style>
@import "../../../leazy-editor/app/assets/css/index.scss";

.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(5px);
}
</style>
