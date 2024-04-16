<template>
  <div>
    <ClientOnly>
      <div :class="className">
        <BubbleMenu :editor="editor"/>
        <EditorContent :editor="editor"/>
        <DragAndPlusButton :editor="editor"/>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useEditor, Extension, EditorContent, type JSONContent } from '@tiptap/vue-3'
import { Editor as EditorClass } from '@tiptap/core'
import { useDebounceFn, useStorage } from '@vueuse/core'
import setup from '@/extensions'
import { useCompletion } from 'ai/vue'
import { getPrevText } from '@/extensions/extension-slash-menu/getPrevText'
import DragAndPlusButton from '@/extensions/extension-drag-plus-menu/DragAndPlusButton.vue'

const props = defineProps({
  /**
   * The API route to use for the Vercel Blob.
   * Defaults to '/api/upload'.
   */
  blobApi: {
    type: String,
    default: '/api/upload'
  },
  /**
   * The API route to use for the OpenAI completion API.
   * Defaults to '/api/generate'.
   */
  completionApi: {
    type: String,
    default: '/api/generate'
  },
  /**
   * Additional classes to add to the editor container.
   * Defaults to 'relative min-h-[500px] w-full max-w-screen-lg border-stone-200 bg-white p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg'.
   */
  className: {
    type: String,
    default: 'relative max-w-screen-md mx-auto'
  },
  /**
   * The default value to use for the editor.
   * Defaults to the `defaultEditorContent` from `@/lib/default-content`.
   */
  defaultValue: {
    type: Object as PropType<JSONContent>,
    default: {
      type: 'doc',
      content: []
    }
  },
  /**
   * A list of extensions to use for the editor, in addition to the default Leazy extensions.
   * Defaults to [].
   */
  extensions: {
    type: Array as PropType<Extension[]>,
    default: []
  },
  /**
   * Props to pass to the underlying Tiptap editor, in addition to the default Leazy editor props.
   * Defaults to {}.
   */
  editorProps: {
    type: Object,
    default: {}
  },
  /**
   * A callback function that is called whenever the editor is updated.
   * Defaults to () => {}.
   */
  onUpdate: {
    type: Function as PropType<(editor?: EditorClass) => void | Promise<void>>,
    default: () => {
    }
  },
  /**
   * A callback function that is called whenever the editor is updated, but only after the defined debounce duration.
   * Defaults to () => {}.
   */
  onDebouncedUpdate: {
    type: Function as PropType<(editor?: EditorClass) => void | Promise<void>>,
    default: () => {
    }
  },
  /**
   * The duration (in milliseconds) to debounce the onDebouncedUpdate callback.
   * Defaults to 750.
   */
  debounceDuration: {
    type: Number,
    default: 750
  },
  /**
   * The key to use for storing the editor's value in local storage.
   * Defaults to "editor_content".
   */
  storageKey: {
    type: String,
    default: 'editor_content'
  }
})

provide('completionApi', props.completionApi)
useStorage('blobApi', props.blobApi)

const content = useStorage(props.storageKey, props.defaultValue)

const debouncedUpdate = useDebounceFn(({ editor }) => {
  content.value = editor.getJSON()
  props.onDebouncedUpdate(editor)
}, props.debounceDuration)

