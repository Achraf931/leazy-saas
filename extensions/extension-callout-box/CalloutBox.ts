import { Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import CalloutBoxComponent from './CalloutBoxComponent.vue'

export default Node.create({
  name: 'calloutBox',
  group: 'block',
  content: 'inline*',
  draggable: true,
  defining: true,
  marks: '',
  selectable: true,
  parseHTML() {
    return [
      {
        tag: 'vue-component'
      }
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['vue-component', { ...HTMLAttributes, class: 'callout-box' }, 0]
  },
  addCommands() {
    return {
      setCalloutBox: (attributes) => ({ commands }) => {
        return commands.setNode(this.name, attributes)
      }
    }
  },
  addAttributes() {
    return {
      type: {
        default: 'note'
      }
    }
  },
  addNodeView() {
    return VueNodeViewRenderer(CalloutBoxComponent)
  }
})
