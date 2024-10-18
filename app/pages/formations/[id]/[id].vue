<script setup lang="ts">
import data from '@/data'
</script>

<template>
  <div class="empty:before:content-['Titre de la leçon'] empty:before:pointer-events-none empty:before:text-[#adb5bd] font-bold px-4 lg:px-[calc((100%_-_(750px))_/_2)] mt-[25px] mb-5 text-3xl tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl outline-none ring-none">
    Titre de la leçon
  </div>

  <LeazyEditor v-model="data.content" :hide-toolbar="true" :disabled="true" :editable="false" class="flex-1" max-width="800" />
</template>