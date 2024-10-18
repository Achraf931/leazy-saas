<script setup lang="ts">
const date = ref(new Date())

const { formation } = defineProps<{
  formation?: {
    id: number
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
  title: formation?.title || '',
  description: formation?.description || '',
  tags: formation?.tags || [],
  short_description: formation?.short_description || '',
  published: formation?.published || false,
  published_at: formation?.published_at || ''
})
</script>

<template>
  <UForm class="space-y-4">
    <h3 class="font-bold mb-2">Détails</h3>

    <UFormGroup label="Image" name="image" hint="Optionnel">
      <UInput placeholder="URL de l'image" />
    </UFormGroup>

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
      <UInput name="estimated_time" />
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
      <UButton color="primary" type="submit" label="Enregistrer" class="mr-auto" leading-icon="i-heroicons-check" />
      <UButton color="gray" label="Archiver" leading-icon="i-heroicons-archive-box" />
      <UButton color="red" label="Supprimer" variant="soft" leading-icon="i-heroicons-x-mark" />
    </div>
  </UForm>
</template>