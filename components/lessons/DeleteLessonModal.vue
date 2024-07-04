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
  await client(`/api/teacher/lessons/${model.value.lesson.id}`, { method: 'DELETE' })

  setTimeout(() => {
    model.value.refresh()
    loading.value = false
    toast.add({ icon: 'i-heroicons-check-circle', title: 'Votre leçon a été supprimé', color: 'green' })
    model.value.open = false
  }, 2000)
}
</script>

<template>
  <UModal v-model="model.open" prevent-close :close-button="null">
    <UCard :ui="{ body: { base: 'flex items-start gap-4' } }">
      <UIcon name="i-heroicons-exclamation-circle" class="w-12 h-12 text-red-500 dark:text-red-400" />
      <div>
        <p class="text-gray-900 dark:text-white font-semibold">Supprimer la leçon</p>
        <p class="mt-1 text-gray-500 dark:text-gray-400 text-sm">Êtes-vous sûr de vouloir supprimer votre leçon ?</p>
        <div class="flex items-center gap-x-1.5 pt-4">
          <UButton color="red" label="Supprimer" :loading="loading" @click="onDelete" />
          <UButton color="white" label="Annuler" @click="model.open = false" />
        </div>
      </div>
    </UCard>
  </UModal>
</template>
