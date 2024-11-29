<script lang="ts" setup>
import { z } from 'zod'
import type { Form, FormSubmitEvent } from '#ui/types'

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
    <UDashboardSection
      :description="$t('page.settings.general.theme.description')" :title="$t('page.settings.general.theme.label')"
    >
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
      <UDashboardSection
        :description="$t('page.settings.general.profile.description')"
        :title="$t('page.settings.general.profile.label')"
      >
        <template #links>
          <UButton :label="$t('page.settings.general.profile.button')" color="black" type="submit" />
        </template>
        
        <UFormGroup
          :description="$t('page.settings.general.form.lastname.description')"
          :label="$t('page.settings.general.form.lastname.label')"
          :ui="{ container: '' }"
          class="grid grid-cols-2 gap-2 items-center"
          name="lastname"
          required
        >
          <UInput v-model="state.lastname" autocomplete="off" icon="i-heroicons-user" name="lastname" size="md" />
        </UFormGroup>
        
        <UFormGroup
          :description="$t('page.settings.general.form.firstname.description')"
          :label="$t('page.settings.general.form.firstname.label')"
          :ui="{ container: '' }"
          class="grid grid-cols-2 gap-2 items-center"
          name="firstname"
          required
        >
          <UInput v-model="state.firstname" autocomplete="off" icon="i-heroicons-user" name="firstname" size="md" />
        </UFormGroup>
        
        <UFormGroup
          :description="$t('page.settings.general.form.email.description')"
          :label="$t('page.settings.general.form.email.label')"
          :ui="{ container: '' }"
          class="grid grid-cols-2 gap-2"
          name="email"
          required
        >
          <UInput
            v-model="state.email" autocomplete="off" icon="i-heroicons-envelope" name="email" size="md" type="email"
          />
        </UFormGroup>
        
        <UFormGroup
          :description="$t('page.settings.general.form.avatar.description')" :help="$t('page.settings.general.form.avatar.supported_ext')"
          :label="$t('page.settings.general.form.avatar.label')" :ui="{ container: 'flex flex-wrap items-center gap-3', help: 'mt-0' }"
          class="grid grid-cols-2 gap-2"
          name="avatar"
        >
          <UAvatar :alt="state.lastname" :src="state.avatar" size="lg" />
          
          <UButton
            :label="$t('page.settings.general.form.avatar.button')" color="white" size="md" @click="onFileClick"
          />
          
          <UInput
            ref="fileRef" accept=".jpg, .jpeg, .png, .gif, .webp" class="hidden" name="avatar" type="file"
            @change="onFileChange"
          />
        </UFormGroup>
        
        <UFormGroup
          :description="$t('page.settings.general.form.password.description')"
          :label="$t('page.settings.general.form.password.label')"
          :ui="{ container: '' }"
          class="grid grid-cols-2 gap-2"
          name="password_current"
        >
          <UInput
            id="password_current" v-model="state.password_current" :placeholder="$t('page.settings.general.form.password.current')" name="password_current"
            size="md" type="password"
          />
        </UFormGroup>
        <UFormGroup
          :ui="{ container: '' }"
          class="grid grid-cols-2 gap-2"
          name="password_new"
        >
          <UInput
            id="password_new"
            v-model="state.password_new"
            :placeholder="$t('page.settings.general.form.password.new')"
            class="mt-2"
            name="password_new"
            size="md"
            type="password"
          />
        </UFormGroup>
      </UDashboardSection>
    </UForm>
  </UDashboardPanelContent>
</template>
