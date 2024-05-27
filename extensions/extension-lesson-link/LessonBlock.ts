import { Plugin, PluginKey } from "@tiptap/pm/state"
import { type CommandProps, mergeAttributes, Node } from "@tiptap/core"
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import LessonComponent from './LessonComponent'

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    lessonBlock: {
      /**
       * Inserts a lessonBlock with the given document id
       */
      insertLesson: (lessonId: string) => ReturnType
    }
  }
}

interface LessonBlockProps {
  HTMLAttributes: Record<string, any>

  /**
   * Event triggered when a lessonBlock node is removed.
   * Can be used to remove the lessonBlock from the database as well.
   * @param id The id of the deleted lessonBlock
   * @returns
   */
  onDeleteLesson: (id: string) => any
}

export const LessonBlock = Node.create<LessonBlockProps>({
  name: "lessonBlock",

  group: "block",

  addOptions() {
    return {
      HTMLAttributes: {},
      onDeleteLesson: () => {}
    }
  },

  addAttributes() {
    return {
      lessonId: {
        type: "string",
        isRequired: true
      }
    }
  },

  parseHTML() {
    return [{ tag: `div[data-type="${this.name}"]`, ignore: true }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": this.name })
    ]
  },

  addNodeView() {
    return VueNodeViewRenderer(LessonComponent)
  },

  addCommands() {
    return {
      insertLesson: (lessonId: string) => (props: CommandProps) => {
        return props.commands.insertContent({
          type: "lessonBlock",
          attrs: {
            lessonId
          }
        })
      }
    }
  },

  addPasteRules() {
    // TODO : Add paste rules.
    return []
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey(),
        props: {
          handleDrop(view, event, slice) {
            if (event.ctrlKey === true) {
              // TODO : When dropping a "lesson" that has been duplicated
              // with Ctrl + Drag, create a duplicate in the database too.
            }
          }
          // transformPasted(slice) {
          //     // TODO : Duplicate on database too.
          //     // Note : a document with the given ID may exist in the database even if
          //     // the user doesn't have access to.

          //     // const test = new Promise(resolve => setTimeout(resolve, 3000));

          //     return slice
          // }
        },
        filterTransaction: (tr, state) => {
          if (tr.getMeta("uiEvent") === "drop") return true

          try {
            const replaceSteps: any[] = []
            tr.steps.forEach((step, index) => {
              if (step.toJSON().stepType === "replace") {
                replaceSteps.push(index)
              }
            })

            replaceSteps.forEach((index) => {
              const map = tr.mapping.maps[index]
              map.forEach((oldStart, oldEnd) => {
                state.doc.nodesBetween(
                  oldStart,
                  oldEnd,
                  (node) => {
                    if (node.type.name === "lessonBlock") {
                      this.options.onDeleteLesson(
                        node.attrs.lessonId
                      )
                    }
                  }
                )
              })
            })

            return true
          } catch (error) {
            console.error(error)
            return true
          }
        }
      })
    ]
  }
})
