<script setup lang="ts">
const user = useSanctumUser()
</script>

<template>
  <UFormGroup label="Classes :" :ui="{ label: { base: 'font-semibold' } }">
    <div class="p-px overflow-y-auto gap-2 sm:grid sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      <NuxtLinkLocale v-for="classe in user.classes" target="_blank" :key="classe.id" :to="{ name: 'classes-id', params: { id: classe.id } }" class="flex flex-col justify-between text-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 hover:border-primary">
        <p class="mb-2 font-semibold">
          {{ classe.name }}
        </p>
        <div class="flex gap-1.5">
          <UIcon name="i-heroicons-user-group" class="w-5 h-5" />
          <p>
            30 élèves
          </p>
        </div>
      </NuxtLinkLocale>
    </div>
  </UFormGroup>
</template>