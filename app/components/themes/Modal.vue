<script setup lang="ts">
const { get, post, patch } = useApi('themes')
const emit = defineEmits(['close'])
const localePath = useLocalePath()
const toast = useToast()
const pending = ref(false)
const loading = ref(false)
const selected = ref([])
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
  discipline_id: theme?.discipline_id || ''
})

const validate = (state) => {
  const errors = []

  if (!state.name) errors.push({ path: 'name', message: 'Le titre est requis' })
  if (!state.discipline_id) errors.push({ path: 'discipline_id', message: 'La discipline est requise' })

  return errors
}

const searchable = async (q: string) => {
  loading.value = true

  const disciplines: any[] = await get(null, { q }, 'disciplines')

  loading.value = false

  return 'data' in disciplines ? disciplines.data : disciplines
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
        <UFormGroup label="Titre" name="name" required>
          <UInput type="text" placeholder="Titre du thème" autofocus v-model="fields.name" />
        </UFormGroup>

        <UFormGroup label="Discipline associé" required>
          <USelectMenu
              v-model="selected"
              :loading="loading"
              :searchable="searchable"
              searchable-placeholder="Rechercher une discipline"
              class="w-full"
              placeholder="Sélectionner un discipline"
              option-attribute="name"
              by="id"
          />
        </UFormGroup>

        <div class="flex justify-end gap-3">
          <UButton label="Annuler" color="gray" variant="ghost" @click="emit('close')" />
          <UButton :loading="pending" type="submit" :label="theme ? 'Modifier' : 'Créer'" color="black" />
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>
