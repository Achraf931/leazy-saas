<script setup lang="ts">
import { NodeViewWrapper } from '@tiptap/vue-3'

const props = defineProps(['editor', 'getPos', 'selected', 'deleteNode'])

const videoUrl = ref('')

const insertVideo = (attrs) => {
  props.editor.chain().focus().insertContentAt(props.getPos(), {
    type: 'video',
    attrs: {
      ...attrs,
      align: 'left',
      width: '100%'
    }
  }).run()
  props.deleteNode()
}

const importVideo = () => {
  if (!isValidURL(videoUrl.value)) {
    alert('URL invalide.')
    return
  }
  insertVideo({ src: videoUrl.value })
  props.deleteNode()
}

const isValidURL = (url) => {
  const URLRegExp = new RegExp('^(https?://)?' + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + '((\\d{1,3}\\.){3}\\d{1,3}))' + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + '(\\?[;&a-z\\d%_.~+=-]*)?' + '(\\#[-a-z\\d_]*)?$', 'i')
  return URLRegExp.test(url)
}
</script>

<template>
  <NodeViewWrapper :class="[selected ? 'ProseMirror-selectednode' : '', 'videoPlaceholder']">
    <div class="placeholderContainer">
      <div class="flex items-center justify-start gap-2">
        <UInput placeholder="Saisir l'URL de la vidéo" class="flex-1" v-model="videoUrl"/>
        <UButton label="Importer" @click="importVideo" />
      </div>
    </div>
  </NodeViewWrapper>
</template>
