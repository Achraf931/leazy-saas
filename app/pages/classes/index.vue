<script setup lang="ts">
const user = useSanctumUser()
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardPanelContent>
        <div class="p-px overflow-y-auto gap-x-4 gap-y-6 sm:grid sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          <NuxtLinkLocale v-for="classe in user.classes" :key="classe.id" :to="{ name: 'classes-id', params: { id: classe.id } }" class="text-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 hover:opacity-75">
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
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
