<script setup lang="ts">
const { del } = useApi('lessons')
const localePath = useLocalePath()
const emit = defineEmits(['close'])
const toast = useToast()
const loading = ref(false)
const { lesson, redirect, refresh } = defineProps({
  lesson: {
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

  const response = await del(lesson.id)

  if (response) {
    refresh && refresh()
    loading.value = false
    redirect && await navigateTo(localePath({ name: 'library-lessons' }))
    toast.add({ icon: 'i-heroicons-check-circle', title: 'Votre leçon a été supprimé', color: 'green' })
    emit('close')
  } else loading.value = false
}
</script>

<template>
  <UModal prevent-close :close-button="null">
    <UCard :ui="{ body: { base: 'flex items-start gap-4' } }">
      <UIcon name="i-heroicons-exclamation-circle" class="w-12 h-12 text-red-500 dark:text-red-400" />
      <div>
        <p class="text-gray-900 dark:text-white font-semibold">Supprimer la leçon</p>
        <p class="mt-1 text-gray-500 dark:text-gray-400 text-sm">Êtes-vous sûr de vouloir supprimer votre leçon ?</p>
        <div class="flex items-center gap-x-1.5 pt-4">
          <UButton color="red" label="Supprimer" :loading="loading" @click="onDelete" />
          <UButton color="white" label="Annuler" @click="emit('close')" />
        </div>
      </div>
    </UCard>
  </UModal>
</template>