const editor = useEditor({
  extensions: [...setup, ...props.extensions],
  editorProps: {
    attributes: {
      class: `prose-lg text-sm prose-stone dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
    },
    ...props.editorProps
  },
  onUpdate: e => {
    const selection = e.editor.state.selection
    const lastTwo = getPrevText(e.editor, {
      chars: 2
    })

    //  Run the completion API if the user types '++' at the end of the document.
    if (lastTwo === '++' && !isLoading.value) {
      e.editor.commands.deleteRange({
        from: selection.from - 2,
        to: selection.from
      })

      complete(getPrevText(e.editor, { chars: 500 }))
    } else {
      props.onUpdate(e.editor)
      debouncedUpdate(e)
    }
  },
  autofocus: 'end'
})

defineExpose({ editor })

const { complete, completion, isLoading } = useCompletion({
  id: 'leazy-editor',
  api: props.completionApi,
  onFinish: (_prompt, completion) => {
    editor.value?.commands.setTextSelection({
      from: editor.value.state.selection.from - completion.length,
      to: editor.value.state.selection.from
    })
  },
  onError: error => console.log(error)
})

//  Insert chunks of the generated text
watch(() => completion.value, (newCompletion, oldCompletion) => {
  const diff = newCompletion?.slice(oldCompletion?.length)

  if (diff) editor.value?.commands.insertContent(diff)
})

//  If user presses escape of cmd + z and it's loading,
//  stop the request, delete the completion, and insert back the '++'
const onKeyDown = e => {
  if (e.key === 'Escape' || (e.metaKey && e.key === 'z')) {
    stop()

    if (e.key === 'Escape') {
      editor.value?.commands.deleteRange({
        from: editor.value.state.selection.from - completion.value.length,
        to: editor.value.state.selection.from
      })
    }

    editor.value?.commands.insertContent('++')
  }
}

const mousedownHandler = e => {
  e.preventDefault()
  e.stopPropagation()
  stop()

  if (window.confirm('AI writing paused. Continue?')) {
    complete(editor.value?.getText() || '')
  }
}

watch(() => isLoading.value, (isLoading) => {
  if (isLoading) {
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', mousedownHandler)
  } else {
    document.removeEventListener('keydown', onKeyDown)
    document.removeEventListener('mousedown', mousedownHandler)
  }
})

const hydrated = ref(false);
watchEffect(() => {
  if (editor.value && content.value && !hydrated.value) {
    editor.value.commands.setContent(content.value)
    hydrated.value = true
  }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Outfit:wght@100..900&display=swap');

* {
  font-family: "DM Sans", Outfit, "Inter UI", system-ui, sans-serif;
}

.font-code {
  font-family: 'Space Mono', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
}

.ProseMirror h1 {
  font-size: 2.5rem;
  line-height: 1.2;
  margin: 0;
}

.ProseMirror h2 {
  font-size: 2rem;
  line-height: 1.2;
  margin: 0;
}

.ProseMirror h3 {
  font-size: 1.75rem;
  line-height: 1.2;
  margin: 0;
}

.ProseMirror h4 {
  font-size: 1.5rem;
  line-height: 1.2;
  margin: 0;
}

.ProseMirror h5 {
  font-size: 1.25rem;
  line-height: 1.2;
  margin: 0;
}

.ProseMirror h6 {
  font-size: 1rem;
  line-height: 1.2;
  margin: 0;
}

.ProseMirror p {
  margin: 0;
}

:root {
  --leazy-black: rgb(0 0 0);
  --leazy-white: rgb(255 255 255);
  --leazy-stone-50: rgb(250 250 249);
  --leazy-stone-100: rgb(245 245 244);
  --leazy-stone-200: rgb(231 229 228);
  --leazy-stone-300: rgb(214 211 209);
  --leazy-stone-400: rgb(168 162 158);
  --leazy-stone-500: rgb(120 113 108);
  --leazy-stone-600: rgb(87 83 78);
  --leazy-stone-700: rgb(68 64 60);
  --leazy-stone-800: rgb(41 37 36);
  --leazy-stone-900: rgb(28 25 23);

  --leazy-highlight-default: #ffffff;
  --leazy-highlight-purple: #f6f3f8;
  --leazy-highlight-red: #fdebeb;
  --leazy-highlight-yellow: #fbf4a2;
  --leazy-highlight-blue: #c1ecf9;
  --leazy-highlight-green: #acf79f;
  --leazy-highlight-orange: #faebdd;
  --leazy-highlight-pink: #faf1f5;
  --leazy-highlight-gray: #f1f1ef;
}

.dark-theme {
  --leazy-black: rgb(255 255 255);
  --leazy-white: rgb(25 25 25);
  --leazy-stone-50: rgb(35 35 34);
  --leazy-stone-100: rgb(41 37 36);
  --leazy-stone-200: rgb(66 69 71);
  --leazy-stone-300: rgb(112 118 123);
  --leazy-stone-400: rgb(160 167 173);
  --leazy-stone-500: rgb(193 199 204);
  --leazy-stone-600: rgb(212 217 221);
  --leazy-stone-700: rgb(229 232 235);
  --leazy-stone-800: rgb(232 234 235);
  --leazy-stone-900: rgb(240, 240, 241);

  --leazy-highlight-default: #000000;
  --leazy-highlight-purple: #3f2c4b;
  --leazy-highlight-red: #5c1a1a;
  --leazy-highlight-yellow: #5c4b1a;
  --leazy-highlight-blue: #1a3d5c;
  --leazy-highlight-green: #1a5c20;
  --leazy-highlight-orange: #5c3a1a;
  --leazy-highlight-pink: #5c1a3a;
  --leazy-highlight-gray: #3a3a3a;
}

.ProseMirror {
  max-width: 100vw;
  outline: none;
}

/* Custom image styles */

.ProseMirror img {
  transition: filter 0.1s ease-in-out;

  &:hover {
    cursor: pointer;
    filter: brightness(90%);
  }

  &.ProseMirror-selectednode {
    outline: 3px solid #5abbf7;
    filter: brightness(90%);
  }
}

.img-placeholder {
  position: relative;

  &:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 3px solid var(--leazy-stone-200);
    border-top-color: var(--leazy-stone-800);
    animation: spinning 0.6s linear infinite;
  }
}

@keyframes spinning {
  to {
    transform: rotate(360deg);
  }
}

/* Custom TODO list checkboxes – shoutout to this awesome tutorial: https://moderncss.dev/pure-css-custom-checkbox-style/ */

ul[data-type="taskList"] li > label {
  margin-right: 0.2rem;
  user-select: none;
}

@media screen and (max-width: 768px) {
  ul[data-type="taskList"] li > label {
    margin-right: 0.5rem;
  }
}

ul[data-type="taskList"] li > label input[type="checkbox"] {
  border: 1px solid rgb(144, 149, 157);
  height: 14px;
  width: 14px;
  box-sizing: border-box;
  margin: 0 8px 0 0;
  user-select: none;
  border-radius: 3px;
  appearance: none;
  background-color: transparent;
  flex-shrink: 0;
  padding: 2px;
  vertical-align: middle;
  transition: background-color 80ms ease-out 0s, border-color 80ms ease-out 0s;
  fill-opacity: 0;
  background-position: 1px 2px;
  cursor: pointer;

  &:hover {
    background-color: var(--leazy-stone-50);
  }

  &:active {
    background-color: rgb(110, 121, 214);
    border: 1px solid rgb(110, 121, 214);
  }

  &:checked {
    background-color: rgb(110, 121, 214);
    background-image: url(data:image/svg+xml;utf8,%3Csvg%20width=%2210%22%20height=%229%22%20viewBox=%220%200%2010%208%22%20xmlns=%22http://www.w3.org/2000/svg%22%20fill=%22%23ffffff%22%3E%3Cpath%20d=%22M3.46975%205.70757L1.88358%204.1225C1.65832%203.8974%201.29423%203.8974%201.06897%204.1225C0.843675%204.34765%200.843675%204.7116%201.06897%204.93674L3.0648%206.93117C3.29006%207.15628%203.65414%207.15628%203.8794%206.93117L8.93103%201.88306C9.15633%201.65792%209.15633%201.29397%208.93103%201.06883C8.70578%200.843736%208.34172%200.843724%208.11646%201.06879C8.11645%201.0688%208.11643%201.06882%208.11642%201.06883L3.46975%205.70757Z%22%20stroke-width=%220.2%22%20/%3E%3C/svg%3E);
    background-repeat: no-repeat;
    border: 1px solid rgb(110, 121, 214);
  }
}

ul[data-type="taskList"] li[data-checked="true"] > div > p {
  color: var(--leazy-stone-400);
  text-decoration: line-through;
  text-decoration-thickness: 2px;
}

.line {
  position: relative;
}

.plus {
  position: absolute;
  left: -20px; /* Ajustez cette valeur selon votre mise en page */
  display: none; /* Le "+" est initialement caché */
}

.line:hover .plus {
  display: inline-block; /* Afficher le "+" lors du survol */
}

.ProseMirror .column-block {
  width: 100%;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: 24px;
  padding: 8px 0;
}

.ProseMirror .column {
  overflow: auto;
  border: 1px gray dashed;
  border-radius: 8px;
  padding: 8px;
  margin: -8px;
}
</style>
