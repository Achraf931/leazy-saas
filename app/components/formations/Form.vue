<script setup lang="ts">
import { CommonsModalLibrary } from '#components'

const modal = useModal()
const emit = defineEmits(['save', 'draft', 'archive', 'delete'])
const date = ref(new Date())
const documentId = computed(() => !!useRoute().params.id)

const { formation } = defineProps<{
  formation?: {
    id: number
    image: string
    title: string
    short_description: string
    description: string
    tags: string[]
    progress: number,
    to: string,
    published: boolean,
    published_at: string
  }
}>()

const themes = ['Theme 1', 'Theme 2', 'Theme 3']
const tags = ['Tag 1', 'Tag 2', 'Tag 3']
const classes = ['Terminale Production Graphique', 'Seconde Développement Web', 'Première Design d\'interface']
const selected = ref(null)
const selectedTags = ref([])
const selectedClasses = ref([])

const fields = reactive({
  image: formation?.image || 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png?20220519031949',
  title: formation?.title || '',
  description: formation?.description || '',
  tags: formation?.tags || [],
  short_description: formation?.short_description || '',
  published: formation?.published || false,
  published_at: formation?.published_at || ''
})

const handleLink = (index, url) => {
  if (index === 'background') fields.image = url
}

const handleModal = (index) => {
  modal.open(CommonsModalLibrary, {
    index,
    onSelect: ({ index, url }) => handleLink(index, url)
  })
}
</script>

<template>
  <UForm class="space-y-4">
    <section class="group grid grid-cols-12">
      <NuxtImg :src="fields.image" :alt="fields.title" class="transition-all duration-150 ease-in-out group-hover:brightness-50 w-full rounded-xl col-span-12 row-span-2 col-start-1 row-start-1 aspect-[16/5] object-cover" />
      <div class="transition-all duration-150 ease-in-out hidden group-hover:block z-10 mt-4 mr-4 col-start-10 col-end-13 row-start-1">
        <UButton label="Modifier l'image" color="white" variant="solid" @click="handleModal('background')" block />
      </div>
    </section>

    <UFormGroup label="Title" required>
      <UInput v-model="fields.title" name="title" />
    </UFormGroup>

    <UFormGroup label="Courte description" description="Description qui sera visible sur la liste des formations" required>
      <UInput v-model="fields.short_description" name="short_description" />
    </UFormGroup>

    <UFormGroup label="Description" required>
      <UTextarea v-model="fields.description" name="description" />
    </UFormGroup>

    <UFormGroup label="Temps de lecture estimé" hint="Optionnel">
      <UInput name="estimated_time" min="0" type="number" inputmode="numeric" />
    </UFormGroup>

    <UFormGroup label="Tags" required>
      <ClientOnly>
        <UInputMenu v-model="selectedTags" :options="tags" />
      </ClientOnly>
    </UFormGroup>

    <UFormGroup label="Thème" required>
      <ClientOnly>
        <UInputMenu v-model="selected" :options="themes" />
      </ClientOnly>
    </UFormGroup>

    <UFormGroup label="Attribuer des classes" required>
      <ClientOnly>
        <UInputMenu v-model="selectedClasses" :options="classes" />
      </ClientOnly>
    </UFormGroup>

    <h3 class="font-bold mb-2">Paramètres</h3>

    <UFormGroup>
      <UFormGroup label="Publié à partir du">
        <ClientOnly>
          <UInput type="date" />

          <!--          <UPopover :popper="{ placement: 'bottom-start' }">-->
<!--            <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(date, 'd MMM, yyy')" />-->

<!--            <template #panel="{ close }">-->
<!--              <DatePicker v-model="date" is-required @close="close" />-->
<!--            </template>-->
<!--          </UPopover>-->
        </ClientOnly>
      </UFormGroup>
    </UFormGroup>

    <div class="flex items-center gap-2 justify-end">
      <UButton @click="emit('save')" type="submit" label="Enregistrer" leading-icon="i-heroicons-check" />
      <UButton @click="emit('draft')" color="orange" type="submit" variant="soft" label="Brouillon" class="mr-auto" leading-icon="i-fluent-drafts-24-regular" />
      <template v-if="documentId">
        <UButton @click="emit('archive')" color="gray" label="Archiver" leading-icon="i-heroicons-archive-box" />
        <UButton @click="emit('delete')" color="red" label="Supprimer" variant="soft" leading-icon="i-heroicons-x-mark" />
      </template>
    </div>
  </UForm>
</template>