<script setup lang="ts">
import { CreateMediaModal } from '#components'

interface Props {
  medias: object[]
  overlay: boolean
}

const { del } = useApi('lessons')
const toast = useToast()
const modal = useModal()

const props = defineProps<Props>()

const medias = useModel(props, 'medias')

const deleteMedia = async (id) => {
  const response = await del(id, 'media')

  if (response) {
    medias.value = medias.value.filter((media) => media.id !== id)
    return toast.add({ icon: 'i-heroicons-check-circle', title: 'Média supprimé avec succès', color: 'green' })
  }

  return toast.add({ icon: 'i-heroicons-x-circle', title: 'Erreur lors de la suppression du média', color: 'red' })
}

const handleModal = (media?: object) => {
  modal.open(CreateMediaModal, {
    media,
    onSubmited: (media) => medias.value.push(media),
    onClose: modal.close
  })
}
</script>

<template>
  <UDashboardSlideover title="Médias associés" :ui="{ wrapper: 'top-[--header-height] h-[calc(100vh-var(--header-height))] ', header: { base: 'border-l border-gray-200 dark:border-gray-800' }, body: { base: 'border-l border-gray-200 dark:border-gray-800' }, footer: { base: 'border-l border-gray-200 dark:border-gray-800' } }" :overlay :prevent-close>
    <UBlogList orientation="horizontal" :ui="{ wrapper: 'p-px overflow-y-auto gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2' }">
      <div @click="handleModal" class="cursor-pointer w-full rounded-lg border border-dashed dark:border-gray-700 flex flex-col items-center justify-center p-2 text-xs">
        <UIcon name="i-heroicons-plus" class="w-6 h-6" />
        <p>Ajouter un média</p>
      </div>
      <UBlogPost v-for="(item, index) in medias" :key="index" :ui="{ wrapper: 'gap-y-0.5', title: 'text-sm', date: 'text-xs', authors: { wrapper: 'mt-0' }, image: { wrapper: 'pointer-events-auto' } }">
        <template #image>
          <NuxtLink :to="item.url" target="_blank">
            <NuxtImg class="cursor-pointer block object-cover object-top w-full h-full transform transition-transform duration-200 hover:scale-105" :src="item.image" :alt="item.title" />
          </NuxtLink>
        </template>
        <template #default>
          <div class="flex items-center justify-between">
            <div class="mt-1">
              <h2 class="text-gray-900 dark:text-white font-semibold group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200 text-xs line-clamp-1">
                {{ item.title }}
              </h2>
              <p class="text-xs text-gray-400 line-clamp-1">
                {{ item.description }}
              </p>
              <UButton :to="item.url" size="2xs" target="_blank" variant="link" class="text-gray-400 text-[10px] line-clamp-1" :padded="false">
                {{ item.url }}
              </UButton>
            </div>
            <UDropdown :ui="{ item: { size: 'text-xs' }, width: 'w-auto' }" :items="[[{ label: 'Modifier', icon: 'i-heroicons-pencil-square', click: () => handleModal(item) }, { label: 'Supprimer', icon: 'i-heroicons-trash', color: 'red', click: () => deleteMedia(item.id) }]]" :popper="{ placement: 'bottom-end' }">
              <UButton icon="i-heroicons-ellipsis-vertical" variant="link" size="xs" :padded="false" />
            </UDropdown>
          </div>
        </template>
      </UBlogPost>
    </UBlogList>
  </UDashboardSlideover>
</template>
