<script setup lang="ts">
defineProps<{
  overlay: boolean
  lesson: object
}>()
</script>

<template>
  <UDashboardSlideover title="Commentaires & suggestions" :ui="{ wrapper: 'top-[--header-height] h-[calc(100vh-var(--header-height))] ', header: { base: 'border-l border-gray-200 dark:border-gray-800' }, body: { base: 'border-l border-gray-200 dark:border-gray-800' }, footer: { base: 'border-l border-gray-200 dark:border-gray-800' } }" :overlay>
    <div class="space-y-2">
      <div class="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg space-y-1 hover:bg-gray-100">
        <div class="flex items-center gap-2">
          <UAvatar size="xs" text="CH" />
          <p class="text-sm font-semibold">Charfe Ham</p>
          <span class="text-xs text-gray-500">Il y a 2 jours</span>
        </div>

        <p class="ml-8 border-l-2 border-primary pl-2 text-xs text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.</p>
        <p class="ml-8 text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>

        <div class="flex items-start gap-2 pt-2">
          <UAvatar size="xs" src="https://avatars.githubusercontent.com/u/45672435?v=4" />
          <div class="group flex flex-col items-end w-full focus-within:ring-1 focus-within:ring-inset focus-within:ring-gray-300 focus-within:dark:ring-gray-700 rounded-md p-2">
            <UTextarea class="w-full" placeholder="Répondre" size="xs" variant="none" autoresize :padded="false" />
            <UButton class="hidden group-focus-within:flex" size="2xs" icon="i-heroicons-arrow-up-20-solid" :ui="{ rounded: 'rounded-full' }" />
          </div>
        </div>
      </div>

      <div class="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg space-y-1 hover:bg-gray-100">
        <div class="flex items-center gap-2">
          <UAvatar size="xs" text="CH" />
          <p class="text-sm font-semibold">Charfe Ham</p>
          <span class="text-xs text-gray-500">Il y a 2 jours</span>
        </div>

        <p class="ml-8 border-l-2 border-primary pl-2 text-xs text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.</p>
        <p class="ml-8 text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>

        <div class="flex items-start gap-2 pt-2">
          <UAvatar size="xs" src="https://avatars.githubusercontent.com/u/45672435?v=4" />
          <div class="group flex flex-col items-end w-full focus-within:ring-1 focus-within:ring-inset focus-within:ring-gray-300 focus-within:dark:ring-gray-700 rounded-md p-2">
            <UTextarea class="w-full" placeholder="Répondre" size="xs" variant="none" autoresize :padded="false" />
            <UButton class="hidden group-focus-within:flex" size="2xs" icon="i-heroicons-arrow-up-20-solid" :ui="{ rounded: 'rounded-full' }" />
          </div>
        </div>
      </div>
    </div>
  </UDashboardSlideover>
</template>