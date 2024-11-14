<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const HEALTH_CHECK_URL = '/up',
  HOME_URL = '/'

const client = useSanctumClient()
const { refreshIdentity } = useSanctumAuth()

const secondesBeforeRedirect = ref(0)
const canRedirect = computed(() => secondesBeforeRedirect.value === 0)

const redirectButtonText = computed(() => canRedirect.value ? 'Réessayer' : 'Réessayer dans ' + secondesBeforeRedirect.value + 's')

const startTimer = () => {
  secondesBeforeRedirect.value = 5

  const interval = setInterval(() => {
    secondesBeforeRedirect.value--

    if (secondesBeforeRedirect.value === 0) clearInterval(interval)
  }, 1000)
}

const healthCheck = async () => {
  try {
    await client(HEALTH_CHECK_URL)

    try {
      await refreshIdentity()
    } catch {
      // Do nothing
    }

    navigateTo(HOME_URL)
  } catch {
    startTimer()
  }
}
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
      @click="healthCheck"
    />
  </div>
</template>
