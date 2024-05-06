import { mergeAttributes, Node, nodeInputRule } from "@tiptap/core"
import { VueNodeViewRenderer } from "@tiptap/vue-3"
import VideoComponent from './VideoComponent.vue'

export interface VideoOptions {
  allowBase64: boolean
  HTMLAttributes: Record<string, any>
  Component: any
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    video: {
      /**
       * Add an image
       */
      setVideo: (options: {
        src: string
      }) => ReturnType
    }
  }
}

export const inputRegex =
  /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/

export const Video = Node.create<VideoOptions>({
  name: "video",

  addOptions() {
    return {
      allowBase64: true,
      HTMLAttributes: {},
      Component: null
    }
  },

  group: "block",

  isolating: true,
  draggable: true,
  atom: true,

  addAttributes() {
    return {
      src: {
        default: null
      },
      width: {
        default: "fit-content"
      },
      height: {
        default: null
      },
      align: {
        default: "center"
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: this.options.allowBase64
          ? "video[src]"
          : 'video[src]:not([src^="data:"])'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "video",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)
    ]
  },

  addNodeView() {
    return VueNodeViewRenderer(VideoComponent)
  },

  addCommands() {
    return {
      setVideo:
        (options) =>
          ({ commands }) => {
            return commands.insertContent({
              type: this.name,
              attrs: options
            })
          }
    }
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: (match) => {
          const [, , src] = match

          return { src }
        }
      })
    ]
  }
})
