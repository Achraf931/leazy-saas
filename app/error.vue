<script setup lang="ts">
import type { NuxtError } from '#app'

useSeoMeta({
  title: 'Page introuvable',
  description: 'Nous sommes désolés mais cette page n\'a pas pu être trouvée.'
})

defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true
  }
})

useHead({
  htmlAttrs: {
    lang: 'en'
  }
})
</script>

<template>
  <div>
    <UMain>
      <UContainer>
        <UPage>
          <UPageError :error="error" />
        </UPage>
      </UContainer>
    </UMain>

    <UNotifications />
  </div>
</template>
