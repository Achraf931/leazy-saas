<script lang="ts" setup>
const { del } = useApi('themes')
const localePath = useLocalePath()
const emit = defineEmits(['close'])
const toast = useToast()
const loading = ref(false)
const { theme, redirect, refresh } = defineProps({
  theme: {
    type: Object,
    required: true
  },
  redirect: {
    type: Boolean,
    required: false
  },
  refresh: {
    type: Function,
    required: false
  }
})

const onDelete = async () => {
  loading.value = true
  
  const response = await del(theme.id)
  
  if (response) {
    refresh && refresh()
    loading.value = false
    redirect && await navigateTo(localePath({ name: 'library-themes' }))
    toast.add({ icon: 'i-heroicons-check-circle', title: 'Votre thème a été supprimé', color: 'green' })
    emit('close')
  } else loading.value = false
}
</script>

<template>
  <UModal :close-button="null" prevent-close>
    <UCard :ui="{ body: { base: 'flex items-start gap-4' } }">
      <UIcon class="w-12 h-12 text-red-500 dark:text-red-400" name="i-heroicons-exclamation-circle" />
      <div>
        <p class="text-gray-900 dark:text-white font-semibold">Supprimer le thème</p>
        <p class="mt-1 text-gray-500 dark:text-gray-400 text-sm">Êtes-vous sûr de vouloir supprimer votre thème ?</p>
        <div class="flex items-center gap-x-1.5 pt-4">
          <UButton :loading="loading" color="red" label="Supprimer" @click="onDelete" />
          <UButton color="white" label="Annuler" @click="emit('close')" />
        </div>
      </div>
    </UCard>
  </UModal>
</template>
