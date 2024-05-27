import { Editor, type Range, Extension } from '@tiptap/core'
import { VueRenderer } from '@tiptap/vue-3'
import tippy from 'tippy.js'
import Suggestion from '@tiptap/suggestion'
import SlashCommandList from './SlashMenuComponent'

const metaSymbol = {
  value: '⌘',
  name: 'Command',
}

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
      icon: 'i-lucide-sparkles',
      shortcuts: ['+++']
    },
    {
      label: 'Dessiner',
      description: 'Dessiner sur la page',
      searchTerms: ['draw', 'sketch', 'paint'],
      icon: 'i-lucide-pen',
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).setPaper().run()
      },
      shortcuts: []
    },
    /*{
      label: 'Envoyer un feedback',
      description: 'Envoyer un feedback à l\'enseignant',
      searchTerms: ['feedback'],
      icon: 'i-lucide-forward',
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).run()
        window.open('/feeback', '_blank')
      },
      shortcuts: []
    },*/
    {
      label: "Parler pour écrire",
      description: "Activer la reconnaissance vocale",
      searchTerms: ["speech", "recognition", "voice", "talk"],
      icon: 'i-lucide-mic',
      command: ({ editor, range }: CommandProps) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .startSpeechRecognition()
          .run();
      },
      shortcuts: [metaSymbol.value, 'Shift', 'L']
    },
    {
      label: 'Texte',
      description: 'Ajouter un texte',
      searchTerms: ['p', 'paragraph'],
      icon: 'i-lucide-case-sensitive',
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).toggleNode('paragraph', 'paragraph').run()
      },
      shortcuts: [metaSymbol.value, 'Alt', '0']
    },
    {
      label: 'Titre 1',
      description: 'Ajouter un titre de niveau 1',
      searchTerms: ['h1', 'title', 'heading', 'big', 'large'],
      icon: 'i-lucide-heading-1',
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run()
      },
      shortcuts: [metaSymbol.value, 'Alt', '1']
    },
    {
      label: 'Titre 2',
      description: 'Ajouter un titre de niveau 2',
      searchTerms: ['h2', 'title', 'heading', 'medium', 'subtitle'],
      icon: 'i-lucide-heading-2',
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run()
      },
      shortcuts: [metaSymbol.value, 'Alt', '2']
    },
    {
      label: 'Titre 3',
      description: 'Ajouter un titre de niveau 3',
      searchTerms: ['h3', 'title', 'heading', 'small', 'subtitle'],
      icon: 'i-lucide-heading-3',
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run()
      },
      shortcuts: [metaSymbol.value, 'Alt', '3']
    },
    {
      label: 'Titre 4',
      description: 'Ajouter un titre de niveau 4',
      searchTerms: ['h4', 'title', 'heading', 'small', 'subtitle'],
      icon: 'i-lucide-heading-4',
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 4 }).run()
      },
      shortcuts: [metaSymbol.value, 'Alt', '4']
    },
    {
      label: 'Titre 5',
      description: 'Ajouter un titre de niveau 5',
      searchTerms: ['h5', 'title', 'heading', 'small', 'subtitle'],
      icon: 'i-lucide-heading-5',
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 5 }).run()
      },
      shortcuts: [metaSymbol.value, 'Alt', '5']
    },
    {
      label: 'Titre 6',
      description: 'Ajouter un titre de niveau 6',
      searchTerms: ['h6', 'title', 'heading', 'small', 'subtitle'],
      icon: 'i-lucide-heading-6',
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 6 }).run()
      },
      shortcuts: [metaSymbol.value, 'Alt', '6']
    },
    {
      label: 'Leçon',
      description: 'Ajouter une leçon',
      searchTerms: ['lesson', 'course', 'module'],
      icon: 'i-lucide-book',
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).insertLessonPlaceholder().run()
      },
      shortcuts: []
    },
    {
      label: 'Informations',
      description: 'Ajouter des informations',
      searchTerms: ['info', 'informations'],
      icon: 'i-lucide-megaphone',
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).setCalloutBox('info').run()
      },
      shortcuts: []
    },
    {
      label: 'Déroulant',
      description: 'Ajouter un texte déroulant',
      searchTerms: ['details', 'summary', 'dropdown', 'toggle'],
      icon: 'i-lucide-list-collapse',
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).setDetails().run()
      },
      shortcuts: []
    },
    {
      label: 'Liste de tâches',
      description: 'Ajouter une liste de tâches',
      searchTerms: ['todo', 'list', 'task', 'checklist', 'check', 'checkbox'],
      icon: 'i-lucide-check-square',
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).toggleTaskList().run()
      },
      shortcuts: [metaSymbol.value, 'Alt', '9']
    },
    {
      label: 'Liste à puces',
      description: 'Ajouter une liste à puces',
      searchTerms: ['ul', 'list', 'bullet', 'unordered'],
      icon: 'i-lucide-list',
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run()
      },
      shortcuts: [metaSymbol.value, 'Alt', '8']
    },
    {
      label: 'Liste numérotée',
      description: 'Ajouter une liste numérotée',
      searchTerms: ['ol', 'list', 'number', 'ordered'],
      icon: 'i-lucide-list-ordered',
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run()
      },
      shortcuts: [metaSymbol.value, 'Alt', '7']
    },
    {
      label: 'Citation',
      description: 'Ajouter une citation',
      searchTerms: ['quote', 'blockquote', 'citation'],
      icon: 'i-lucide-text-quote',
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).toggleNode('paragraph', 'paragraph').toggleBlockquote().run()
      },
      shortcuts: [metaSymbol.value, 'Alt', 'B']
    },
    {
      label: 'Code',
      description: 'Ajouter du code',
      searchTerms: ['code', 'pre', 'preformatted'],
      icon: 'i-lucide-code',
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run()
      },
      shortcuts: [metaSymbol.value, 'Alt', 'C']
    },
    /*{
      label: 'Iframe',
      description: 'Ajouter un iframe',
      searchTerms: ['iframe', 'embed'],
      icon: Code,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).setIframe(editor).run()
      }
    },*/
    {
      label: 'Image',
      description: 'Ajouter une image',
      searchTerms: ['img', 'image', 'photo', 'picture'],
      icon: 'i-lucide-image',
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
      },
      shortcuts: []
    },
    {
      label: 'Vidéo',
      description: 'Ajouter une vidéo',
      searchTerms: ['video', 'movie', 'film'],
      icon: 'i-lucide-film',
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).insertVideoPlaceholder().run()
      },
      shortcuts: []
    },
    {
      label: 'Séparateur',
      description: 'Ajouter un séparateur horizontal',
      searchTerms: ['hr', 'rule', 'line'],
      icon: 'i-lucide-minus',
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).setHorizontalRule().run()
      },
      shortcuts: []
    },
    {
      label: 'Tableau',
      description: 'Ajouter un tableau',
      searchTerms: ['table'],
      icon: 'i-lucide-table',
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).insertTable().run()
      },
      shortcuts: []
    },
    {
      label: 'Layout',
      description: 'Ajouter un layout',
      searchTerms: ['layout', 'grid', 'flex'],
      icon: 'i-lucide-columns-2',
      command: ({ editor, range }: CommandProps) => {
        console.log(editor)
        editor.chain().focus().setColumns(2).run()
      },
      shortcuts: []
    },
    {
      label: 'Twitter',
      description: 'Ajouter un tweet',
      searchTerms: ['tweet', 'twitter'],
      icon: 'i-lucide-twitter',
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).insertTweetPlaceholder().run()
      },
      shortcuts: []
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
        placement: 'bottom-start'
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
