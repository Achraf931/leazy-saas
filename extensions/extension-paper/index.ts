import { mergeAttributes, Node, VueNodeViewRenderer } from '@tiptap/vue-3'

import Component from './Paper.vue'

export default Node.create({
  name: 'paper',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      lines: {
        default: [],
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="paper"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'paper' })]
  },

  addCommands() {
    return {
      setPaper: (lines) => ({ tr, commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: { lines },
        })
      },
    }
  },

  addNodeView() {
    return VueNodeViewRenderer(Component)
  },
})
