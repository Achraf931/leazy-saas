import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Component from './DraggableComponent.vue'

export default Node.create({
  name: 'draggableItem',

  group: 'block',

  content: 'block+',

  draggable: true,

  parseHTML() {
    console.log('parseHTML')
    return [
      {
        tag: 'div[data-type="draggable-item"]'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    console.log('renderHTML')
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'draggable-item' }), 0]
  },

  addNodeView() {
    console.log('addNodeView')
    return VueNodeViewRenderer(Component)
  }
})
