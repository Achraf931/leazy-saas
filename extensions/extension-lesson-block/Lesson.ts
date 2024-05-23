import { mergeAttributes, Node } from "@tiptap/core"
import { VueNodeViewRenderer } from "@tiptap/vue-3"
import LessonComponent from './LessonComponent.vue'

export interface LessonOptions {
  allowBase64: boolean
  HTMLAttributes: Record<string, any>
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    lesson: {
      /**
       * Add a lesson
       */
      setLesson: (options: {
        chapter_id: number
        content: object
        created_at: string
        deleted_at: string
        description: string
        draft: boolean
        id: number
        name: string
        order: number
        private: boolean
        slug: string
        updated_at: string
        user_id: number
      }) => ReturnType
    }
  }
}

export const Lesson = Node.create<LessonOptions>({
  name: "lesson",

  addOptions() {
    return {
      allowBase64: true,
      HTMLAttributes: {}
    }
  },

  group: "block",

  isolating: true,
  draggable: true,
  atom: true,

  addAttributes() {
    return {
      chapter_id: {
        default: null
      },
      content: {
        default: null
      },
      created_at: {
        default: null
      },
      deleted_at: {
        default: null
      },
      description: {
        default: null
      },
      draft: {
        default: null
      },
      id: {
        default: null
      },
      name: {
        default: null
      },
      order: {
        default: null
      },
      private: {
        default: null
      },
      slug: {
        default: null
      },
      updated_at: {
        default: null
      },
      user_id: {
        default: null
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: "a[href]"
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "a",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)
    ]
  },

  addNodeView() {
    return VueNodeViewRenderer(LessonComponent)
  },

  addCommands() {
    return {
      setLesson:
        (options) =>
          ({ commands }) => {
            return commands.insertContent({
              type: this.name,
              attrs: options
            })
          }
    }
  }
})
