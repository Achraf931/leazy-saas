<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'

const props = defineProps({
  ...nodeViewProps,
})

const link = ref<string>('')
const loading = ref<boolean>(false)
const fileInput = ref()
const { t } = useI18n()

function handleFile(event) {
  loading.value = true
  const files = event?.target?.files
  if (!props.editor || props.editor.isDestroyed || files.length === 0) return
  const file = files[0]
  const uploadOptions = props.editor.extensionManager.extensions.find(
    extension => extension.name === 'imageUpload'
  )?.options
  uploadOptions?.upload([file]).then(res => {
    props.editor
      .chain()
      .setImage({ src: res[0].src })
      .deleteRange({ from: props.getPos(), to: props.getPos() })
      .focus()
      .run()
    loading.value = false
  })
}
function handleLink() {
  props.editor
    .chain()
    .setImage({ src: link.value })
    .deleteRange({ from: props.getPos(), to: props.getPos() })
    .focus()
    .run()
}
function handleDelete() {
  props.deleteNode()
}
function handleClick() {
  fileInput.value?.click()
}
</script>

<template>
  <NodeViewWrapper class="p-0 m-0" data-type="imageUpload" data-drag-handle>
    <UPopover :ui="{ base: 'flex flex-col gap-2 p-1' }">
      <div class="flex items-center w-full p-3 my-3 hover:bg-gray-100 dark:hover:bg-gray-700 border border-border border-gray-200 dark:border-gray-700 cursor-pointer rounded-lg transition-all">
        <div class="flex justify-center items-center gap-3 text-s" v-if="loading">
          <UIcon class="animate-spin w-6 h-6" name="i-lucide-loader-circle" />
          <span>{{ t('editor.image.dialog.uploading') }}...</span>
        </div>
        <div v-else class="flex justify-between items-center w-full">
          <div class="flex justify-center items-center gap-3">
            <UIcon name="i-lucide-image-up" class="w-6 h-6" />
            <span class="text-sm">{{ t('editor.image.dialog.title') }}</span>
          </div>
          <UIcon name="i-heroicons-trash" class="text-red-500" @click.stop="handleDelete" />
        </div>
      </div>

      <template #panel>
        <div>
          <UButton block size="xs" @click="handleClick" icon="i-heroicons-arrow-up-tray" :label="t('editor.image.dialog.tab.upload')" />
          <input type="file" accept="image/*" ref="fileInput" multiple style="display: none" @change="handleFile" />
        </div>

        <div class="flex items-center align-center text-center w-full flex-row">
          <div class="flex border-gray-200 dark:border-gray-800 w-full border-t border-solid" />
          <div class="font-medium text-gray-700 dark:text-gray-200 flex mx-3 whitespace-nowrap">
            <span class="text-sm">ou</span>
          </div>
          <div class="flex border-gray-200 dark:border-gray-800 w-full border-t border-solid" />
        </div>

        <UForm class="flex items-center gap-1" @submit="handleLink">
          <UInput
            type="url"
            autofocus
            required
            v-model="link"
            size="xs"
            :placeholder="t('editor.image.dialog.placeholder')"
          />
          <UButton type="submit" size="xs" :label="t('editor.image.dialog.button.apply')" />
        </UForm>
      </template>
    </UPopover>
  </NodeViewWrapper>
</template>
