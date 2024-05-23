import { type CommandProps, mergeAttributes, Node, VueNodeViewRenderer } from '@tiptap/vue-3'
import VideoPlaceholderComponent from './VideoPlaceholderComponent.vue'

export interface VideoPlaceholderOptions {
  HTMLAttributes: Record<string, any>
  Component: any
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    videoPlaceholder: {
      /**
       * Inserts an video placeholder
       */
      insertVideoPlaceholder: (docId: string) => ReturnType
    }
  }
}

export default Node.create<VideoPlaceholderOptions>({
  name: "videoPlaceholder",

  addOptions() {
    return {
      HTMLAttributes: {},
      Component: null
    }
  },

  group: "block",

  atom: true,

  parseHTML() {
    return [{ tag: `div[data-type="${this.name}"]` }]
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return VueNodeViewRenderer(VideoPlaceholderComponent)
  },

  addCommands() {
    return {
      insertVideoPlaceholder: () => (props: CommandProps) => {
        return props.commands.insertContent({
          type: "videoPlaceholder"
        })
      }
    }
  }
})
