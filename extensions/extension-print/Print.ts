import { Extension } from '@tiptap/core'
import { printEditorContent } from '@/utils/print'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    print: {
      print: () => ReturnType
    }
  }
}

const Print = Extension.create({
  name: 'print',

  addCommands() {
    return {
      print: () => ({ view }) => printEditorContent(view)
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-p': () => this.editor.commands.print.print()
    }
  }
})

export default Print
