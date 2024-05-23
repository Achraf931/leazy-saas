<script setup>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'

const props = defineProps(nodeViewProps)

const languages = ref(props.extension.options.lowlight.listLanguages())

const selectedLanguage = computed({
  get: () => props.node.attrs.language,
  set: (language) => {
    props.updateAttributes({ language })
  }
})
</script>

<template>
  <NodeViewWrapper class="code-block">
    <select contenteditable="false" v-model="selectedLanguage">
      <option :value="null">auto</option>
      <option disabled>-</option>
      <option v-for="(language, index) in languages" :key="index" :value="language">
        {{ language }}
      </option>
    </select>
    <pre>
      <code>
        <NodeViewContent class="text-[15.2px]" />
      </code>
    </pre>
  </NodeViewWrapper>
</template>

<style lang="scss">
.code-block {
  position: relative;

  select {
    position: absolute;
    top: .5rem;
    right: .5rem;
  }

  pre {
    @apply flex bg-gray-800 rounded-lg text-white w-full;
    font-size: 15.2px;
    font-family: 'JetBrainsMono', monospace;

    code {
      display: flex;
    }
  }

  .hljs {
    color: #c9d1d9;
    background: #0d1117
  }

  .hljs-doctag, .hljs-keyword, .hljs-meta .hljs-keyword, .hljs-template-tag, .hljs-template-variable, .hljs-type, .hljs-variable.language_ {
    color: #ff7b72
  }

  .hljs-title, .hljs-title.class_, .hljs-title.class_.inherited__, .hljs-title.function_ {
    color: #d2a8ff
  }

  .hljs-attr, .hljs-attribute, .hljs-literal, .hljs-meta, .hljs-number, .hljs-operator, .hljs-selector-attr, .hljs-selector-class, .hljs-selector-id, .hljs-variable {
    color: #79c0ff
  }

  .hljs-meta .hljs-string, .hljs-regexp, .hljs-string {
    color: #a5d6ff
  }

  .hljs-built_in, .hljs-symbol {
    color: #ffa657
  }

  .hljs-code, .hljs-comment, .hljs-formula {
    color: #8b949e
  }

  .hljs-name, .hljs-quote, .hljs-selector-pseudo, .hljs-selector-tag {
    color: #7ee787
  }

  .hljs-subst {
    color: #c9d1d9
  }

  .hljs-section {
    color: #1f6feb;
    font-weight: 700
  }

  .hljs-bullet {
    color: #f2cc60
  }

  .hljs-emphasis {
    color: #c9d1d9;
    font-style: italic
  }

  .hljs-strong {
    color: #c9d1d9;
    font-weight: 700
  }

  .hljs-addition {
    color: #aff5b4;
    background-color: #033a16
  }

  .hljs-deletion {
    color: #ffdcd7;
    background-color: #67060c
  }
}
</style>
