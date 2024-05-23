<template>
  <ClientOnly>
    <div :class="className">
      <template v-if="false">
        <p @click="editor.chain().focus().setIframe({ src: 'https://www.figma.com/embed?embed_host=oembed&node-id=31-1428&page-id=0%3A1&referrer=https%3A%2F%2Fbootcamp.uxdesign.cc%2Fembed-figma-prototypes-in-medium-in-3-easy-steps-2299ccb704a0&scaling=contain&starting-point-node-id=31%3A1428&t=ad8gBA2HVO8pZXeX-0&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FG1g8sd0xn9FR9ngFzLWv0q%2FExample%3Ftype%3Ddesign' }).run()">Embed Figma</p>
        <p @click="editor.chain().focus().setIframe({ src: 'https://open.spotify.com/embed?uri=spotify:track:49q1V6kEREAAawzvdVDn8O&view=coverart' }).run()">Embed Spotify</p>
      </template>

      <TableOfContents :editor="editor" />

      <EditorContent class="contentEditor" :editor="editor"/>
      <FloatingMenu :editor="editor" />
      <TipTapBubbleMenu
          v-if="editor && tableRowTools"
          :editor="editor"
          pluginKey="tableRowMenu"
          :should-show="tableIsActive"
          :tippy-options="{
        placement: 'right',
        getReferenceClientRect: getTableRowMenuCoords,
      }"
      >
        <UPopover :popper="{ placement: 'bottom-start' }">
          <UButton variant="soft" size="2xs" color="primary" icon="i-heroicons-plus" />

          <template #panel>
            <div class="flex flex-col p-1 w-max">
              <UButton
                  v-for="(tool, index) in tableRowTools()"
                  :label="tool.title"
                  :key="index"
                  variant="ghost"
                  color="gray"
                  size="xs"
                  @click.prevent="tool.command(editor)"
              >
                <template #leading>
                  <div class="flex items-center justify-center p-px font-medium border rounded-sm border-stone-200">
                    <UIcon :name="tool.icon" class="w-4 h-4" />
                  </div>
                </template>
              </UButton>
            </div>
          </template>
        </UPopover>
      </TipTapBubbleMenu>

      <TipTapBubbleMenu
          v-if="editor && tableColumnTools"
          :editor="editor"
          pluginKey="tableColumnMenu"
          :should-show="tableIsActive"
          :tippy-options="{
        placement: 'bottom',
        getReferenceClientRect: getTableColumnMenuCoords,
      }"
      >
        <UPopover :popper="{ placement: 'bottom-start' }">
          <UButton variant="soft" size="2xs" color="primary" icon="i-heroicons-plus" />
          <template #panel>
            <div class="flex flex-col p-1 w-max">
              <UButton
                  v-for="(tool, index) in tableColumnTools()"
                  :label="tool.title"
                  :key="index"
                  variant="ghost"
                  color="gray"
                  size="xs"
                  @click.prevent="tool.command(editor)"
              >
                <template #leading>
                  <div class="flex items-center justify-center p-px font-medium border rounded-sm border-stone-200">
                    <UIcon :name="tool.icon" class="w-4 h-4" />
                  </div>
                </template>
              </UButton>
            </div>
          </template>
        </UPopover>
      </TipTapBubbleMenu>
      <BubbleMenu :editor="editor" />
      <BlockMenu :editor="editor" />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useEditor, Extension, EditorContent, BubbleMenu as TipTapBubbleMenu, type JSONContent } from '@tiptap/vue-3'
import { type EditorProps } from '@tiptap/pm/view'
import { Editor as EditorClass } from '@tiptap/core'
import { useDebounceFn, useStorage } from '@vueuse/core'
import { useCompletion } from 'ai/vue'
import { getPrevText } from '@/extensions/extension-slash-menu/getPrevText'
import { GetTableColumnCoords, GetTableRowCoords, GetTopLevelNode } from '@/utils/pm-utils'
import { tableRowTools, tableColumnTools } from '@/utils/table-utils'
import setup from '@/extensions'

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
    default: 'editorContainer py-[25px] px-0 lg:p-[25px]'
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
    type: Object as PropType<EditorProps>,
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
   * Defaults to 'leazy_editor'.
   */
  storageKey: {
    type: String,
    default: 'leazy_editor'
  },
  editable: {
    type: Boolean,
    default: true
  }
})

provide('completionApi', props.completionApi)
useStorage('blobApi', props.blobApi)

const content = ref(props.defaultValue)

