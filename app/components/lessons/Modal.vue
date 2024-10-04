<script setup lang="ts">
const { get, post, patch } = useApi('lessons')
const emit = defineEmits(['close'])
const localePath = useLocalePath()
const toast = useToast()
const pending = ref(false)
const { lesson, refresh } = defineProps({
  lesson: {
    type: Object,
    required: false
  },
  refresh: {
    type: Function,
    required: false
  }
})

const fields = reactive({
  name: lesson?.name || '',
  description: lesson?.description || ''
})

const validate = (state) => {
  const errors = []

  if (!state.name) errors.push({ path: 'name', message: 'Le titre est requis' })

  return errors
}

const onSubmit = async (state) => {
  pending.value = true
  const response = await (lesson ? patch : post)(lesson ? { ...state.data, id: lesson.id } : { ...state.data, content: '{}' })

  if (response) {
    toast.add({ icon: 'i-heroicons-check-circle', title: lesson ? 'Leçon modifiée' : 'Leçon créée', color: 'green' })

    pending.value = false
    emit('close')
    if (refresh) refresh()
    else return navigateTo(localePath({ name: 'lesson_id', params: { id: response.id } }))
  } else pending.value = false
}
</script>

<template>
  <UModal prevent-close :ui="{ width: 'sm:max-w-md' }">
    <UCard>
      <div class="flex items-start justify-between gap-x-1.5 pb-5">
        <p class="text-gray-900 dark:text-white font-semibold">{{ `${lesson ? 'Modifier' : 'Créer'} une leçon` }}</p>
        <UButton icon="i-heroicons-x-mark" color="gray" variant="ghost" @click="emit('close')" />
      </div>
      <UForm class="space-y-4" :state="fields" :validate="validate" @submit="onSubmit">
        <UFormGroup label="Titre" name="name">
          <UInput type="text" placeholder="Titre de la leçon" autofocus v-model="fields.name" />
        </UFormGroup>

        <UFormGroup label="Description (optionnelle)" name="description">
          <UTextarea placeholder="Description de la leçon" v-model="fields.description" />
        </UFormGroup>

        <div class="flex justify-end gap-3">
          <UButton label="Annuler" color="gray" variant="ghost" @click="emit('close')" />
          <UButton :loading="pending" type="submit" :label="lesson ? 'Modifier' : 'Créer'" color="black" />
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>