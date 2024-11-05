<script setup lang="ts">
const tags = ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'Nuxt.js', 'Tailwind CSS', 'Alpine.js', 'Vite', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'GraphQL', 'Apollo', 'Hasura', 'Firebase', 'AWS', 'Docker', 'Kubernetes', 'Jest', 'Cypress', 'Testing Library', 'Storybook', 'Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'After Effects', 'Premiere Pro', 'Blender', 'Unity', 'Unreal Engine', 'Cinema 4D', 'Maya', 'ZBrush', 'Substance Painter', 'Substance']
</script>

<template>
  <UFormGroup label="Description" :ui="{ label: { base: 'font-semibold' } }" class="text-gray-500">
    On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut, et une recherche pour 'Lorem Ipsum' vous conduira vers de nombreux sites qui n'en sont encore qu'à leur phase de construction. Plusieurs versions sont apparues avec le temps, parfois par accident, souvent intentionnellement (histoire d'y rajouter de petits clins d'oeil, voire des phrases embarassantes).
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
      <UBadge v-for="tag in tags" :key="tag" :label="tag" color="gray" size="xs" />
    </div>
  </UFormGroup>

  <UButton label="Dernière mise à jour le 05/12/2023" color="gray" class="cursor-auto" variant="ghost" size="xs" leading-icon="i-heroicons-clock" :padded="false" />
</template>