const debouncedUpdate = useDebounceFn(({ editor }) => {
  content.value = editor.getJSON()

  props.onDebouncedUpdate(editor)
}, props.debounceDuration)

const editor = useEditor({
  extensions: [...setup, ...props.extensions],
  editorProps: {
    attributes: {
      class: `prose-sm text-sm dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
    },
    ...props.editorProps
  },
  onUpdate: e => {
    const selection = e.editor.state.selection
    const lastThree = getPrevText(e.editor, {
      chars: 3
    })

    //  Run the completion API if the user types '+++' at the end of the document.
    if (lastThree === '+++' && !isLoading.value) {
      e.editor.commands.deleteRange({
        from: selection.from - 3,
        to: selection.from
      })

      complete(getPrevText(e.editor, { chars: 5000 }))
    } else {
      props.onUpdate(e.editor)
      debouncedUpdate(e)
    }
  },
  editable: props.editable,
  autofocus: true
})

const getTopLevelNodeType = () => GetTopLevelNode(editor.value?.view)?.type.name
const getTableRowMenuCoords = () => GetTableRowCoords(editor.value?.view)
const getTableColumnMenuCoords = () => GetTableColumnCoords(editor.value?.view)
const tableIsActive = () => getTopLevelNodeType() === 'table'

const { complete, completion, isLoading, stop } = useCompletion({
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
const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' || (e.metaKey && e.key === 'z')) {
    stop()

    if (e.key === 'Escape') {
      editor.value?.commands.deleteRange({
        from: editor.value.state.selection.from - completion.value.length,
        to: editor.value.state.selection.from
      })
    }

    editor.value?.commands.insertContent('+++')
  }
}

const mousedownHandler = (e: MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()
  stop()

  if (window.confirm('L\'IA est en pause. Continuer ?')) {
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

defineExpose({ editor })
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Outfit:wght@100..900&display=swap');
@import "katex/dist/katex.min.css";

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

@for $i from 1 through 8 {
  [data-indent='#{$i}'] {
    $val: $i * 3rem;
    padding-left: $val;
  }
}

.placeholderContainer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fbfbfb;
  border: 1px solid #e6e8ec;
  padding: 1rem;
  color: #676768;
  cursor: pointer;
  gap: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f4f4f4;
  }

  .placeholderText {
    text-align: center;
    font-size: 0.95rem;
    user-select: none;
    line-height: 120%;
  }
}

.dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.search-result {
  background-color: rgba(255, 217, 0, 0.5);

  &-current {
    background-color: rgba(13, 255, 0, 0.5);
  }
}

.enrich-search-result {
  background-color: rgba(13, 255, 0, 0.5);
}

.imageComponent, .videoComponent {
  display: flex;
  flex-direction: column;
  position: relative;

  &.leftAlign {
    left: 0;
    transform: translateX(0);
  }

  &.centerAlign {
    left: 50%;
    transform: translateX(-50%);
  }

  &.rightAlign {
    left: 100%;
    transform: translateX(-100%);
  }

  .imageContainer, .videoContainer {
    display: flex;
    flex-direction: column;
    position: relative;
    border-radius: 0.25rem;
    overflow: hidden;
    transition: width 0.15s ease-out, height 0.15s ease-out;

    & > img, & > video {
      width: 100%;
    }

    &:hover:not(.resizing) .controls {
      opacity: 0.8;
    }

    &:hover .resizeHandle {
      opacity: 1;
    }

    .resizeHandleContainer {
      position: absolute;
      top: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      z-index: 25;
      cursor: col-resize;

      .resizeHandle {
        opacity: 0;
        transition: opacity .15s ease-in;
        width: 4px;
        height: 36px;
        max-height: 50%;
        box-sizing: content-box;
        background: rgba(0, 0, 0, 0.65);
        border: 1px solid rgba(255, 255, 255, 0.5);
        border-radius: 6px;
      }

      &:hover .resizeHandle {
        opacity: 1;
      }
    }

    .controls {
      @apply bg-white dark:bg-gray-900 border border-solid border-gray-300 dark:border-gray-600;
      position: absolute;
      left: 10px;
      top: 10px;
      opacity: 0;
      z-index: 25;
      transition: opacity 0.2s;
      display: flex;
      padding: 0.25rem;
      border-radius: 4px;
      gap: 0.25rem;
    }
  }
}

.bubbleMenu:empty {
  display: none;
  pointer-events: none;
}

.drag-handle-container {
  display: inline-flex;
  align-items: center;
  position: fixed;
  opacity: 1;
  transition: opacity ease-in 0.2s;

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }

  .drag-handle, .plus-button {
    @apply text-black dark:text-white;
    border-radius: 0.25rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='black' viewBox='0 0 10 10'%3E%3Cpath d='M3,2 C2.44771525,2 2,1.55228475 2,1 C2,0.44771525 2.44771525,0 3,0 C3.55228475,0 4,0.44771525 4,1 C4,1.55228475 3.55228475,2 3,2 Z M3,6 C2.44771525,6 2,5.55228475 2,5 C2,4.44771525 2.44771525,4 3,4 C3.55228475,4 4,4.44771525 4,5 C4,5.55228475 3.55228475,6 3,6 Z M3,10 C2.44771525,10 2,9.55228475 2,9 C2,8.44771525 2.44771525,8 3,8 C3.55228475,8 4,8.44771525 4,9 C4,9.55228475 3.55228475,10 3,10 Z M7,2 C6.44771525,2 6,1.55228475 6,1 C6,0.44771525 6.44771525,0 7,0 C7.55228475,0 8,0.44771525 8,1 C8,1.55228475 7.55228475,2 7,2 Z M7,6 C6.44771525,6 6,5.55228475 6,5 C6,4.44771525 6.44771525,4 7,4 C7.55228475,4 8,4.44771525 8,5 C8,5.55228475 7.55228475,6 7,6 Z M7,10 C6.44771525,10 6,9.55228475 6,9 C6,8.44771525 6.44771525,8 7,8 C7.55228475,8 8,8.44771525 8,9 C8,9.55228475 7.55228475,10 7,10 Z'%3E%3C/path%3E%3C/svg%3E");
    background-size: calc(0.5em + 0.375rem) calc(0.5em + 0.375rem);
    background-blend-mode: multiply;
    background-repeat: no-repeat;
    background-position: center;
    width: 1.2rem;
    height: 1.5rem;
    z-index: 50;
    cursor: grab;

    &:hover {
      @apply dark:bg-gray-600 bg-gray-100;
      transition: background-color 0.2s;
    }

    @media screen and (max-width: 600px) {
      display: none;
      pointer-events: none;
    }
  }

  .plus-button {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='black' class='w-6 h-6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M12 4.5v15m7.5-7.5h-15' /%3E%3C/svg%3E");
  }
}

.dark {
  .drag-handle-container .drag-handle {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 10 10'%3E%3Cpath d='M3,2 C2.44771525,2 2,1.55228475 2,1 C2,0.44771525 2.44771525,0 3,0 C3.55228475,0 4,0.44771525 4,1 C4,1.55228475 3.55228475,2 3,2 Z M3,6 C2.44771525,6 2,5.55228475 2,5 C2,4.44771525 2.44771525,4 3,4 C3.55228475,4 4,4.44771525 4,5 C4,5.55228475 3.55228475,6 3,6 Z M3,10 C2.44771525,10 2,9.55228475 2,9 C2,8.44771525 2.44771525,8 3,8 C3.55228475,8 4,8.44771525 4,9 C4,9.55228475 3.55228475,10 3,10 Z M7,2 C6.44771525,2 6,1.55228475 6,1 C6,0.44771525 6.44771525,0 7,0 C7.55228475,0 8,0.44771525 8,1 C8,1.55228475 7.55228475,2 7,2 Z M7,6 C6.44771525,6 6,5.55228475 6,5 C6,4.44771525 6.44771525,4 7,4 C7.55228475,4 8,4.44771525 8,5 C8,5.55228475 7.55228475,6 7,6 Z M7,10 C6.44771525,10 6,9.55228475 6,9 C6,8.44771525 6.44771525,8 7,8 C7.55228475,8 8,8.44771525 8,9 C8,9.55228475 7.55228475,10 7,10 Z'%3E%3C/path%3E%3C/svg%3E");
  }

  .drag-handle-container .plus-button {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='white' class='w-6 h-6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M12 4.5v15m7.5-7.5h-15' /%3E%3C/svg%3E");
  }
}

* {
  font-family: "DM Sans", Outfit, "Inter UI", system-ui, sans-serif;
  scroll-behavior: smooth;
}

.font-code {
  font-family: 'Space Mono', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
}
.editorContainer {
  position: relative;

  @media print {
    padding: 50px;
  }

  .ProseMirror {
    padding: 25px calc((100% - (750px)) / 2);
    outline: none;

    /* Color swatches */
    .color {
      white-space: nowrap;

      &::before {
        content: ' ';
        display: inline-block;
        width: 1em;
        height: 1em;
        border: 1px solid rgba(128, 128, 128, 0.3);
        vertical-align: middle;
        margin-right: 0.1em;
        margin-bottom: 0.15em;
        border-radius: 2px;
        background-color: var(--color);
      }
    }

    .details {
      @apply flex items-baseline;

      > div {
        width: 100%;
        summary + div {
          @apply border-t border-stone-200 dark:border-gray-600 mt-2;

          p:last-child {
            margin-bottom: 0;
          }
        }
      }

      > button {
        display: flex;
        cursor: pointer;
        background: transparent;
        border: none;
        padding: 0;

        &::before {
          content: '\25B6';
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 1.5em;
          height: 1.5em;
        }
      }

      &.is-open > button::before {
        content: '\25BC';
      }
    }

    /* Collaboration cursor */
    .collaboration-cursor__caret {
      border-left: 1px solid #0d0d0d;
      border-right: 1px solid #0d0d0d;

      margin-left: -1px;
      margin-right: -1px;
      position: relative;
      word-break: normal;
      box-sizing: border-box;

      &::after {
        content: "";
        display: block;
        position: absolute;
        left: -8px;
        right: -8px;
        top: 0;
        bottom: 0;
      }

      .collaboration-cursor__label {
        opacity: 0;
        border-radius: 3px 3px 3px 0;
        color: #ffffff;
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        left: -1px;
        line-height: normal;
        padding: 0.1rem 0.3rem;
        position: absolute;
        top: -1.4em;
        user-select: none;
        white-space: nowrap;
        transition: opacity 100ms ease-in-out;
      }

      &:hover {
        .collaboration-cursor__label {
          opacity: 1;
        }
      }
    }

    /* Placeholder*/
    & > .is-editor-empty::before, & > .is-empty.has-focus::before {
      color: #adb5bd;
      content: attr(data-placeholder);
      float: left;
      height: 0;
      pointer-events: none;
    }

    @media print {
      padding: 0;
    }
  }

  .contentEditor {
    .ProseMirror {
      font-size: 0.95em;
      line-height: 1.6rem;

      /**
      * Fade-in animation
      */
      animation: fade-in 0.25s;

      .image {
        animation: fade-in 0.25s;
      }

      .iframe-wrapper iframe {
        width: 100%;
        aspect-ratio: 16 / 9;
      }

      /**
      * Blocks spacing
      */

      & > *,
      li > *,
      div[data-type="detailsContent"] > *,
      div[data-type="callout"] > .content > *,
      blockquote > * {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
      }

      /**
      * Format
      */
      p {
        font-weight: 400;
      }

      p strong,
      summary strong {
        font-weight: 600;
      }

      p code {
        font-weight: 500;
      }

      a {
        cursor: pointer;
        line-height: 1.6rem;
        @apply text-primary-500;

        &:hover {
          @apply text-primary-600;
        }
      }

      /**
      * Blocks
      */
      h1,
      h2,
      h3 {
        font-weight: 700;
        line-height: 2rem;
      }

      h1 {
        font-size: 1.8em;
      }

      h2 {
        font-size: 1.5em;
      }

      h3 {
        font-size: 1.2em;
      }

      blockquote {
        border-left: 3px solid rgb(13, 13, 13);
        @apply dark:border-white;
        padding-left: 1.5rem;
        margin-left: 0;
        margin-right: 0;
      }

      ul[data-type="taskList"] {
        padding-left: 0;
      }

      ul[data-type="taskList"] li > label, ul[data-type="taskList"] li > div {
        margin: 0;
      }

      ul[data-type="taskList"] li > label input[type="checkbox"] {
        border: 1px solid rgb(144, 149, 157);
        height: 14px;
        width: 14px;
        box-sizing: border-box;
        margin: 0;
        user-select: none;
        border-radius: 3px;
        appearance: none;
        background-color: transparent;
        flex-shrink: 0;
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

      .tiptap-math.latex {
        display: inline-flex;
        align-items: center;
        width: fit-content;
      }

      .tiptap-math.latex.ProseMirror-selectednode {
        outline: 1px solid black;
      }

      .tiptap-math.result {
        background-color: #78e65618;
        border-bottom: rgb(68, 194, 68) 2px solid;
        padding-left: 4px;
        padding-right: 2px;
        height: fit-content;
      }

      div[data-type="callout"] {
        display: flex;
        gap: 0.5rem;
        padding: 0.5rem 1.5rem;
        background-color: white;
        border-radius: 0.25rem;

        & > .emoji-wrapper {
          padding-top: 0.25rem;
          display: flex;
          align-items: flex-start;
          flex-shrink: 0;

          & > span {
            text-align: center;
            width: 2rem;
            height: 2rem;
            margin: 0;
            padding: 0.25rem;
            border-radius: 0.25rem;
            cursor: pointer;
            transition: background-color 0.1s;
            user-select: none;

            & > img {
              width: 100%;
              pointer-events: none;
            }

            &:hover {
              background-color: #e6e8ec;
            }
          }
        }

        & > .content {
          width: 100%;
        }
      }

      div[data-type="horizontalRule"] {
        line-height: 0;
        padding: 0.25rem 0;

        & > div {
          border-bottom: 1px solid #dddddd;
        }
      }

      div[data-youtube-video] > iframe {
        display: flex;
        width: 100%;
      }

      table {
        border-collapse: collapse;
        table-layout: fixed;
        width: 100%;
        max-width: 100%;
        margin: 0;
        overflow: hidden;

        td,
        th {
          min-width: 1em;
          padding: 3px 5px;
          vertical-align: top;
          box-sizing: border-box;
          position: relative;
          @apply bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600;

          > * {
            margin-bottom: 0;
          }
        }

        th {
          font-weight: bold;
          text-align: left;
          @apply bg-gray-100 dark:bg-gray-800;
          }

        .selectedCell:after {
          z-index: 2;
          position: absolute;
          content: "";
          left: 0; right: 0; top: 0; bottom: 0;
          background: rgba(200, 200, 255, 0.4);
          pointer-events: none;
        }

        .column-resize-handle {
          position: absolute;
          right: -2px;
          top: 0;
          bottom: -2px;
          width: 4px;
          background-color: #adf;
          cursor: col-resize;
        }

        p {
          margin: 0;
        }
      }

      .tableWrapper {
        overflow-x: auto;
      }

      .resize-cursor {
        cursor: ew-resize;
        cursor: col-resize;
      }

      .column-block {
        width: 100%;
        display: grid;
        overflow: hidden;
        grid-auto-columns: minmax(0, 1fr);
        @apply grid-flow-row lg:grid-flow-col;
        gap: 12px;
      }

      .column {
        flex: 0 1 auto;
        border: 1px transparent dashed;
      }

      .column-block.has-focus .column {
        border: 1px gray dashed;
      }

      /**
      * Inline
      */
      span[data-type="emoji"] {
        display: inline;
        padding: 0.1rem;

        & > img.emoji {
          height: 1.2rem;
          width: 1.2rem;
          margin: 0 0.05em 0 0.1em;
          vertical-align: -0.2em;
        }
      }

      h1 span[data-type="emoji"] > img.emoji {
        height: 1.8rem;
        width: 1.8rem;
      }

      h2 span[data-type="emoji"] > img.emoji {
        height: 1.5rem;
        width: 1.5rem;
      }

      h3 span[data-type="emoji"] > img.emoji {
        height: 1.2rem;
        width: 1.2rem;
      }

      /**
      * Selections
      */

      // Text selection
      &:not(.ProseMirror-hideselection) *::selection {
        @apply bg-gray-100 dark:bg-gray-600;
        color: inherit;
      }

      // Node selection
      &:not(.dragging) {
        .ProseMirror-selectednode {
          outline: none !important;
          border-radius: 0.2rem;
          transition: background-color 0.2s;
          box-shadow: none;
          @apply bg-gray-100 dark:bg-gray-600;

          &.image,
          &.imagePlaceholder,
          &.video,
          &.videoPlaceholder,
          &.lesson,
          &.lessonPlaceholder,
          &.iframe-wrapper,
          &.callout-box-content {
            background-color: transparent !important;
            transition: box-shadow ease-out 200ms !important;

            *::selection {
              background: none;
            }
          }

          &.image,
          &.imagePlaceholder,
          &.video,
          &.videoPlaceholder,
          &.lesson,
          &.lessonPlaceholder,
          &.iframe-wrapper,
          &.callout-box-content {
            box-shadow: rgb(51, 102, 255, 0.9) 0px 0px 0px 2px !important;
          }

          &.tableWrapper {
            box-shadow: rgb(51, 102, 255, 0.9) 0px 0px 0px 2px inset !important;
          }
        }
      }
    }
  }
}
</style>
