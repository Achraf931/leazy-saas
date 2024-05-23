<script setup lang="ts">
import { NodeViewWrapper, type NodeViewProps } from '@tiptap/vue-3'
import { Tweet } from '@jacksongross/vue-tweet-embed'

const colorMode = useColorMode()

const darkMode = computed(() => {
  return colorMode.value === 'dark' ? 'dark' : 'light'
})

const props: NodeViewProps = defineProps(['node', 'selected'])

const tweetIdRegex = /\/status\/(\d+)/g
const id = tweetIdRegex.exec(props.node.attrs.url)?.[1]
</script>

<template>
  <NodeViewWrapper class="max-w-full tweetComponent" data-node-name="twitter">
    <Tweet :key="darkMode" :id="id" :options="{ theme: darkMode }" class="max-w-full not-prose" error-message="Désolé, le tweet n'est pas disponible. Rechercher sur <a href='https://twitter.com'>Twitter</a>">
      <svg class="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </Tweet>
  </NodeViewWrapper>
</template>

<style>
iframe {
  color-scheme: none;
}

.twitter-tweet {
  margin: 0!important;
}
</style>
