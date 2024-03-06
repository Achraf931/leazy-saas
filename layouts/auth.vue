<template>
  <div class="h-screen flex items-center justify-center overlay">
    <div class="gradient" />

    <UButton icon="i-heroicons-home" label="Accueil" to="/" color="black" class="absolute top-4" />

    <slot />
  </div>
</template>
