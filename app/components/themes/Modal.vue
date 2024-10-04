<script setup lang="ts">
const { get, post, patch } = useApi('themes')
const emit = defineEmits(['close'])
const localePath = useLocalePath()
const toast = useToast()
const pending = ref(false)
const { theme, refresh } = defineProps({
  theme: {
    type: Object,
    required: false
  },
  refresh: {
    type: Function,
    required: false
  }
})


const fields = reactive({
  name: theme?.name || '',
  discipline_id: 1
})

const validate = (state) => {
  const errors = []

  if (!state.name) errors.push({ path: 'name', message: 'Le titre est requis' })

  return errors
}

const onSubmit = async (state) => {
  pending.value = true
  const response = await (theme ? patch : post)(theme ? { ...state.data, id: theme.id } : state.data)

  if (response) {
    toast.add({ icon: 'i-heroicons-check-circle', title: theme ? 'Thème modifié' : 'Thème créé', color: 'green' })

    pending.value = false
    emit('close')
    if (refresh) refresh()
    else return navigateTo(localePath({ name: 'library-themes' }))
  } else pending.value = false
}
</script>

<template>
  <UModal prevent-close :ui="{ width: 'sm:max-w-md' }">
    <UCard>
      <div class="flex items-start justify-between gap-x-1.5 pb-5">
        <p class="text-gray-900 dark:text-white font-semibold">{{ `${theme ? 'Modifier' : 'Créer'} un thème` }}</p>
        <UButton icon="i-heroicons-x-mark" color="gray" variant="ghost" @click="emit('close')" />
      </div>
      <UForm class="space-y-4" :state="fields" :validate="validate" @submit="onSubmit">
        <UFormGroup label="Titre" name="name">
          <UInput type="text" placeholder="Titre du thème" autofocus v-model="fields.name" />
        </UFormGroup>

        <div class="flex justify-end gap-3">
          <UButton label="Annuler" color="gray" variant="ghost" @click="emit('close')" />
          <UButton :loading="pending" type="submit" :label="theme ? 'Modifier' : 'Créer'" color="black" />
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>