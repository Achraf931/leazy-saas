<script setup>
import { useDebounce } from '@vueuse/core'
import { sub } from 'date-fns'

const localePath = useLocalePath()

const q = ref('')

const isOpen = ref(false)

const links = [
  {
    label: 'Bibliothèque',
    to: localePath({ name: 'library' })
  },
  {
    label: 'Leçons',
    to: localePath({ name: 'library-lessons' })
  }
]

const lessons = ref([
  {
    src: "https://images.unsplash.com/photo-1558637845-c8b7ead71a3e?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Introduction à la programmation",
    description: "Apprenez les concepts de base de la programmation et la logique derrière les langages de programmation.",
    published: false,
    link: localePath({ name: 'library-lessons-id_slug', params: { id: 1, slug: 'test' } })
  }, {
    src: "https://images.unsplash.com/photo-1580757468214-c73f7062a5cb?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Manipulation des données avec Python",
    description: "Découvrez comment utiliser Python pour manipuler et analyser des données.",
    published: false,
    link: localePath({ name: 'library-lessons-id_slug', params: { id: 1, slug: 'test' } })
  }, {
    src: "https://images.unsplash.com/photo-1594568284297-7c64464062b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Création de sites Web avec HTML et CSS",
    description: "Apprenez à créer des sites Web statiques en utilisant HTML pour la structure et CSS pour le style.",
    published: true,
    link: localePath({ name: 'library-lessons-id_slug', params: { id: 1, slug: 'test' } })
  }, {
    src: "https://images.unsplash.com/photo-1599454100789-b211e369bd04?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Introduction à la conception graphique",
    description: "Découvrez les principes fondamentaux de la conception graphique et apprenez à créer des designs attrayants.",
    published: true,
    link: localePath({ name: 'library-lessons-id_slug', params: { id: 1, slug: 'test' } })
  }, {
    src: "https://images.unsplash.com/photo-1626593261859-4fe4865d8cb1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Apprentissage automatique avec Python",
    description: "Explorez les concepts de base de l'apprentissage automatique et apprenez à créer des modèles prédictifs avec Python.",
    published: false,
    link: localePath({ name: 'library-lessons-id_slug', params: { id: 1, slug: 'test' } })
  }, {
    src: "https://images.unsplash.com/photo-1603486002664-a7319421e133?q=80&w=2142&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Développement d'applications mobiles avec React Native",
    description: "Apprenez à créer des applications mobiles multiplateformes avec React Native, un framework JavaScript.",
    published: true,
    link: localePath({ name: 'library-lessons-id_slug', params: { id: 1, slug: 'test' } })
  }, {
    src: "https://images.unsplash.com/photo-1595835018349-198460e1d309?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Introduction au cloud computing",
    description: "Découvrez les bases du cloud computing et apprenez à déployer des applications dans le cloud.",
    published: false,
    link: localePath({ name: 'library-lessons-id_slug', params: { id: 1, slug: 'test' } })
  },
  {
    src: "https://images.unsplash.com/photo-1559511331-6a3a4e72f588?q=80&w=2147&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Principes fondamentaux de la sécurité informatique",
    description: "Explorez les principes de base de la sécurité informatique et apprenez à protéger vos données contre les menaces en ligne.",
    published: false,
    link: localePath({ name: 'library-lessons-id_slug', params: { id: 1, slug: 'test' } })
  },
  {
    src: "https://images.unsplash.com/photo-1599154456742-c82164d2dfb0?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Introduction à l'analyse de données",
    description: "Découvrez les outils et les techniques utilisés pour analyser et interpréter les données afin de prendre des décisions éclairées.",
    published: true,
    link: localePath({ name: 'library-lessons-id_slug', params: { id: 1, slug: 'test' } })
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1701757034308-0bd354a91537?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Conception de bases de données relationnelles",
    description: "Apprenez à concevoir des bases de données relationnelles efficaces pour stocker et gérer des données structurées.",
    published: true,
    link: localePath({ name: 'library-lessons-id_slug', params: { id: 1, slug: 'test' } })
  },
  {
    src: "https://images.unsplash.com/photo-1605804097539-f7b052b4960d?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Déploiement d'applications avec Docker",
    description: "Apprenez à utiliser Docker pour créer, déployer et exécuter des applications dans des conteneurs légers et portables.",
    published: true,
    link: localePath({ name: 'library-lessons-id_slug', params: { id: 1, slug: 'test' } })
  },
  {
    src: "https://images.unsplash.com/photo-1603550489068-68e60062b3f9?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Création d'API RESTful avec Node.js",
    description: "Apprenez à créer des services web RESTful efficaces en utilisant Node.js, Express et MongoDB.",
    published: true,
    link: localePath({ name: 'library-lessons-id_slug', params: { id: 1, slug: 'test' } })
  },
  {
    src: "https://images.unsplash.com/photo-1602826347632-fc49a8675be6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Introduction au développement agile",
    description: "Découvrez les principes et les pratiques du développement agile pour livrer rapidement des logiciels de haute qualité.",
    published: false,
    link: localePath({ name: 'library-lessons-id_slug', params: { id: 1, slug: 'test' } })
  },
  {
    src: "https://images.unsplash.com/photo-1617391766038-970a91689241?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Introduction à l'intelligence artificielle",
    description: "Explorez les bases de l'intelligence artificielle et découvrez comment elle est utilisée pour résoudre des problèmes complexes.",
    published: true,
    link: localePath({ name: 'library-lessons-id_slug', params: { id: 1, slug: 'test' } })
  },
  {
    src: "https://images.unsplash.com/flagged/photo-1556669546-b1f29875df1c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Introduction à la cybersécurité",
    description: "Découvrez les menaces de cybersécurité courantes et apprenez à protéger vos systèmes et vos données contre les attaques.",
    published: true,
    link: localePath({ name: 'library-lessons-id_slug', params: { id: 1, slug: 'test' } })
  }
])

