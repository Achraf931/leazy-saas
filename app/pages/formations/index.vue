<script setup lang="ts">
const localePath = useLocalePath()

const subjects = ref([])
const classes = ref([])

const items = [{
  slot: 'all',
  label: 'Tous les cours'
}, {
  slot: 'in-progress',
  label: 'En cours'
}, {
  slot: 'completed',
  label: 'Terminés'
}]

const categories = [
  { title: 'Non commencés', filter: course => course.progress === 0 },
  { title: 'En cours', filter: course => course.progress > 0 && course.progress < 100 },
  { title: 'Terminés', filter: course => course.progress === 100 }
]

const formations = ref([
  {
    id: 1,
    title: 'Introduction à la programmation',
    description: 'Apprenez les bases de la programmation avec Python',
    tags: ['Python', 'Débutant'],
    progress: 0,
    to: localePath({ name: 'formations-id', params: { id: 1 } }),
    edit: localePath({ name: 'formations-id-edit', params: { id: 1 } })
  },
  {
    id: 2,
    title: 'Développement web',
    description: 'Apprenez à créer des sites web avec HTML, CSS et JavaScript',
    tags: ['HTML', 'CSS', 'JavaScript', 'Débutant'],
    progress: 50,
    to: localePath({ name: 'formations-id', params: { id: 2 } }),
    edit: localePath({ name: 'formations-id-edit', params: { id: 2 } })
  },
  {
    id: 3,
    title: 'Développement mobile',
    description: 'Apprenez à créer des applications mobiles avec React Native',
    tags: ['React Native', 'Mobile', 'Débutant'],
    progress: 100,
    to: localePath({ name: 'formations-id', params: { id: 3 } }),
    edit: localePath({ name: 'formations-id-edit', params: { id: 3 } })
  },
  {
    id: 4,
    title: 'Développement web avancé',
    description: 'Apprenez à créer des sites web avancés avec React et Node.js',
    tags: ['React', 'Node.js', 'Avancé'],
    progress: 0,
    to: localePath({ name: 'formations-id', params: { id: 4 } }),
    edit: localePath({ name: 'formations-id-edit', params: { id: 4 } })
  },
  {
    id: 5,
    title: 'Développement mobile avancé',
    description: 'Apprenez à créer des applications mobiles avancées avec Flutter',
    tags: ['Flutter', 'Mobile', 'Avancé'],
    progress: 0,
    to: localePath({ name: 'formations-id', params: { id: 5 } }),
    edit: localePath({ name: 'formations-id-edit', params: { id: 5 } })
  }
])
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar>
        <template #left>
          <ToggleDrawer title="Formations" />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <UInput v-model="q" icon="i-heroicons-magnifying-glass" placeholder="Rechercher une formation" />
        </template>

        <template #right>
          <CommonsSelectMenu @update:model-value="subjects = $event" endpoint="subjects" placeholder="Matières" />
          <CommonsSelectMenu @update:model-value="classes = $event" endpoint="classes" placeholder="Classes" />

          <UButton :to="localePath({ name: 'formations-new' })" label="Créer une formation" color="primary" icon="i-heroicons-plus" />
        </template>
      </UDashboardToolbar>

      <UDashboardPanelContent class="text-sm">
        <UTabs :items :ui="{ list: { width: 'w-auto' } }">
          <template #all>
            <div v-for="category in categories" :key="category.title" class="mb-4">
              <h3 class="font-bold mt-4 mb-2">{{ category.title }}</h3>
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                <FormationsCard
                    v-for="formation in formations.filter(category.filter)"
                    :key="formation.id"
                    :formation
                />
              </div>
            </div>
          </template>

          <template #in-progress>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              <FormationsCard
                  v-for="formation in formations.filter(formation => (formation.progress > 0 && formation.progress < 100))"
                  :key="formation.id"
                  :formation
              />
            </div>
          </template>

          <template #completed>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              <FormationsCard
                  v-for="formation in formations.filter(formation => formation.progress === 100)"
                  :key="formation.id"
                  :formation
              />
            </div>
          </template>
        </UTabs>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>