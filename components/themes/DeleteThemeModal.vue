<script setup lang="ts">
const client = useSanctumClient()

const model = defineModel({
  type: Object
})

const toast = useToast()

const loading = ref(false)

async function onDelete () {
  loading.value = true

  // add code response
  await client(`/api/teacher/themes/${model.value.theme.id}`, { method: 'DELETE' })

  setTimeout(() => {
    model.value.refresh()
    loading.value = false
    toast.add({ icon: 'i-heroicons-check-circle', title: 'Votre thème a été supprimé', color: 'red' })
    model.value.open = false
  }, 2000)
}
</script>

<template>
  <UDashboardModal
      v-model="model.open"
      title="Supprimer le thème"
      description="Êtes-vous sûr de vouloir supprimer votre thème ?"
      icon="i-heroicons-exclamation-circle"
      prevent-close
      :close-button="null"
      :ui="{
      icon: {
        base: 'text-red-500 dark:text-red-400'
      } as any,
      footer: {
        base: 'ml-16'
      } as any
    }"
  >
    <template #footer>
      <UButton color="red" label="Supprimer" :loading="loading" @click="onDelete" />
      <UButton color="white" label="Annuler" @click="model.open = false" />
    </template>
  </UDashboardModal>
</template>
