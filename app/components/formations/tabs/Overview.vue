<script setup lang="ts">
defineProps(['formation'])
</script>

<template>
  <UFormGroup label="Description" :ui="{ label: { base: 'font-semibold' } }" class="relative text-gray-500 w-max">
    <p>
      {{ formation.description }}
    </p>
  </UFormGroup>

  <UFormGroup label="Ce que vous allez apprendre" :ui="{ label: { base: 'font-semibold' } }" class="text-gray-500">
    <ul class="list-disc list-inside">
      <li>Créer des applications web modernes avec Vue.js et Nuxt.js</li>
      <li>Utiliser Tailwind CSS pour styliser vos applications</li>
      <li>Créer des applications web réactives avec Alpine.js</li>
      <li>Utiliser Vite pour des builds ultra-rapides</li>
      <li>Utiliser TypeScript pour une meilleure expérience de développement</li>
      <li>Créer des API REST avec Node.js et Express</li>
      <li>Utiliser MongoDB pour stocker vos données</li>
      <li>Créer des API GraphQL avec Apollo Server</li>
      <li>Utiliser Hasura pour une API GraphQL instantanée</li>
      <li>Utiliser Firebase pour une authentification sécurisée</li>
      <li>Utiliser AWS pour déployer vos applications</li>
      <li>Utiliser Docker pour containeriser vos applications</li>
      <li>Utiliser Kubernetes pour orchestrer vos applications</li>
      <li>Utiliser Jest pour tester vos applications</li>
      <li>Utiliser Cypress pour des tests end-to-end</li>
      <li>Utiliser Testing Library pour des tests utilisateurs</li>
      <li>Utiliser Storybook pour documenter vos composants</li>
      <li>Utiliser Figma pour designer vos applications</li>
      <li>Utiliser Adobe XD pour designer vos applications</li>
      <li>Utiliser Photoshop pour designer vos applications</li>
      <li>Utiliser Illustrator pour designer vos applications</li>
      <li>Utiliser After Effects pour animer vos applications</li>
      <li>Utiliser Premiere Pro pour éditer vos vidéos</li>
      <li>Utiliser Blender pour créer des modèles 3D</li>
      <li>Utiliser Unity pour créer des jeux vidéo</li>
      <li>Utiliser Unreal Engine pour créer des jeux vidéo</li>
      <li>Utiliser Cinema 4D pour créer des modèles 3D</li>
      <li>Utiliser Maya pour créer des modèles 3D</li>
      <li>Utiliser ZBrush pour sculpter des modèles 3D</li>
    </ul>
  </UFormGroup>

  <UFormGroup label="Tags" :ui="{ label: { base: 'font-semibold' } }">
    <div class="flex flex-wrap gap-1">
      <UBadge v-for="tag in formation.tags" :key="tag.id" :label="tag.name" color="gray" size="xs" />
    </div>
  </UFormGroup>

  <UButton label="Dernière mise à jour le 05/12/2023" color="gray" class="cursor-auto" variant="ghost" size="xs" leading-icon="i-heroicons-clock" :padded="false" />
</template>
