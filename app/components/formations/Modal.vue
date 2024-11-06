<script setup lang="ts">
const { post, patch } = useApi('formations')
const emit = defineEmits(['close'])
const localePath = useLocalePath()
const toast = useToast()
const pending = ref(false)
const { formation, refresh } = defineProps({
  formation: {
    type: Object,
    required: false
  },
  refresh: {
    type: Function,
    required: false
  }
})

const fields = reactive({
  name: formation?.name || '',
  description: formation?.description || ''
})

const validate = (state) => {
  const errors = []

  if (!state.name) errors.push({ path: 'name', message: 'Le titre est requis' })

  return errors
}

const onSubmit = async (state) => {
  pending.value = true
  const response = await (formation ? patch : post)(formation ? { ...state.data, id: formation.id } : { ...state.data })

  if (response) {
    toast.add({ icon: 'i-heroicons-check-circle', title: formation ? 'Formation modifiée' : 'Formation créée', color: 'green' })

    pending.value = false
    emit('close')
    if (refresh) refresh()
    else return navigateTo(localePath({ name: 'library-formation-id', params: { id: response.id } }))
  } else pending.value = false
}
</script>

<template>
  <UModal prevent-close :ui="{ width: 'sm:max-w-md' }">
    <UCard>
      <div class="flex items-start justify-between gap-x-1.5 pb-5">
        <p class="text-gray-900 dark:text-white font-semibold">{{ `${formation ? 'Modifier' : 'Créer'} une formation` }}</p>
        <UButton icon="i-heroicons-x-mark" color="gray" variant="ghost" @click="emit('close')" />
      </div>
      <UForm class="space-y-4" :state="fields" :validate="validate" @submit="onSubmit">
        <UFormGroup label="Titre" name="name" required>
          <UInput type="text" placeholder="Ex. : Les bases du marketing digital" autofocus v-model="fields.name" />
        </UFormGroup>

        <UFormGroup label="Description" name="description" description="Courte description visible dans la liste des formations" hint="Optionnel">
          <UTextarea placeholder="Ex. : Apprenez les stratégies essentielles pour réussir dans le marketing digital et optimiser votre présence en ligne" v-model="fields.description" />
        </UFormGroup>

        <div class="flex justify-end gap-3">
          <UButton label="Annuler" color="gray" variant="ghost" @click="emit('close')" />
          <UButton :loading="pending" type="submit" :label="formation ? 'Modifier' : 'Créer'" color="black" />
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>
