<script setup lang="ts">
const modal = reactive({
  template: null,
  open: false
})
const templates = ref([
  {
    id: 1,
    title: 'Leçon de mathématiques',
    description: 'Une leçon de mathématiques pour les élèves de 6ème.',
    image: 'https://imgproxy.services.pitch.com/_/resizing_type:fit/plain/pitch-publish-user-assets/templates/posters/moodboard.jpg',
    author: {
      name: 'John Doe',
      avatar: {
        src: 'https://picsum.photos/560/400'
      }
    },
    badge: {
      size: 'xs',
      label: 'Mathématiques'
    }
  },
  {
    id: 2,
    title: 'Leçon de français',
    description: 'Une leçon de français pour les élèves de 6ème.',
    image: 'https://imgproxy.services.pitch.com/_/resizing_type:fit/plain/pitch-publish-user-assets/templates/posters/moodboard.jpg',
    author: {
      name: 'Jane Doe',
      avatar: {
        src: 'https://picsum.photos/560/400'
      }
    },
    badge: {
      size: 'xs',
      label: 'Français'
    }
  },
  {
    id: 3,
    title: 'Leçon de science',
    description: 'Une leçon de science pour les élèves de 6ème.',
    image: 'https://imgproxy.services.pitch.com/_/resizing_type:fit/plain/pitch-publish-user-assets/templates/posters/moodboard.jpg',
    author: {
      name: 'Alice Smith',
      avatar: {
        src: 'https://picsum.photos/560/400'
      }
    },
    badge: {
      size: 'xs',
      label: 'Science'
    }
  },
  {
    id: 4,
    title: 'Leçon d\'histoire',
    description: 'Une leçon d\'histoire pour les élèves de 6ème.',
    image: 'https://imgproxy.services.pitch.com/_/resizing_type:fit/plain/pitch-publish-user-assets/templates/posters/moodboard.jpg',
    author: {
      name: 'Bob Brown',
      avatar: {
        src: 'https://picsum.photos/560/400'
      }
    },
    badge: {
      size: 'xs',
      label: 'Histoire'
    }
  },
  {
    id: 5,
    title: 'Leçon de géographie',
    description: 'Une leçon de géographie pour les élèves de 6ème.',
    image: 'https://imgproxy.services.pitch.com/_/resizing_type:fit/plain/pitch-publish-user-assets/templates/posters/moodboard.jpg',
    author: {
      name: 'Carol White',
      avatar: {
        src: 'https://picsum.photos/560/400'
      }
    },
    badge: {
      size: 'xs',
      label: 'Géographie'
    }
  },
  {
    id: 6,
    title: 'Leçon de musique',
    description: 'Une leçon de musique pour les élèves de 6ème.',
    image: 'https://imgproxy.services.pitch.com/_/resizing_type:fit/plain/pitch-publish-user-assets/templates/posters/moodboard.jpg',
    author: {
      name: 'David Green',
      avatar: {
        src: 'https://picsum.photos/560/400'
      }
    },
    badge: {
      size: 'xs',
      label: 'Musique'
    }
  },
  {
    id: 7,
    title: 'Leçon d\'art',
    description: 'Une leçon d\'art pour les élèves de 6ème.',
    image: 'https://imgproxy.services.pitch.com/_/resizing_type:fit/plain/pitch-publish-user-assets/templates/posters/moodboard.jpg',
    author: {
      name: 'Eve Black',
      avatar: {
        src: 'https://picsum.photos/560/400'
      }
    },
    badge: {
      size: 'xs',
      label: 'Art'
    }
  },
  {
    id: 8,
    title: 'Leçon de sport',
    description: 'Une leçon de sport pour les élèves de 6ème.',
    image: 'https://imgproxy.services.pitch.com/_/resizing_type:fit/plain/pitch-publish-user-assets/templates/posters/moodboard.jpg',
    author: {
      name: 'Frank Blue',
      avatar: {
        src: 'https://picsum.photos/560/400'
      }
    },
    badge: {
      size: 'xs',
      label: 'Sport'
    }
  },
  {
    id: 9,
    title: 'Leçon de technologie',
    description: 'Une leçon de technologie pour les élèves de 6ème.',
    image: 'https://imgproxy.services.pitch.com/_/resizing_type:fit/plain/pitch-publish-user-assets/templates/posters/moodboard.jpg',
    author: {
      name: 'Grace Yellow',
      avatar: {
        src: 'https://picsum.photos/560/400'
      }
    },
    badge: {
      size: 'xs',
      label: 'Technologie'
    }
  },
  {
    id: 10,
    title: 'Leçon de chimie',
    description: 'Une leçon de chimie pour les élèves de 6ème.',
    image: 'https://imgproxy.services.pitch.com/_/resizing_type:fit/plain/pitch-publish-user-assets/templates/posters/moodboard.jpg',
    author: {
      name: 'Henry Orange',
      avatar: {
        src: 'https://picsum.photos/560/400'
      }
    },
    badge: {
      size: 'xs',
      label: 'Chimie'
    }
  },
  {
    id: 11,
    title: 'Leçon de biologie',
    description: 'Une leçon de biologie pour les élèves de 6ème.',
    image: 'https://imgproxy.services.pitch.com/_/resizing_type:fit/plain/pitch-publish-user-assets/templates/posters/moodboard.jpg',
    author: {
      name: 'Ivy Purple',
      avatar: {
        src: 'https://picsum.photos/560/400'
      }
    },
    badge: {
      size: 'xs',
      label: 'Biologie'
    }
  },
  {
    id: 12,
    title: 'Leçon de physique',
    description: 'Une leçon de physique pour les élèves de 6ème.',
    image: 'https://imgproxy.services.pitch.com/_/resizing_type:fit/plain/pitch-publish-user-assets/templates/posters/moodboard.jpg',
    author: {
      name: 'Jack Red',
      avatar: {
        src: 'https://picsum.photos/560/400'
      }
    },
    badge: {
      size: 'xs',
      label: 'Physique'
    }
  },
  {
    id: 13,
    title: 'Leçon de littérature',
    description: 'Une leçon de littérature pour les élèves de 6ème.',
    image: 'https://imgproxy.services.pitch.com/_/resizing_type:fit/plain/pitch-publish-user-assets/templates/posters/moodboard.jpg',
    author: {
      name: 'Kate Gray',
      avatar: {
        src: 'https://picsum.photos/560/400'
      }
    },
    badge: {
      size: 'xs',
      label: 'Littérature'
    }
  },
  {
    id: 14,
    title: 'Leçon d\'informatique',
    description: 'Une leçon d\'informatique pour les élèves de 6ème.',
    image: 'https://imgproxy.services.pitch.com/_/resizing_type:fit/plain/pitch-publish-user-assets/templates/posters/moodboard.jpg',
    author: {
      name: 'Leo Pink',
      avatar: {
        src: 'https://picsum.photos/560/400'
      }
    },
    badge: {
      size: 'xs',
      label: 'Informatique'
    }
  },
  {
    id: 15,
    title: 'Leçon de philosophie',
    description: 'Une leçon de philosophie pour les élèves de 6ème.',
    image: 'https://imgproxy.services.pitch.com/_/resizing_type:fit/plain/pitch-publish-user-assets/templates/posters/moodboard.jpg',
    author: {
      name: 'Mia Brown',
      avatar: {
        src: 'https://picsum.photos/560/400'
      }
    },
    badge: {
      size: 'xs',
      label: 'Philosophie'
    }
  }
])
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar>
        <template #title>
          <ToggleDrawer />
          <h1 class="flex items-center gap-1.5 font-semibold text-gray-900 dark:text-white min-w-0">Templates</h1>
        </template>
      </UDashboardNavbar>

      <UDashboardPanelContent>
        <UDashboardSection title="Créer une nouvelle leçon" description="Choisissez un modèle de leçon pour commencer.">
          <UBlogList orientation="horizontal" class="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-8">
            <UBlogPost v-for="template in templates" :ui="{ wrapper: 'gap-y-2 cursor-pointer', title: 'text-base', description: 'text-sm' }" :key="template.id" @click="() => { modal.template = template; modal.open = true }" :title="template.title" :description="template.description" :image="{ src: template.image, alt: template.title }" :authors="[template.author]" :badge="template.badge">
              <template #authors>
                <div class="flex items-center gap-2">
                  <UAvatar :src="template.author.avatar.src" :alt="template.author.name" size="xs" />
                  <span class="text-sm text-gray-600 dark:text-gray-400">{{ template.author.name }}</span>
                </div>
              </template>
            </UBlogPost>
          </UBlogList>
        </UDashboardSection>
      </UDashboardPanelContent>
    </UDashboardPanel>

    <UDashboardModal v-model="modal.open" title="Créer une nouvelle leçon" :ui="{ width: 'sm:max-w-4xl' }">
      <div class="grid grid-cols-2 gap-4">
        <NuxtImg :src="modal.template.image" :alt="modal.template.title" class="col-span-1 rounded-md" />
        <div class="col-span-1">
          Contenu de la leçon
          Contenu de la leçon
          Contenu de la leçon
          Contenu de la leçon
          Contenu de la leçon
          Contenu de la leçon
          Contenu de la leçon
          Contenu de la leçon
          Contenu de la leçon
          Contenu de la leçon
          Contenu de la leçon
          Contenu de la leçon
          Contenu de la leçon
          Contenu de la leçon
          Contenu de la leçon
          Contenu de la leçon
          Contenu de la leçon
          Contenu de la leçon
        </div>
      </div>

      <div>
        <h2 class="text-lg font-semibold">{{ modal.template.title }}</h2>
        <p class="text-sm text-gray-600 dark:text-gray-400">{{ modal.template.description }}</p>
        <div class="flex items-center gap-2 mt-4">
          <UAvatar :src="modal.template.author.avatar.src" :alt="modal.template.author.name" size="xs" />
          <span class="text-sm text-gray-600 dark:text-gray-400">{{ modal.template.author.name }}</span>
        </div>
      </div>

      <template #footer>
        <UButton label="Utiliser ce modèle" />
      </template>
    </UDashboardModal>
  </UDashboardPage>
</template>
