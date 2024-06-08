<script setup lang="ts">
const lessons = [{
  id: 1,
  name: 'Lesson 1',
  description: 'Description of lesson 1',
  created_at: '2021-10-01',
  visible: true,
}, {
  id: 2,
  name: 'Lesson 2',
  description: 'Description of lesson 2',
  created_at: '2021-10-02',
  visible: true,
}, {
  id: 3,
  name: 'Lesson 3',
  description: 'Description of lesson 3',
  created_at: '2021-10-03',
  visible: true,
}, {
  id: 4,
  name: 'Lesson 4',
  description: 'Description of lesson 4',
  created_at: '2021-10-04',
  visible: true,
}, {
  id: 5,
  name: 'Lesson 5',
  description: 'Description of lesson 5',
  created_at: '2021-10-05',
  visible: true,
}]

const columns = [{
  key: 'id',
  label: '#',
  sortable: true
}, {
  key: 'title',
  label: 'Title',
  sortable: true
}, {
  key: 'completed',
  label: 'Status',
  sortable: true
}, {
  key: 'actions',
  label: 'Actions',
  sortable: false
}]

const selectedColumns = ref(columns)
const columnsTable = computed(() => columns.filter((column) => selectedColumns.value.includes(column)))

// Selected Rows
const selectedRows = ref([])

function select (row) {
  const index = selectedRows.value.findIndex((item) => item.id === row.id)
  if (index === -1) {
    selectedRows.value.push(row)
  } else {
    selectedRows.value.splice(index, 1)
  }
}

// Actions
const actions = [
  [{
    key: 'completed',
    label: 'Completed',
    icon: 'i-heroicons-check'
  }], [{
    key: 'uncompleted',
    label: 'In Progress',
    icon: 'i-heroicons-arrow-path'
  }]
]

// Filters
const todoStatus = [{
  key: 'uncompleted',
  label: 'In Progress',
  value: false
}, {
  key: 'completed',
  label: 'Completed',
  value: true
}]

const search = ref('')
const selectedStatus = ref([])
const searchStatus = computed(() => {
  if (selectedStatus.value?.length === 0) {
    return ''
  }

  if (selectedStatus?.value?.length > 1) {
    return `?completed=${selectedStatus.value[0].value}&completed=${selectedStatus.value[1].value}`
  }

  return `?completed=${selectedStatus.value[0].value}`
})

const resetFilters = () => {
  search.value = ''
  selectedStatus.value = []
}

// Pagination
const sort = ref({ column: 'id', direction: 'asc' as const })
const page = ref(1)
const pageCount = ref(10)
const pageTotal = ref(200) // This value should be dynamic coming from the API
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1)
const pageTo = computed(() => Math.min(page.value * pageCount.value, pageTotal.value))

// Data
const { data: todos, pending } = await useLazyAsyncData<{
  id: number
  title: string
  completed: string
}[]>('todos', () => ($fetch as any)(`https://jsonplaceholder.typicode.com/todos${searchStatus.value}`, {
  query: {
    q: search.value,
    '_page': page.value,
    '_limit': pageCount.value,
    '_sort': sort.value.column,
    '_order': sort.value.direction
  }
}), {
  default: () => [],
  watch: [page, search, searchStatus, pageCount, sort]
})
</script>

