import { nodePasteRule, VueNodeViewRenderer } from '@tiptap/vue-3'
import { mergeAttributes, Node } from '@tiptap/core'
import TwitterComponent from './components/Twitter.vue'

export interface TwitterOptions {
  url: string
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    twitter: {
      setTwitter: (attributes: { url: string }) => ReturnType
    }
  }
}

export const Twitter = Node.create<TwitterOptions>({
  name: 'twitter',

  group: 'block',

  atom: true,

  draggable: true,

  addPasteRules() {
    const twitterUrl = /^https:\/\/(twitter\.com|x\.com)\/.*\/status\/.*/g

    return [
      nodePasteRule({
        find: twitterUrl,
        type: this.type,
        getAttributes: (match) => {
          return { url: match.input }
        }
      })
    ]
  },

  addAttributes() {
    return {
      url: {
        default: 'https://twitter.com/vercel/status/1683920951807971329'
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'twitter'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['twitter', mergeAttributes(HTMLAttributes)]
  },

  addCommands() {
    return {
      setTwitter: (attributes) => ({ commands }) => {
        return commands.insertContent({
          type: this.type,
          attrs: attributes
        })
      }
    }
  },

  addNodeView() {
    return VueNodeViewRenderer(TwitterComponent)
  }
})