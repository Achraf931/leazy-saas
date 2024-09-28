<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardPanelContent>
        <div class="p-px overflow-y-auto gap-x-4 gap-y-6 sm:grid sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          <NuxtLink :to="localePath({ name: 'classes-id', params: { id: 1 } })" class="text-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 hover:opacity-75">
            <p class="mb-2 font-semibold">
              Terminale PI
            </p>
            <div class="flex gap-1.5">
              <UIcon name="i-heroicons-user-group" class="w-5 h-5" />
              <p>
                30 élèves
              </p>
            </div>
          </NuxtLink>
          <NuxtLink :to="localePath({ name: 'classes-id', params: { id: 2 } })" class="text-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 hover:opacity-75">
            <p class="mb-2 font-semibold">
              Seconde PG
            </p>
            <div class="flex gap-1.5">
              <UIcon name="i-heroicons-user-group" class="w-5 h-5" />
              <p>
                23 élèves
              </p>
            </div>
          </NuxtLink>
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
<script setup lang="ts">
</script>