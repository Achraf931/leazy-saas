<script lang="ts" setup>
import { CreateFormationModal } from '#components'

definePageMeta({
  title: 'Titre de la formation'
})

const modal = useModal()
const localePath = useLocalePath()
const { setBreadcrumbs } = useDashboard()
const subjects = ref([])
const classes = ref([])
const q = ref('')

const { data: formations, status } = await useFetch('/api/formations', { default: () => [] })

setBreadcrumbs([
  {
    label: 'Bibliothèque',
    to: localePath({ name: 'library' })
  },
  {
    label: 'Formations'
  }
])

// const formations = ref([
//   {
//     id: 1,
//     title: 'Introduction à la programmation',
//     description: 'Apprenez les bases de la programmation avec Python',
//     image: 'https://img-c.udemycdn.com/course/240x135/905844_be7b.jpg',
//     tags: ['Python', 'Débutant'],
//     to: localePath({ name: 'library-formations-id', params: { id: 1 } }),
//     edit: localePath({ name: 'library-formations-id-edit', params: { id: 1 } })
//   },
//   {
//     id: 2,
//     title: 'Développement web',
//     description: 'Apprenez à créer des sites web avec HTML, CSS et JavaScript',
//     image: 'https://img-c.udemycdn.com/course/240x135/1355250_4ec9_2.jpg',
//     tags: ['HTML', 'CSS', 'JavaScript', 'Débutant'],
//     to: localePath({ name: 'library-formations-id', params: { id: 2 } }),
//     edit: localePath({ name: 'library-formations-id-edit', params: { id: 2 } })
//   },
//   {
//     id: 3,
//     title: 'Développement mobile',
//     description: 'Apprenez à créer des applications mobiles avec React Native',
//     image: 'https://img-c.udemycdn.com/course/240x135/1659882_04d8_3.jpg',
//     tags: ['React Native', 'Mobile', 'Débutant'],
//     to: localePath({ name: 'library-formations-id', params: { id: 3 } }),
//     edit: localePath({ name: 'library-formations-id-edit', params: { id: 3 } })
//   },
//   {
//     id: 4,
//     title: 'Développement web avancé',
//     description: 'Apprenez à créer des sites web avancés avec React et Node.js',
//     image: 'https://img-c.udemycdn.com/course/240x135/2396488_7708_5.jpg',
//     tags: ['React', 'Node.js', 'Avancé'],
//     to: localePath({ name: 'library-formations-id', params: { id: 4 } }),
//     edit: localePath({ name: 'library-formations-id-edit', params: { id: 4 } })
//   },
//   {
//     id: 5,
//     title: 'Développement mobile avancé',
//     description: 'Apprenez à créer des applications mobiles avancées avec Flutter',
//     image: 'https://img-c.udemycdn.com/course/240x135/1670100_9b0d.jpg',
//     tags: ['Flutter', 'Mobile', 'Avancé'],
//     to: localePath({ name: 'library-formations-id', params: { id: 5 } }),
//     edit: localePath({ name: 'library-formations-id-edit', params: { id: 5 } })
//   }
// ])

const handleModal = () => {
  modal.open(CreateFormationModal, {
    onClose: () => modal.close()
  })
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardToolbar>
        <template #left>
          <UInput v-model="q" icon="i-heroicons-magnifying-glass" placeholder="Rechercher une formation" />
        </template>
        
        <template #right>
          <Suspense>
            <FilterSelectMenu endpoint="subjects" placeholder="Matières" @update:model-value="subjects = $event" />
          </Suspense>
          <Suspense>
            <FilterSelectMenu endpoint="classes" placeholder="Classes" @update:model-value="classes = $event" />
          </Suspense>
          
          <UButton color="primary" icon="i-heroicons-plus" label="Créer une formation" @click="handleModal" />
        </template>
      </UDashboardToolbar>
      
      <UDashboardPanelContent>
        <p
          v-if="status !== 'pending' && !formations.length"
          class="text-center text-gray-400 dark:text-white text-sm mt-4"
        >Aucune leçon trouvée</p>
        <UBlogList
          :ui="{ wrapper: 'p-px overflow-y-auto gap-4 sm:grid sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' }"
          orientation="horizontal"
        >
          <template v-if="status === 'pending'">
            <USkeleton v-for="n in 5" :key="n" class="rounded-lg w-full h-40 sm:h-44 xl:h-48 2xl:h-52" />
          </template>
          <template v-else-if="status !== 'pending' && formations.length">
            <FormationCard
              v-for="formation in formations"
              :key="formation.id"
              :formation
            />
          </template>
        </UBlogList>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
