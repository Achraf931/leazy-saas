<script setup lang="ts">
const { endpoint, placeholder, searchable_attributes = 'name' } = defineProps<{ endpoint: string, placeholder?: string, searchable_attributes?: string | string[] }>()

const { get } = useApi(endpoint)
const loading = ref(false)
const selected = ref([])

const search = async (q: string) => {
  loading.value = true

  const users: any[] = await get(null, { q })

  loading.value = false

  return 'data' in users ? users.data : users
}
</script>

<template>
  <USelectMenu
    v-model="selected"
    class="w-32"
    :loading
    :searchable="search"
    searchable-placeholder="Rechercher..."
    :placeholder="placeholder ?? 'Sélectionner'"
    :option-attribute="searchable_attributes"
    multiple
    trailing
    by="id"
    :debounce="1000"
  >
    <template #label>
      <span v-if="selected.length" class="truncate">{{ placeholder }}: {{ selected.length }}</span>
    </template>
  </USelectMenu>
</template>
