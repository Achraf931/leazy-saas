<script setup lang="ts">
const router = useRouter()
const route = useRoute()

defineProps(['formation'])

const tabs = [
  {
    label: 'Aperçu',
    file: 'Overview',
    query: 'overview',
    icon: 'i-heroicons-eye'
  },
  {
    label: 'Classes',
    file: 'Classes',
    query: 'classes',
    icon: 'i-heroicons-user-group'
  },
  {
    label: 'Auteur',
    file: 'Author',
    query: 'author',
    icon: 'i-heroicons-user-circle'
  },
  {
    label: 'Commentaires',
    file: 'Comments',
    query: 'comments',
    icon: 'i-heroicons-chat-bubble-bottom-center-text'
  },
  {
    label: 'FAQ',
    file: 'Faq',
    query: 'faq',
    icon: 'i-heroicons-question-mark-circle'
  },
  {
    label: 'Ressources',
    file: 'Resources',
    query: 'resources',
    icon: 'i-heroicons-folder-plus'
  }
]

const selected = computed({
  get () {
    const index = tabs.findIndex((item) => item.query === route.query.tab)
    if (index === -1) {
      return 0
    }

    return index
  },
  set (value) {
    router.replace({ query: { tab: tabs[value].query } })
  }
})

const componentMap = {
  Overview: defineAsyncComponent(() => import('@/components/formations/tabs/Overview.vue')),
  Classes: defineAsyncComponent(() => import('@/components/formations/tabs/Classes.vue')),
  Author: defineAsyncComponent(() => import('@/components/formations/tabs/Author.vue')),
  Comments: defineAsyncComponent(() => import('@/components/formations/tabs/Comments.vue')),
  Faq: defineAsyncComponent(() => import('@/components/formations/tabs/Faq.vue')),
  Resources: defineAsyncComponent(() => import('@/components/formations/tabs/Resources.vue'))
}
</script>

<template>
  <div class="space-y-4">
    <div class="rounded-lg space-y-2 p-4 border bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <div class="flex items-center gap-2">
        <h1 class="text-xl font-bold">{{ formation.name }}</h1>
        <UBadge :label="formation.subject" variant="subtle" size="xs" />
      </div>

      <UTooltip text="Thème de la formation">
        <UButton size="xs" :label="formation.theme" color="gray" variant="ghost">
          <template #leading>
            <UIcon name="i-heroicons-book-open" class="w-4 h-4 text-primary" />
          </template>
        </UButton>
      </UTooltip>

      <UTooltip text="Nombre de leçons">
        <UButton size="xs" label="13 leçons" color="gray" variant="ghost">
          <template #leading>
            <UIcon name="i-heroicons-play-circle" class="w-4 h-4 text-primary" />
          </template>
        </UButton>
      </UTooltip>

      <UTooltip text="Durée de la formation">
        <UButton size="xs" :label="formation.duration" color="gray" variant="ghost">
          <template #leading>
            <UIcon name="i-heroicons-clock" class="w-4 h-4 text-primary" />
          </template>
        </UButton>
      </UTooltip>

      <UTooltip text="Nombre de participants">
        <UButton size="xs" label="362" color="gray" variant="ghost">
          <template #leading>
            <UIcon name="i-heroicons-user-group" class="w-4 h-4 text-primary" />
          </template>
        </UButton>
      </UTooltip>
    </div>

    <NuxtImg src="https://support.discord.com/hc/theming_assets/01HZPN9XSQTZNQ61ZY6FH47BS1" alt="Test image" class="rounded-lg aspect-[16/5] object-cover" />

    <UTabs v-model="selected" :items="tabs" :ui="{ list: { height: 'h-10', base: 'border border-gray-200 dark:border-gray-700', tab: { height: 'h-7', size: 'text-[13px]' } } }" class="w-fit" />

    <div class="rounded-lg space-y-4 p-4 border bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <component :is="componentMap[tabs[selected].file]" :formation />
    </div>
  </div>
</template>