const currentProvider = ref('unsplash')
const searchQuery = ref('')
const isLoading = ref(false)
const debounced = useDebounce(searchQuery, 1000)
const results = ref([])

watch(debounced, async () => {
  isLoading.value = true
  const { results: resultsQuery } = await useSearchMedia(currentProvider.value, searchQuery.value, null)
  results.value = resultsQuery.value
  isLoading.value = false
})

const range = ref({ start: sub(new Date(), { days: 14 }), end: new Date() })
const period = ref('daily')

const selected = ref([])
const selectedThemes = ref([])
const chapters = [
  { label: 'Chapter 1', value: 'chapter-1' },
  { label: 'Chapter 2', value: 'chapter-2' },
  { label: 'Chapter 3', value: 'chapter-3' },
  { label: 'Chapter 4', value: 'chapter-4' }
]
const themes = [
  { label: 'Theme 1', value: 'theme-1' },
  { label: 'Theme 2', value: 'theme-2' },
  { label: 'Theme 3', value: 'theme-3' },
  { label: 'Theme 4', value: 'theme-4' }
]

const filteredLessons = computed(() => {
  return lessons.value.filter(lesson => {
    return lesson.label.search(new RegExp(q.value, 'i')) !== -1 || lesson.description.search(new RegExp(q.value, 'i')) !== -1
  })
})
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar>
        <template v-slot:title>
          <ToggleDrawer />
          <UBreadcrumb :links="links" />
        </template>
        <template #right>
          <UButton trailing-icon="i-heroicons-plus" @click="isOpen = true" label="Créer une leçon" />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <UInput v-model="q" icon="i-heroicons-magnifying-glass" placeholder="Rechercher une leçon" />

          <!-- ~/components/home/HomeDateRangePicker.vue -->
          <HomeDateRangePicker v-model="range" class="ml-2.5" />
        </template>

        <template #right>
          <USelectMenu v-slot="{ open }" v-model="selectedThemes" :options="themes" option-attribute="label" multiple placeholder="Select chapters">
            <UButton color="gray" :label="'Themes: ' + selectedThemes.length">
              <template #trailing>
                <UIcon name="i-heroicons-chevron-right-20-solid" :class="[open && 'transform rotate-90']" />
              </template>
            </UButton>
          </USelectMenu>

          <USelectMenu v-slot="{ open }" v-model="selected" :options="chapters" option-attribute="label" multiple placeholder="Select chapters">
            <UButton color="gray" :label="'Chapters: ' + selected.length">
              <template #trailing>
                <UIcon name="i-heroicons-chevron-right-20-solid" :class="[open && 'transform rotate-90']" />
              </template>
            </UButton>
          </USelectMenu>
        </template>
      </UDashboardToolbar>

      <UDashboardPanelContent>
        <UBlogList orientation="horizontal" :ui="{ wrapper: 'p-px overflow-y-auto gap-4 sm:grid sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5' }">
