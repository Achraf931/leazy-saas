import { type CommandProps, mergeAttributes, Node, VueNodeViewRenderer } from '@tiptap/vue-3'
import LessonUploadComponent from './components/LessonUpload.vue'

export interface LessonUploadOptions {
  HTMLAttributes: Record<string, any>
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    lessonUpload: {
      /**
       * Inserts an lesson upload
       */
      setLessonUpload: (docId: string) => ReturnType
    }
  }
}

export const LessonUpload = Node.create<LessonUploadOptions>({
  name: "lessonUpload",

  addOptions() {
    return {
      HTMLAttributes: {}
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
    return VueNodeViewRenderer(LessonUploadComponent)
  },

  addCommands() {
    return {
      setLessonUpload: () => (props: CommandProps) => {
        return props.commands.insertContent({
          type: this.name
        })
      }
    }
  }
})
