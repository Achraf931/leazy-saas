import { VueNodeViewRenderer } from '@tiptap/vue-3'
import { mergeAttributes, Node } from '@tiptap/core'
import TweetPlaceholderComponent from './TweetPlaceholder.vue'

export const TweetPlaceholder = Node.create({
  name: 'twitterPlaceholder',

  group: 'block',

  atom: true,

  draggable: true,

  addOptions() {
    return {
      HTMLAttributes: {}
    }
  },

  parseHTML() {
    return [{ tag: `div[data-type="${this.name}"]` }]
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes)]
  },

  addCommands() {
    return {
      insertTweetPlaceholder: () => ({ commands }) => {
        return commands.insertContent({
          type: this.name
        })
      }
    }
  },

  addNodeView() {
    return VueNodeViewRenderer(TweetPlaceholderComponent)
  }
})
