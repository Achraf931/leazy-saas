<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent, Form } from '#ui/types'

interface Props {
  theme?: { id: number, name: string, discipline_id: number | null }
  refresh?: () => void
}

const { get, post, patch } = useApi('themes')
const emit = defineEmits(['close'])
const localePath = useLocalePath()
const toast = useToast()
const pending = ref(false)
const loading = ref(false)
const { theme, refresh } = defineProps<Props>()
const schema = z.object({
  name: z.string().min(1, 'Le titre est requis.'),
  discipline_id: z.any().refine(option => option?.id !== null, { message: 'La discipline est requise.' })
})

type Schema = z.output<typeof schema>

const form = ref<Form<Schema>>()
const state = reactive<Schema>({
  name: theme?.name || '',
  discipline_id: theme?.discipline_id || null
})

const searchable = async (q: string) => {
  loading.value = true

  const disciplines: any[] = await get(null, { q }, 'disciplines')

  loading.value = false

  return 'data' in disciplines ? disciplines.data : disciplines
}

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  pending.value = true
  form.value?.clear()
  const response = await (theme ? patch : post)(theme ? { ...event.data, id: theme.id } : event.data)

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
      <UForm
        ref="form"
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Titre" name="name" required>
          <UInput type="text" name="name" placeholder="Ex. : SEO" autofocus v-model="state.name" />
        </UFormGroup>

        <UFormGroup label="Discipline associé" name="discipline_id" required>
          <USelectMenu
            v-model="state.discipline_id"
            :loading="loading"
            :searchable="searchable"
            name="discipline_id"
            searchable-placeholder="Rechercher une discipline"
            class="w-full"
            placeholder="Sélectionner un discipline"
            option-attribute="name"
            value-attribute="id"
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
