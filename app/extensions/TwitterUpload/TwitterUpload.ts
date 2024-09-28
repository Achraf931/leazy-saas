import { nodePasteRule, VueNodeViewRenderer } from '@tiptap/vue-3'
import { mergeAttributes, Node } from '@tiptap/core'
import TwitterUploadComponent from './components/TwitterUpload.vue'
import ActionButton from '@/components/ActionButton.vue'

export interface TwitterUploadOptions {
  url: string
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    twitterUpload: {
      setTwitterUpload: (attributes: { url: string }) => ReturnType
    }
  }
}

export const TwitterUpload = Node.create<TwitterUploadOptions>({
  name: 'twitterUpload',

  group: 'block',

  atom: true,

  draggable: true,

  addOptions() {
    return {
      ...this.parent?.(),
      url: undefined,
      button: ({ editor, t }) => {
        return {
          component: ActionButton,
          componentProps: {
            action: () => editor.commands.setTwitterUpload(),
            isActive: () => editor.isActive('twitterUpload') || false,
            disabled: !editor.can().setTwitterUpload(),
            icon: 'i-lucide-twitter',
            tooltip: 'Twitter',
          }
        }
      }
    }
  },

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
      setTwitterUpload: () => ({ commands }) => {
        return commands.insertContent({
          type: this.name
        })
      }
    }
  },

  addNodeView() {
    return VueNodeViewRenderer(TwitterUploadComponent)
  }
})
