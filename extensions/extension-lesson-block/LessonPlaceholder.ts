import { type CommandProps, mergeAttributes, Node, VueNodeViewRenderer } from '@tiptap/vue-3'
import LessonPlaceholderComponent from './LessonPlaceholderComponent.vue'

export interface LessonPlaceholderOptions {
  HTMLAttributes: Record<string, any>
  Component: any
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    lessonPlaceholder: {
      /**
       * Inserts an lesson placeholder
       */
      insertLessonPlaceholder: (docId: string) => ReturnType
    }
  }
}

export default Node.create<LessonPlaceholderOptions>({
  name: "lessonPlaceholder",

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
    return VueNodeViewRenderer(LessonPlaceholderComponent)
  },

  addCommands() {
    return {
      insertLessonPlaceholder: () => (props: CommandProps) => {
        return props.commands.insertContent({
          type: "lessonPlaceholder"
        })
      }
    }
  }
})
