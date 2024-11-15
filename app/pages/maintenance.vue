<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const HEALTH_CHECK_URL = '/up',
  HOME_URL = '/'

const client = useSanctumClient()
const { refreshIdentity } = useSanctumAuth()

const loading = ref(false)
const secondsBeforeRedirect = ref(0)
const canRedirect = computed(() => secondsBeforeRedirect.value === 0 && !loading.value)

const redirectButtonText = computed(() => canRedirect.value ? 'Réessayer' : 'Réessayer dans ' + secondsBeforeRedirect.value + 's')

const startTimer = () => {
  secondsBeforeRedirect.value = 5

  const interval = setInterval(() => {
    secondsBeforeRedirect.value--

    if (secondsBeforeRedirect.value === 0) clearInterval(interval)
  }, 1000)
}

const healthCheck = async () => {
  loading.value = true

  try {
    await client(HEALTH_CHECK_URL)

    try {
      await refreshIdentity()
    } catch {
      // Do nothing
    }

    await navigateTo(HOME_URL)
  } catch {
    startTimer()
  }

  loading.value = false
}

await useLazyAsyncData('healthcheck', healthCheck)
</script>

<template>
  <div class="flex flex-col gap-4 text-center">
    <strong class="text-2xl">
      Maintenance
    </strong>
    <p>
      Nous sommes actuellement en maintenance. Veuillez revenir plus tard.
    </p>

    <UButton
      :label="redirectButtonText"
      class="mx-auto mt-5"
      :disabled="!canRedirect"
      :loading="loading"
      @click="healthCheck"
    />
  </div>
</template>
