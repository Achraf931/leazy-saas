<script lang="ts" setup>
import type { User } from '~/types'

const defaultColumns = [{
  key: 'id',
  label: '#'
}, {
  key: 'name',
  label: 'Nom',
  sortable: true
}, {
  key: 'email',
  label: 'Email',
  sortable: true
}, {
  key: 'status',
  label: 'Statut'
}]

const q = ref('')
const selected = ref<User[]>([])
const selectedColumns = ref(defaultColumns)
const selectedStatuses = ref([])
const sort = ref({ column: 'id', direction: 'asc' as const })
const input = ref<{ input: HTMLInputElement }>()
const isNewUserModalOpen = ref(false)

const columns = computed(() => defaultColumns.filter((column) => selectedColumns.value.includes(column)))

const query = computed(() => ({ q: q.value, statuses: selectedStatuses.value, sort: sort.value.column, order: sort.value.direction }))

const { data: users, pending } = await useFetch<User[]>('/api/users', { query, default: () => [] })

const defaultStatuses = users.value.reduce((acc, user) => {
  if (!acc.includes(user.status)) {
    acc.push(user.status)
  }
  return acc
}, [] as string[])

defineShortcuts({
  '/': () => {
    input.value?.input?.focus()
  }
})
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Cours" badge="Vendredi 7 Juin 2024">
        <template #right>
          <UInput
              ref="input"
              v-model="q"
              icon="i-heroicons-funnel"
              autocomplete="off"
              placeholder="Filter users..."
              class="hidden lg:block"
              @keydown.esc="$event.target.blur()"
          >
            <template #trailing>
              <UKbd value="/" />
            </template>
          </UInput>
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <USelectMenu
              v-model="selectedStatuses"
              icon="i-heroicons-check-circle"
              placeholder="Statuts"
              multiple
              :options="defaultStatuses"
              :ui-menu="{ option: { base: 'capitalize' } }"
          />
        </template>

        <template #right>
          <USelectMenu v-model="selectedColumns" icon="i-heroicons-adjustments-horizontal-solid" :options="defaultColumns" multiple class="hidden lg:block">
            <template #label>
              Affichage
            </template>
          </USelectMenu>
        </template>
      </UDashboardToolbar>

      <UDashboardModal v-model="isNewUserModalOpen" title="New user" description="Add a new user to your database" :ui="{ width: 'sm:max-w-md' }">
        <!-- ~/components/users/UsersForm.vue -->
        <UsersForm @close="isNewUserModalOpen = false" />
      </UDashboardModal>

      <UTable
          v-model="selected"
          v-model:sort="sort"
          :rows="users"
          :columns="columns"
          :loading="pending"
          sort-mode="manual"
          class="w-full"
          :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
      >
        <template #name-data="{ row }">
          <div class="flex items-center gap-3">
            <UAvatar v-bind="row.avatar" :alt="row.name" size="xs" />

            <span class="text-gray-900 dark:text-white font-medium">{{ row.name }}</span>
          </div>
        </template>

        <template #status-data="{ row }">
          <div class="flex items-center gap-1.5">
            <UButton size="xs" color="green" icon="i-heroicons-check-circle" />

            <UButtonGroup size="xs" orientation="horizontal">
              <UButton label="Retard" color="orange" variant="soft" />
              <UPopover :popper="{ placement: 'bottom-end' }" :ui="{ base: 'p-1 flex gap-1' }">
                <UButton icon="i-heroicons-chevron-down-20-solid" variant="soft" color="orange" />

                <template #panel>
                  <UFormGroup label="Justificatif" :ui="{ container: 'flex gap-1 justify-center' }">
                    <UButton size="2xs" color="red" square variant="soft" class="rounded-md shrink" block icon="i-heroicons-x-circle" />
                    <UButton size="2xs" color="green" square variant="soft" class="rounded-md shrink" block icon="i-heroicons-check-circle" />
                  </UFormGroup>
                </template>
              </UPopover>
            </UButtonGroup>

            <UButtonGroup size="xs" orientation="horizontal">
              <UButton label="Absent" color="red" variant="soft" />
              <UPopover :popper="{ placement: 'bottom-end' }" :ui="{ base: 'p-1 flex gap-1' }">
                <UButton icon="i-heroicons-chevron-down-20-solid" variant="soft" color="red" />

                <template #panel>
                  <UFormGroup label="Justificatif" :ui="{ container: 'flex gap-1 justify-center' }">
                    <UButton size="2xs" color="red" square variant="soft" class="rounded-md shrink" block icon="i-heroicons-x-circle" />
                    <UButton size="2xs" color="green" square variant="soft" class="rounded-md shrink" block icon="i-heroicons-check-circle" />
                  </UFormGroup>
                </template>
              </UPopover>
            </UButtonGroup>
          </div>
        </template>
      </UTable>
    </UDashboardPanel>
  </UDashboardPage>
</template>
