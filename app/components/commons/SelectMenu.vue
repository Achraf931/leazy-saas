<script setup lang="ts">
const { endpoint, placeholder, searchable_attributes = 'name' } = defineProps<{ endpoint: string, placeholder?: string, searchable_attributes?: string | string[] }>()

const { get } = useApi(endpoint)
const loading = ref(false)
const selected = ref([])
const emit = defineEmits(['update:modelValue'])

const search = async (q: string) => {
  if (loading.value) return

  loading.value = true

  const items: any[] = await get(null, { q })

  loading.value = false

  return 'data' in items ? items.data : items
}
</script>

<template>
  <ClientOnly>
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
        :searchable-lazy="true"
        @change="emit('update:modelValue', selected)"
    >
      <template #label>
        <span v-if="selected.length" class="truncate">{{ placeholder }}: {{ selected.length }}</span>
      </template>
    </USelectMenu>
  </ClientOnly>
</template>