<!--          <UBlogPost :ui="{ wrapper: 'gap-y-3', title: 'text-sm', date: 'text-xs', authors: { wrapper: 'mt-0' }, image: { wrapper: 'ring-0 border border-dashed border-gray-200 group-hover:border-gray-300' } }">
            <template #image>
              <div class="flex flex-col items-center justify-center h-full">
                <UIcon name="i-heroicons-plus" class="w-20 h-20 text-gray-200 group-hover:text-gray-300" />
              </div>
            </template>
            <template #default>
              <h2 class="text-gray-400 dark:text-white font-semibold truncate group-hover:text-gray-00 dark:group-hover:text-gray-300 transition-colors duration-200 text-sm">Créer une nouvelle leçon</h2>
            </template>
          </UBlogPost>-->

          <UBlogPost v-for="(lesson, index) in filteredLessons" :key="index" :to="lesson.link" :ui="{ wrapper: 'gap-y-3', title: 'text-sm', date: 'text-xs', authors: { wrapper: 'mt-0' }, image: { wrapper: 'pointer-events-auto' }, badge: { wrapper: 'absolute top-2 left-2.5 mb-0 py-0' } }">
            <template #badge>
              <UBadge variant="solid" :color="lesson.published ? 'green' : 'primary'" size="xs">{{ lesson.published ? 'Publié' : 'Brouillon' }}</UBadge>
            </template>
            <template #image>
              <img class="cursor-pointer block object-cover object-top w-full h-full transform transition-transform duration-200 hover:scale-105" :src="lesson.src" :alt="lesson.label">
            </template>
            <template #default>
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-gray-900 dark:text-white font-semibold line-clamp-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200 text-sm">{{ lesson.label }}</h2>
                  <p class="line-clamp-2 text-gray-400 text-xs mt-0.5">{{ lesson.description }}</p>
                </div>
                <UDropdown :ui="{ wrapper: 'absolute top-2.5 right-2.5', item: { size: 'text-xs' }, width: 'w-auto' }" :items="[[{ label: 'Renommer', icon: 'i-heroicons-pencil-square' }, { label: 'Supprimer', icon: 'i-heroicons-trash', color: 'red' }]]" :popper="{ placement: 'bottom-end' }">
                  <UButton icon="i-heroicons-ellipsis-horizontal" variant="soft" color="gray" :padded="false" />
                </UDropdown>
              </div>
            </template>
          </UBlogPost>
        </UBlogList>
      </UDashboardPanelContent>

      <div class="p-2.5 flex items-center justify-center border-t border-gray-200">
        <UPagination size="xs" :page-count="5" :total="100" :model-value="1" />
      </div>
    </UDashboardPanel>

    <UDashboardModal prevent-close v-model="isOpen" title="Créer une leçon" :ui="{ width: 'sm:max-w-md' }">
      <UForm class="space-y-4">
        <UFormGroup label="Titre" name="title">
          <UInput type="text" placeholder="Titre de la leçon" autofocus />
        </UFormGroup>

        <UFormGroup label="Description (optionnelle)" name="description">
          <UTextarea placeholder="Description de la leçon" />
        </UFormGroup>

        <div class="flex justify-end gap-3">
          <UButton label="Annuler" color="gray" variant="ghost" @click="isOpen = false" />
          <UButton :loading="true" type="submit" label="Créer" color="black" />
        </div>
      </UForm>
    </UDashboardModal>
  </UDashboardPage>
</template>

<style scoped>
.masonry {
  column-count: 2;
}
</style>
