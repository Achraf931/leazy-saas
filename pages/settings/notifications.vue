<script setup lang="ts">
const state = reactive<{ [key: string]: boolean }>({
  email: true,
  desktop: false,
  product_updates: true,
  weekly_digest: false,
  important_updates: true
})

const sections = [{
  title: 'Canaux de notification',
  description: 'Où pouvons-nous vous notifier ?',
  fields: [{
    name: 'email',
    label: 'Email',
    description: 'Recevez un résumé quotidien par email.'
  }, {
    name: 'desktop',
    label: 'Desktop',
    description: 'Recevez des notifications sur votre bureau.'
  }]
}, {
  title: 'Mises à jour du compte',
  description: 'Recevoir des mises à jour sur Leazy.',
  fields: [{
    name: 'weekly_digest',
    label: 'Résumé hebdomadaire',
    description: 'Recevez chaque semaine un condensé d\'informations.'
  }, {
    name: 'important_updates',
    label: 'Mises à jour importantes',
    description: 'Recevoir des emails sur les mises à jour importantes comme les correctifs de sécurité, la maintenance, etc.'
  }]
}]

async function onChange () {
  // Do something with data
  console.log(state)
}
</script>

<template>
  <UDashboardPanelContent class="p-0 pb-24 divide-y divide-gray-200 dark:divide-gray-800">
    <UDashboardSection
      v-for="(section, index) in sections"
      :key="index"
      :title="section.title"
      :description="section.description"
      orientation="horizontal"
      class="px-4 py-6"
    >
      <UCard :ui="{ body: { base: 'divide-y divide-gray-200 dark:divide-gray-800 gap-4 flex flex-col' } }">
        <UFormGroup
          v-for="field in section.fields"
          :key="field.name"
          :name="field.name"
          :label="field.label"
          :description="field.description"
          class="flex items-center justify-between pt-4 first:pt-0 gap-2"
          :ui="{ container: 'flex' }"
        >
          <UToggle v-model="state[field.name]" size="md" @update:model-value="onChange" />
        </UFormGroup>
      </UCard>
    </UDashboardSection>
  </udashboardpanelcontent>
</template>
