<script setup lang="ts">
interface Props {
  endpoint: string
  placeholder?: string
  searchable_attributes?: string | string[]
}

const {
  endpoint,
  placeholder,
  searchable_attributes = 'name'
} = defineProps<Props>()

const { get } = useApi(endpoint)
const loading = ref(false)
const selected = ref([])
const emit = defineEmits(['update:modelValue'])

const searchable = async (q: string) => {
  if (loading.value) return

  loading.value = true
  const items: any[] = await get(null, { q })
  loading.value = false

  return 'data' in items ? items.data : items
}
</script>

<template>
  <USelectMenu
    :model-value="selected"
    class="w-32"
    :loading
    :searchable="searchable"
    searchable-placeholder="Rechercher..."
    :placeholder="placeholder ?? 'Sélectionner'"
    :option-attribute="searchable_attributes"
    multiple
    trailing
    by="id"
    :searchable-lazy="true"
    @update:model-value="(val) => { selected = val; emit('update:modelValue', val) }"
  >
    <template #label>
      <span
        v-if="selected.length"
        class="truncate"
      >
        {{ placeholder }}: {{ selected.length }}
      </span>
    </template>
  </USelectMenu>
</template>
