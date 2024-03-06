<script setup lang="ts">
const links = [{
  label: 'Resources',
  children: [{
    label: 'Help center'
  }, {
    label: 'Docs'
  }, {
    label: 'Roadmap'
  }, {
    label: 'Changelog'
  }]
}, {
  label: 'Features',
  children: [{
    label: 'Affiliates'
  }, {
    label: 'Portal'
  }, {
    label: 'Jobs'
  }, {
    label: 'Sponsors'
  }]
}, {
  label: 'Company',
  children: [{
    label: 'À propos'
  }, {
    label: 'Prix'
  }, {
    label: 'Carrières'
  }, {
    label: 'Blog'
  }]
}]

const toast = useToast()

const email = ref('')
const loading = ref(false)

function onSubmit () {
  loading.value = true

  setTimeout(() => {
    toast.add({
      title: 'Inscription réussie',
      description: 'Vous avez été inscrit à notre newsletter.'
    })

    loading.value = false
  }, 1000)
}
</script>

<template>
  <UFooter>
    <template #top>
      <UFooterColumns :links="links">
        <template #right>
          <form @submit.prevent="onSubmit">
            <UFormGroup label="Inscrivez-vous à notre newsletter" :ui="{ container: 'mt-3' }">
              <UInput v-model="email" type="email" placeholder="Entrez votre email" :ui="{ icon: { trailing: { pointer: '' } } }" required size="xl" autocomplete="off" class="max-w-sm">
                <template #trailing>
                  <UButton type="submit" size="xs" :label="loading ? 'Inscription' : 'M\'inscrire'" :loading="loading" />
                </template>
              </UInput>
            </UFormGroup>
          </form>
        </template>
      </UFooterColumns>
    </template>

    <template #left>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Copyright © {{ new Date().getFullYear() }}. Tous droits réservés.
      </p>
    </template>

    <template #right>
      <UColorModeButton size="sm" />

      <UButton to="https://github.com/nuxt-ui-pro/landing" target="_blank" icon="i-simple-icons-github" aria-label="GitHub" color="gray" variant="ghost" />
    </template>
  </UFooter>
</template>
