import { type CommandProps, mergeAttributes, Node, VueNodeViewRenderer } from '@tiptap/vue-3'
import ImagePlaceholderComponent from './ImagePlaceholderComponent.vue'

export interface ImagePlaceholderOptions {
  HTMLAttributes: Record<string, any>
  Component: any
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imagePlaceholder: {
      /**
       * Inserts an image placeholder
       */
      insertImagePlaceholder: (docId: string) => ReturnType
    }
  }
}

export default Node.create<ImagePlaceholderOptions>({
  name: "imagePlaceholder",

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
    return VueNodeViewRenderer(ImagePlaceholderComponent)
  },

  addCommands() {
    return {
      insertImagePlaceholder: () => (props: CommandProps) => {
        return props.commands.insertContent({
          type: "imagePlaceholder"
        })
      }
    }
  }
})
