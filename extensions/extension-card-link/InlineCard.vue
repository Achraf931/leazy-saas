<script setup lang="ts">
import { NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
const props = defineProps(['node']);

console.log(props.node)
</script>

<template>
  <NodeViewWrapper class="not-prose">
    <!-- 'url' is props.node.attrs.url and 'text' is props.node.attrs.text -->
    <!-- Render your <UPopover /> component -->
    <UPopover mode="hover" :popper="{ placement: 'top-start' }">
      <NodeViewContent @click.stop>
        {{ props.node.attrs.text }}
      </NodeViewContent>
      <template #panel>
        <div>
          <p>
            {{ node.attrs.text }}
          </p>
          <ULink :to="node.attrs.url" target="_blank">
            Open
          </ULink>
        </div>
      </template>
    </UPopover>
  </NodeViewWrapper>
</template>
