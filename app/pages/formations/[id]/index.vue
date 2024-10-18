<script setup lang="ts">
const tags = ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'Nuxt.js', 'Tailwind CSS', 'Alpine.js', 'Vite', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'GraphQL', 'Apollo', 'Hasura', 'Firebase', 'AWS', 'Docker', 'Kubernetes', 'Jest', 'Cypress', 'Testing Library', 'Storybook', 'Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'After Effects', 'Premiere Pro', 'Blender', 'Unity', 'Unreal Engine', 'Cinema 4D', 'Maya', 'ZBrush', 'Substance Painter', 'Substance']
</script>

<template>
  <div class="space-y-4">
    <NuxtImg src="https://support.discord.com/hc/theming_assets/01HZPN9XSQTZNQ61ZY6FH47BS1" alt="Test image" class="rounded-lg aspect-[16/5] object-cover" />
    <h1 class="text-2xl font-bold">Titre de la formation</h1>
    <p class="font-semibold">Thème : <span class="font-normal text-gray-500">La seconde guèrre mondiale</span></p>
    <p class="font-semibold">Temps de lecture : <span class="font-normal text-gray-500">16h</span></p>
    <p class="font-semibold">Nombre de leçons : <span class="font-normal text-gray-500">28</span></p>

    <p class="font-semibold">
      Attribué aux classes :
      <UAvatarGroup>
        <UTooltip text="Terminale Production Graphique">
          <UAvatar alt="Terminale Production Graphique"/>
        </UTooltip>

        <UTooltip text="Seconde Développement Web">
          <UAvatar alt="Seconde Développement Web"/>
        </UTooltip>

        <UTooltip text="Première Design d'interface">
          <UAvatar alt="Première Design d'interface"/>
        </UTooltip>
      </UAvatarGroup>
    </p>

    <UFormGroup label="Tags :" :ui="{ label: { base: 'font-semibold' } }">
      <div class="flex flex-wrap gap-1">
        <UBadge v-for="tag in tags" :key="tag" :label="tag" color="gray" size="xs" />
      </div>
    </UFormGroup>

    <UFormGroup label="Description :" :ui="{ label: { base: 'font-semibold' } }" class="text-gray-500">
      On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut, et une recherche pour 'Lorem Ipsum' vous conduira vers de nombreux sites qui n'en sont encore qu'à leur phase de construction. Plusieurs versions sont apparues avec le temps, parfois par accident, souvent intentionnellement (histoire d'y rajouter de petits clins d'oeil, voire des phrases embarassantes).
    </UFormGroup>

    <div class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
      Créé par : <UAvatar size="3xs" title="John Doe" src="https://img.freepik.com/psd-gratuit/illustration-3d-avatar-profil-humain_23-2150671142.jpg" />
      <b class="font-medium">John Doe</b>
    </div>
  </div>
</template>
