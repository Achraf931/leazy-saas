<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent, Form } from '#ui/types'

interface User {
  id: number
  lastname: string
  firstname: string
  email: string
  avatar: string
}

const toast = useToast()
const schema = z.object({
  lastname: z.string().min(1, 'Le nom est requis.'),
  firstname: z.string().min(1, 'Le prénom est requis.'),
  email: z.string().email('Veuillez entrer un email valide.'),
  password_current: z.string().optional(),
  password_new: z.string().optional(),
  avatar: z.string().optional()
}).refine(
  data => data.password_current === data.password_new,
  { message: 'Les mots de passe ne correspondent pas.', path: ['password_new'] }
)
const fileRef = ref<{ input: HTMLInputElement }>()
const client = useSanctumClient()
const user = useSanctumUser<User>()

type Schema = z.output<typeof schema>

const form = ref<Form<Schema>>()
const state = reactive<Schema>({
  lastname: user.value?.lastname || '',
  firstname: user.value?.firstname || '',
  email: user.value?.email || '',
  password_current: '',
  password_new: '',
  avatar: user.value?.avatar || 'https://avatars.githubusercontent.com/u/45672435?v=4'
})

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement

  if (!input.files?.length) {
    return
  }

  state.avatar = URL.createObjectURL(input.files[0])
}

function onFileClick() {
  fileRef.value?.input.click()
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  form.value?.clear()
  const { data } = await client('/api/me', { method: 'PATCH', body: event.data })
  user.value = data
  toast.add({ title: 'Profil modifié !', icon: 'i-heroicons-check-circle', color: 'green' })
}
</script>

<template>
  <UDashboardPanelContent class="pb-24">
    <UDashboardSection :title="$t('page.settings.general.theme.label')" :description="$t('page.settings.general.theme.description')">
      <template #links>
        <UColorModeSelect color="gray" />
      </template>
    </UDashboardSection>

    <UDivider class="mb-4" />

    <UForm
      ref="form"
      :schema="schema"
      :state="state"
      :validate-on="['submit']"
      @submit="onSubmit"
    >
      <UDashboardSection :title="$t('page.settings.general.profile.label')" :description="$t('page.settings.general.profile.description')">
        <template #links>
          <UButton type="submit" :label="$t('page.settings.general.profile.button')" color="black" />
        </template>

        <UFormGroup
          name="lastname"
          :label="$t('page.settings.general.form.lastname.label')"
          :description="$t('page.settings.general.form.lastname.description')"
          required
          class="grid grid-cols-2 gap-2 items-center"
          :ui="{ container: '' }"
        >
          <UInput v-model="state.lastname" name="lastname" autocomplete="off" icon="i-heroicons-user" size="md" />
        </UFormGroup>

        <UFormGroup
          name="firstname"
          :label="$t('page.settings.general.form.firstname.label')"
          :description="$t('page.settings.general.form.firstname.description')"
          required
          class="grid grid-cols-2 gap-2 items-center"
          :ui="{ container: '' }"
        >
          <UInput v-model="state.firstname" name="firstname" autocomplete="off" icon="i-heroicons-user" size="md" />
        </UFormGroup>

        <UFormGroup
          name="email"
          :label="$t('page.settings.general.form.email.label')"
          :description="$t('page.settings.general.form.email.description')"
          required
          class="grid grid-cols-2 gap-2"
          :ui="{ container: '' }"
        >
          <UInput v-model="state.email" name="email" type="email" autocomplete="off" icon="i-heroicons-envelope" size="md" />
        </UFormGroup>

        <UFormGroup name="avatar" :label="$t('page.settings.general.form.avatar.label')" :description="$t('page.settings.general.form.avatar.description')" class="grid grid-cols-2 gap-2" :help="$t('page.settings.general.form.avatar.supported_ext')" :ui="{ container: 'flex flex-wrap items-center gap-3', help: 'mt-0' }">
          <UAvatar :src="state.avatar" :alt="state.lastname" size="lg" />

          <UButton :label="$t('page.settings.general.form.avatar.button')" color="white" size="md" @click="onFileClick" />

          <UInput ref="fileRef" name="avatar" type="file" class="hidden" accept=".jpg, .jpeg, .png, .gif, .webp" @change="onFileChange" />
        </UFormGroup>

        <UFormGroup
          name="password_current"
          :label="$t('page.settings.general.form.password.label')"
          :description="$t('page.settings.general.form.password.description')"
          class="grid grid-cols-2 gap-2"
          :ui="{ container: '' }"
        >
          <UInput id="password_current" name="password_current" v-model="state.password_current" type="password" :placeholder="$t('page.settings.general.form.password.current')" size="md" />
        </UFormGroup>
        <UFormGroup
          name="password_new"
          class="grid grid-cols-2 gap-2"
          :ui="{ container: '' }"
        >
          <UInput
            id="password_new"
            v-model="state.password_new"
            type="password"
            name="password_new"
            :placeholder="$t('page.settings.general.form.password.new')"
            size="md"
            class="mt-2"
          />
        </UFormGroup>
      </UDashboardSection>
    </UForm>
  </UDashboardPanelContent>
</template>
