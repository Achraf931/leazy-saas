<script lang="ts" setup>
import data from '@/data'

const tiptap = useTemplateRef('tiptap')
const qrOpen = ref(false)

const editor = computed(() => tiptap.value?.editor as EditorType)

const tabItems = [{
  label: 'Emargement'
}, {
  label: 'Leçon'
}]

const route = useRoute()
const router = useRouter()

const selectedTab = computed({
  get () {
    const index = tabItems.findIndex((item) => item.label === route.query.tab)
    if (index === -1) {
      return 0
    }

    return index
  },
  set (value) {
    router.replace({ query: { tab: tabItems[value].label } })
  }
})

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
const selected = ref([])
const selectedColumns = ref(defaultColumns)
const selectedStatuses = ref([])
const sort = ref({ column: 'id', direction: 'asc' as const })
const input = ref<{ input: HTMLInputElement }>()

const columns = computed(() => defaultColumns.filter((column) => selectedColumns.value.includes(column)))

const query = computed(() => ({ q: q.value, statuses: selectedStatuses.value, sort: sort.value.column, order: sort.value.direction }))

const { data: users, pending } = await useFetch('/api/users', { query, default: () => [] })

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

const lesson = data
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar :ui="{ left: 'items-center' }">
        <template #left>
          <ToggleDrawer />
          <h1 class="flex items-center gap-1.5 font-semibold text-gray-900 dark:text-white min-w-0">TPG - La seconde guerre mondiale</h1>
          <UBadge size="xs" label="Mercredi 12 Juin 2024" variant="subtle" />
          <NuxtImg src="/qr.png" alt="QR Code" width="20" height="20" class="cursor-pointer w-6 h-6" @click="qrOpen = true" />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <UTabs v-model="selectedTab" :items="tabItems" :ui="{ wrapper: '', list: { height: 'h-9', tab: { height: 'h-7', size: 'text-[13px]' } } }" />
        </template>
      </UDashboardToolbar>

      <template v-if="selectedTab === 0">
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
        </UDashboardToolbar>

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
          <template #caption>
            <caption class="font-semibold my-1">Terminal Production Graphique</caption>
          </template>
          <template #status-data="{ row }">
            <div class="flex items-center gap-1.5">
              <UButton label="Présent" color="green" variant="soft" size="xs" />

              <UButton label="Retard" color="orange" variant="soft" size="xs" />

              <UButton label="Absent" color="red" variant="soft" size="xs" />
            </div>
          </template>
        </UTable>

        <UModal v-model="qrOpen">
          <UCard>
            <div class="flex items-start justify-between gap-x-1.5 pb-5">
              <p class="text-gray-900 dark:text-white font-semibold">Scannez ma présence</p>
              <UButton icon="i-heroicons-x-mark" color="gray" variant="ghost" @click="qrOpen = false" class="ml-auto" />
            </div>
            <NuxtImg src="/qr.png" alt="QR Code" class="w-full" />
          </UCard>
        </UModal>
      </template>
      <template v-else>
        <UDashboardPanelContent v-if="lesson" :ui="{ wrapper: 'p-0' }">
          <div class="px-4 lg:px-[calc((100%_-_(700px))_/_2)] mt-[25px]">
            <h3 class="empty:before:content-['Titre de la leçon'] empty:before:pointer-events-none empty:before:text-[#adb5bd] font-bold text-3xl tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl outline-none ring-none">{{ lesson.name }}</h3>
            <p v-if="lesson.description" class="my-4">{{ lesson.description }}</p>
          </div>

          <LeazyEditor ref="tiptap" v-model="lesson.content" content-class="sidepanelLesson" :editable="false" :disabled="true" :hideToolbar="true" :hideBubble="true" max-width="750" />
        </UDashboardPanelContent>
      </template>
    </UDashboardPanel>
  </UDashboardPage>
</template>
