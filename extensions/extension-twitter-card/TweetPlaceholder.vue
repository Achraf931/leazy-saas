<script setup lang="ts">
import { NodeViewWrapper } from '@tiptap/vue-3'

const props = defineProps(['editor', 'getPos', 'selected', 'deleteNode'])

const tweetUrl = ref('')

const insertTweet = (attrs) => {
  props.editor.chain().focus().insertContentAt(props.getPos(), {
    type: 'twitter',
    attrs: {
      ...attrs,
      align: 'left',
      width: '100%'
    }
  }).run()
  props.deleteNode()
}

const importTweet = () => {
  if (!isValidURL(tweetUrl.value)) {
    alert('URL invalide.')
    return
  }
  insertTweet({ url: tweetUrl.value })
  props.deleteNode()
}

const isValidURL = (url) => {
  const URLRegExp = new RegExp(/^https:\/\/(twitter\.com|x\.com)\/.*\/status\/.*/g, 'i')
  return URLRegExp.test(url)
}
</script>

<template>
  <NodeViewWrapper :class="[selected ? 'ProseMirror-selectednode' : '', 'tweetPlaceholder']">
    <div>
      <div class="flex items-center justify-start gap-2">
        <UInput placeholder="Saisir l'URL du tweet" class="flex-1" v-model="tweetUrl"/>
        <UButton label="Importer" @click="importTweet" />
      </div>
    </div>
  </NodeViewWrapper>
</template>
