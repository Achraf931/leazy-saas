import { Editor, type Range, Extension } from '@tiptap/core'
import { VueRenderer } from '@tiptap/vue-3'
import tippy from 'tippy.js'
import Suggestion from '@tiptap/suggestion'
// @ts-ignore
import SlashCommandList from './SlashMenuComponent.vue'
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  Code,
  ListOrdered,
  MessageSquarePlus,
  Text,
  TextQuote,
  CheckSquare,
  Sparkles,
  Image,
  Minus,
  Mic,
  Columns2
} from 'lucide-vue-next'

const Command = Extension.create({
  name: 'slash-command',
  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }: { editor: Editor, range: Range, props: any }) => {
          props.command({ editor, range })
        }
      }
    }
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion
      })
    ]
  }
})

interface CommandProps {
  editor: Editor,
  range: Range
}

export interface SuggestionItem {
  label: string,
  description: string,
}

const getSuggestionItems = ({ query }: { query: string }) => {
  return [
    {
      label: 'Complétez avec l\'IA',
      description: 'Poursuivre votre message',
      searchTerms: ['gpt'],
      icon: Sparkles
    },
    {
      label: 'Envoyer un feedback',
      description: 'Envoyer un feedback à l\'enseignant',
      searchTerms: ['feedback'],
      icon: MessageSquarePlus,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).run()
        window.open('/feeback', '_blank')
      }
    },
    {
      label: "Parler pour écrire",
      description: "Activer la reconnaissance vocale",
      searchTerms: ["speech", "recognition", "voice", "talk"],
      icon: Mic,
      command: ({ editor, range }: CommandProps) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .startSpeechRecognition()
          .run();
      },
    },
    {
      label: 'Texte',
      description: 'Ajouter un texte',
      searchTerms: ['p', 'paragraph'],
      icon: Text,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).toggleNode('paragraph', 'paragraph').run()
      }
    },
    {
      label: 'Titre 1',
      description: 'Ajouter un titre de niveau 1',
      searchTerms: ['h1', 'title', 'heading', 'big', 'large'],
      icon: Heading1,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run()
      }
    },
    {
      label: 'Titre 2',
      description: 'Ajouter un titre de niveau 2',
      searchTerms: ['h2', 'title', 'heading', 'medium', 'subtitle'],
      icon: Heading2,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run()
      }
    },
    {
      label: 'Titre 3',
      description: 'Ajouter un titre de niveau 3',
      searchTerms: ['h3', 'title', 'heading', 'small', 'subtitle'],
      icon: Heading3,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run()
      }
    },
    {
      label: 'Titre 4',
      description: 'Ajouter un titre de niveau 4',
      searchTerms: ['h4', 'title', 'heading', 'small', 'subtitle'],
      icon: Heading4,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 4 }).run()
      }
    },
    {
      label: 'Titre 5',
      description: 'Ajouter un titre de niveau 5',
      searchTerms: ['h5', 'title', 'heading', 'small', 'subtitle'],
      icon: Heading5,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 5 }).run()
      }
    },
    {
      label: 'Titre 6',
      description: 'Ajouter un titre de niveau 6',
      searchTerms: ['h6', 'title', 'heading', 'small', 'subtitle'],
      icon: Heading6,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 6 }).run()
      }
    },
    {
      label: 'Liste de tâches',
      description: 'Ajouter une liste de tâches',
      searchTerms: ['todo', 'list', 'task', 'checklist', 'check', 'checkbox'],
      icon: CheckSquare,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).toggleTaskList().run()
      }
    },
    {
      label: 'Liste à puces',
      description: 'Ajouter une liste à puces',
      searchTerms: ['ul', 'list', 'bullet', 'unordered'],
      icon: List,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run()
      }
    },
    {
      label: 'Liste numérotée',
      description: 'Ajouter une liste numérotée',
      searchTerms: ['ol', 'list', 'number', 'ordered'],
      icon: ListOrdered,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run()
      }
    },
    {
      label: 'Citation',
      description: 'Ajouter une citation',
      searchTerms: ['quote', 'blockquote', 'citation'],
      icon: TextQuote,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).toggleNode('paragraph', 'paragraph').toggleBlockquote().run()
      }
    },
    {
      label: 'Code',
      description: 'Ajouter du code',
      searchTerms: ['code', 'pre', 'preformatted'],
      icon: Code,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run()
      }
    },
    {
      label: 'Iframe',
      description: 'Ajouter un iframe',
      searchTerms: ['iframe', 'embed'],
      icon: Code,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).setIframe(editor).run()
      }
    },
    {
      label: 'Image',
      description: 'Ajouter une image',
      searchTerms: ['img', 'image', 'photo', 'picture'],
      icon: Image,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).insertImagePlaceholder().run()
        /*editor.chain().focus().deleteRange(range).run()
        //  upload file
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/!*'
        input.onchange = async () => {
          if (input.files?.length) {
            const file = input.files[0]
            const pos = editor.view.state.selection.from
            // startImageUpload(file, editor.view, pos)
          }
        }
        input.click()*/
      }
    },
    {
      label: 'Séparateur',
      description: 'Ajouter un séparateur horizontal',
      searchTerms: ['hr', 'rule', 'line'],
      icon: Minus,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).setHorizontalRule().run()
      }
    },
    {
      label: 'Layout',
      description: 'Ajouter un layout',
      searchTerms: ['layout', 'grid', 'flex'],
      icon: Columns2,
      command: ({ editor, range }: CommandProps) => {
        console.log(editor)
        editor.chain().focus().setColumns(2).run()
      }
    }
  ].filter(item => {
    if (typeof query === 'string' && query.length > 0) {
      const search = query.toLowerCase()

      return (
        item.label?.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search) ||
        (item.searchTerms && item.searchTerms.some((term: string) => term.includes(search)))
      )
    }

    return true
  })
}

const renderItems = () => {
  let component: VueRenderer | null = null
  let popup: any | null = null

  return {
    onStart: (props: { editor: Editor; clientRect: DOMRect }) => {
      component = new VueRenderer(SlashCommandList, {
        props,
        editor: props.editor,
      })

      if (!props.clientRect) return

      popup = tippy('body', {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        inertia: true,
        trigger: 'manual',
        placement: 'bottom-start',
      })
    },
    onUpdate: (props: { editor: Editor; clientRect: DOMRect }) => {
      component?.updateProps(props)

      popup && popup[0].setProps({
        getReferenceClientRect: props.clientRect as () => DOMRect,
      })
    },
    onKeyDown: (props: { event: KeyboardEvent }) => {
      if (props.event.key === 'Escape') {
        popup?.[0].hide()

        return true
      }

      return component?.ref?.onKeyDown(props.event)
    },
    onExit: () => {
      popup?.[0].destroy()
      component?.destroy()
    }
  }
}

export interface SuggestionItem {
  title: string;
  description: string;
}

export const SlashMenu = Command.configure({
  suggestion: {
    items: getSuggestionItems,
    render: renderItems
  }
})
