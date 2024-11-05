<script setup lang="ts">
defineProps({
  user: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="flex items-center gap-2">
    <UPopover :popper="{ strategy: 'absolute', placement: 'bottom-start' }">
      <UButton color="white" target="_blank" size="2xs" :label="user.name">
        <template #leading>
          <UAvatar :src="user.avatar" :alt="user.name" size="3xs" />
        </template>
      </UButton>

      <template #panel>
        <UCard :ui="{ ring: 'ring-0', body: { padding: 'p-2 sm:p-2' }, header: { padding: 'p-0 sm:p-2' }, footer: { padding: 'p-0 sm:p-2' } }" class="text-sm">
          <template #header>
            <div class="flex items-center gap-2">
              <UAvatar :src="user.avatar" :alt="user.name" size="3xs" />
              <p class="text-xs font-semibold">{{ user.name }}</p>
            </div>
          </template>

          <div>
            <p class="text-xs">
              <span class="font-bold">Établissement :</span> Webstart
            </p>
            <p class="text-xs">
              <span class="font-bold">Classe :</span> Seconde
            </p>
            <p class="text-xs">
              <span class="font-bold">Section :</span> Production Graphique
            </p>
          </div>

          <template #footer>
            <div class="flex gap-2">
              <UButton color="white" size="2xs" icon="i-heroicons-plus" label="Contacter" />
              <UButton color="white" size="2xs" icon="i-heroicons-exclamation-triangle" label="Signaler" />
            </div>
          </template>
        </UCard>
      </template>
    </UPopover>
  </div>
</template>
