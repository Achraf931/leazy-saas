<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const { localeProperties } = useI18n()
const fileRef = ref<{ input: HTMLInputElement }>()
const client = useSanctumClient()
const user = useSanctumUser()

const locale = shallowRef(localeProperties.value)
console.log(user.value)
const state = reactive({
  lastname: user.value.lastname,
  firstname: user.value.firstname,
  email: user.value.email,
  avatar: 'https://avatars.githubusercontent.com/u/45672435?v=4',
  password_current: '',
  password_new: ''
})

const toast = useToast()

function validate (state: any): FormError[] {
  const errors = []
  if (!state.lastname) errors.push({ path: 'lastname', message: 'Veuillez entrer votre nom.' })
  if (!state.firstname) errors.push({ path: 'fisrtname', message: 'Veuillez entrer votre prénom.' })
  if (!state.email) errors.push({ path: 'email', message: 'Veuillez entrer votre email.' })
  if ((state.password_current && !state.password_new) || (!state.password_current && state.password_new)) errors.push({ path: 'password', message: 'Veuillez entrer votre mot de passe.' })
  return errors
}

function onFileChange (e: Event) {
  const input = e.target as HTMLInputElement

  if (!input.files?.length) {
    return
  }

  state.avatar = URL.createObjectURL(input.files[0])
}

function onFileClick () {
  fileRef.value?.input.click()
}

async function onSubmit (event: FormSubmitEvent<any>) {
  console.log(event.data)
  const { data } = await client('/api/me', { method: 'PATCH', body: event.data })
  console.log(data)
  user.value = data
  toast.add({ title: 'Profil modifié !', icon: 'i-heroicons-check-circle' })
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

    <UForm :state="state" :validate="validate" :validate-on="['submit']" @submit="onSubmit">
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
          <UInput v-model="state.lastname" autocomplete="off" icon="i-heroicons-user" size="md" />
        </UFormGroup>

        <UFormGroup
          name="firstname"
          :label="$t('page.settings.general.form.firstname.label')"
          :description="$t('page.settings.general.form.firstname.description')"
          required
          class="grid grid-cols-2 gap-2 items-center"
          :ui="{ container: '' }"
        >
          <UInput v-model="state.firstname" autocomplete="off" icon="i-heroicons-user" size="md" />
        </UFormGroup>

        <UFormGroup
          name="email"
          :label="$t('page.settings.general.form.email.label')"
          :description="$t('page.settings.general.form.email.description')"
          required
          class="grid grid-cols-2 gap-2"
          :ui="{ container: '' }"
        >
          <UInput v-model="state.email" type="email" autocomplete="off" icon="i-heroicons-envelope" size="md" />
        </UFormGroup>

        <UFormGroup name="avatar" :label="$t('page.settings.general.form.avatar.label')" :description="$t('page.settings.general.form.avatar.description')" class="grid grid-cols-2 gap-2" :help="$t('page.settings.general.form.avatar.supported_ext')" :ui="{ container: 'flex flex-wrap items-center gap-3', help: 'mt-0' }">
          <UAvatar :src="state.avatar" :alt="state.name" size="lg" />

          <UButton :label="$t('page.settings.general.form.avatar.button')" color="white" size="md" @click="onFileClick" />

          <UInput ref="fileRef" type="file" class="hidden" accept=".jpg, .jpeg, .png, .gif, .webp" @change="onFileChange" />
        </UFormGroup>

        <UFormGroup
          name="password"
          :label="$t('page.settings.general.form.password.label')"
          :description="$t('page.settings.general.form.password.description')"
          class="grid grid-cols-2 gap-2"
          :ui="{ container: '' }"
        >
          <UInput id="password" v-model="state.password_current" type="password" :placeholder="$t('page.settings.general.form.password.current')" size="md" />
          <UInput
            id="password_new"
            v-model="state.password_new"
            type="password"
            :placeholder="$t('page.settings.general.form.password.new')"
            size="md"
            class="mt-2"
          />
        </UFormGroup>
      </UDashboardSection>
    </UForm>
  </UDashboardPanelContent>
</template>