<template>
  <UDashboardPage :ui="{ wrapper: 'overflow-hidden' }">
      <UDashboardPanelContent>
        <div class="w-full flex items-center justify-between mb-4">
          <h1 class="font-bold text-xl">Chapitres</h1>

          <div v-if="true" class="flex items-center justify-end gap-1">
            <UTooltip text="Chapitre précédent" :popper="{ placement: 'top' }">
              <UButton :disabled="true" variant="solid" color="white" square>
                <UIcon name="i-heroicons-chevron-left" />
              </UButton>
            </UTooltip>
            <UTooltip text="Chapitre suivant" :popper="{ placement: 'top' }">
              <UButton :disabled="false" variant="solid" color="primary" square>
                <UIcon name="i-heroicons-chevron-right" />
              </UButton>
            </UTooltip>
            <UTooltip text="Menu" :popper="{ placement: 'top' }">
              <UButton variant="solid" color="white" square>
                <UIcon name="i-heroicons-ellipsis-horizontal" />
              </UButton>
            </UTooltip>
          </div>
        </div>

        <section class="flex-1 flex flex-col md:flex-row gap-5 p-px overflow-hidden w-full">
          <div class="flex flex-col gap-3">
            <NuxtImg
              src="https://source.unsplash.com/random/800x600"
              alt="Random image"
              class="rounded-lg w-full aspect-video max-w-auto md:max-w-72"
              layout="responsive"
            />

            <p class="text-sm">Chapter description</p>
            <p class="text-sm">Crée le 01/10/2021</p>
          </div>

          <UCard :ui="{ base: 'overflow-scroll flex-1' }">
            <UForm class="space-y-3">
              <h3 class="font-semibold">Détails</h3>
              <UFormGroup label="Titre">
                <UInput placeholder="Titre du chapitre" />
              </UFormGroup>
              <UFormGroup label="Description">
                <UTextarea placeholder="Description du chapitre" />
              </UFormGroup>
              <UFormGroup label="Thème associé">
                <USelect :options="['Option 1', 'Option 2', 'Option 3']" />
              </UFormGroup>
              <UButton size="xs" label="Sauvegarder" />
            </UForm>

            <UDivider orientation="horizontal" class="w-full my-5" />

            <UFormGroup label="Leçons">
              <UCard
                  class="w-full"
                  :ui="{
                  divide: 'divide-y divide-gray-200 dark:divide-gray-700',
                  header: { padding: 'px-4 py-5' },
                  body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
                  footer: { padding: 'p-4' }
                }"
              >
                <!-- Filters -->
                <div class="flex items-center justify-between gap-3 px-4 py-3">
                  <UInput v-model="search" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Search..." />

                  <USelectMenu v-model="selectedStatus" :options="todoStatus" multiple placeholder="Status" class="w-40" />
                </div>

                <!-- Header and Action buttons -->
                <div class="flex justify-between items-center w-full px-4 py-3">
                  <div class="flex items-center gap-1.5">
                    <span class="text-sm leading-5">Leçons par page:</span>

                    <USelect
                        v-model="pageCount"
                        :options="[3, 5, 10, 20, 30, 40]"
                        class="me-2 w-20"
                        size="xs"
                    />
                  </div>

                  <div class="flex gap-1.5 items-center">
                    <UDropdown v-if="selectedRows.length > 1" :items="actions" :ui="{ width: 'w-36' }">
                      <UButton
                          icon="i-heroicons-chevron-down"
                          trailing
                          color="gray"
                          size="xs"
                      >
                        Mark as
                      </UButton>
                    </UDropdown>

                    <USelectMenu v-model="selectedColumns" :options="columns" multiple>
                      <UButton
                          icon="i-heroicons-view-columns"
                          color="gray"
                          size="xs"
                      >
                        Columns
                      </UButton>
                    </USelectMenu>

                    <UButton
                        icon="i-heroicons-funnel"
                        color="gray"
                        size="xs"
                        :disabled="search === '' && selectedStatus.length === 0"
                        @click="resetFilters"
                    >
                      Reset
                    </UButton>
                  </div>
                </div>

                <!-- Table -->
                <UTable
                    v-model="selectedRows"
                    v-model:sort="sort"
                    :rows="todos"
                    :columns="columnsTable"
                    :loading="pending"
                    sort-asc-icon="i-heroicons-arrow-up"
                    sort-desc-icon="i-heroicons-arrow-down"
                    sort-mode="manual"
                    class="w-full"
                    :ui="{ td: { base: 'max-w-[0] truncate', padding: 'px-2 py-2' }, th: { padding: 'px-2 py-1.5' }, default: { checkbox: { color: 'gray' } } }"
                    @select="select"
                >
                  <template #completed-data="{ row }">
                    <UBadge size="xs" :label="row.completed ? 'Completed' : 'In Progress'" :color="row.completed ? 'emerald' : 'orange'" variant="subtle" />
                  </template>

                  <template #actions-data="{ row }">
                    <UButton
                        v-if="!row.completed"
                        icon="i-heroicons-check"
                        size="2xs"
                        color="emerald"
                        variant="outline"
                        :ui="{ rounded: 'rounded-full' }"
                        square
                    />

                    <UButton
                        v-else
                        icon="i-heroicons-arrow-path"
                        size="2xs"
                        color="orange"
                        variant="outline"
                        :ui="{ rounded: 'rounded-full' }"
                        square
                    />
                  </template>
                </UTable>

                <!-- Number of rows & Pagination -->
                <template #footer>
                  <div class="flex flex-wrap justify-between items-center">
                    <div>
          <span class="text-sm leading-5">
            Showing
            <span class="font-medium">{{ pageFrom }}</span>
            to
            <span class="font-medium">{{ pageTo }}</span>
            of
            <span class="font-medium">{{ pageTotal }}</span>
            results
          </span>
                    </div>

                    <UPagination
                        v-model="page"
                        :page-count="pageCount"
                        :total="pageTotal"
                        size="2xs"
                    />
                  </div>
                </template>
              </UCard>
            </UFormGroup>
          </UCard>
        </section>
      </UDashboardPanelContent>
  </UDashboardPage>
</template>
