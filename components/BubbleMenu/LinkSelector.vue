<template>
  <div class="relative">
    <button
      type="button"
      class="flex h-full items-center space-x-2 px-3 py-1.5 text-sm font-medium text-stone-600 hover:bg-stone-100 active:bg-stone-200"
      @click="isOpen = !isOpen"
    >
      <span class="text-base">↗</span>
      <span
        class="underline decoration-stone-400 underline-offset-4"
        :class="{ 'text-blue-500': editor.isActive('link') }"
      >
        Link
      </span>
    </button>
    <form
      v-if="isOpen"
      class="fixed top-full z-[99999] mt-1 flex w-60 overflow-hidden rounded border border-stone-200 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1"
      @submit.prevent="submit"
    >
      <input
        ref="inputRef"
        :defaultValue="editor.getAttributes('link').href || ''"
        type="url"
        placeholder="Coller une URL"
        class="flex-1 p-1 text-sm bg-white outline-none"
      >
      <button
        v-if="editor.getAttributes('link').href"
        type="button"
        class="p-1 text-sm bg-white outline-none"
        @click="() => { editor.chain().focus().unsetLink().run(); isOpen = false; }"
      >
        <Trash class="w-4 h-4" />
      </button>
      <button
        v-else
        class="flex items-center p-1 transition-all rounded-sm text-stone-600 hover:bg-stone-100"
        @click.prevent="submit"
      >
        <Check class="w-4 h-4" />
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from '#imports'
import { Editor } from '@tiptap/core'
import { Check, Trash } from 'lucide-vue-next'

const { editor } = defineProps({
  editor: {
    type: Object as PropType<Editor>,
    required: true
  }
})

const isOpen = ref(false)

const inputRef = ref<HTMLInputElement | null>(null)

const submit = async () => {
  if (inputRef.value?.value) {
    const url = inputRef.value.value
    isOpen.value = false
    fetch('/api/opengraph', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    }).then(res => res.json()).then(data => {
      editor.chain().focus().setLink({
        href: url,
        'data-image': data.image,
        'data-description': data.descriptio,
        'data-site_title': data.site_title,
        'data-site_description': data.site_description
      }).run()
    })
  }
}
</script>
