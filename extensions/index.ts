import { InputRule } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import { CharacterCount } from '@tiptap/extension-character-count'
import { Color } from '@tiptap/extension-color'
import { FocusClasses } from '@tiptap/extension-focus'
import { FontFamily } from '@tiptap/extension-font-family'
import { Highlight } from '@tiptap/extension-highlight'
// import { Placeholder } from '@tiptap/extension-placeholder'
import { Subscript } from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { TaskItem } from '@tiptap/extension-task-item'
import { TaskList } from '@tiptap/extension-task-list'
import { TextStyle } from '@tiptap/extension-text-style'
import { Typography } from '@tiptap/extension-typography'
import { Underline } from '@tiptap/extension-underline'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import { Table } from '@tiptap/extension-table'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableRow } from '@tiptap/extension-table-row'
import { Link } from '@tiptap/extension-link'
import { TextAlign } from '@tiptap/extension-text-align'
import Youtube from '@tiptap/extension-youtube'
// import { getHierarchicalIndexes, TableOfContents } from '@tiptap-pro/extension-table-of-contents'
import Emoji, { gitHubEmojis } from '@tiptap-pro/extension-emoji'
// import { Image } from '@tiptap/extension-image'
import { Markdown } from 'tiptap-markdown'

import EmojiSuggestion from '@/extensions/extension-emoji'
import { SlashMenu } from './extension-slash-menu'
import { uniqueId } from './extension-unique-id'
import { SpeechRecognition } from './extension-speech-recognition'
import { ColumnExtension } from './extension-multi-columns'
import DragAndDrop from './extension-drag-and-drop'
import { Indent } from '@/extensions/extension-indent'
import { ColorHighlighter } from '@/extensions/extension-color-preview'
// import Link from './extension-link'
// import Link from './extension-card-link'
// import Link from './extension-custom-link'
// import { Hyperlink, previewHyperlinkModal, setHyperlinkModal } from '@/extensions/extension-hyperlink'
import Print from './extension-print'
import Image from './extension-image'
import ImageComponent from './extension-image/ImageComponent.vue'
import ImagePlaceholder from './extension-image/ImagePlaceholder'
import ImagePlaceholderComponent from './extension-image/ImagePlaceholderComponent.vue'
import Video from './extension-video'
import VideoComponent from './extension-video/VideoComponent.vue'
import VideoPlaceholder from './extension-video/VideoPlaceholder'
import VideoPlaceholderComponent from './extension-video/VideoPlaceholderComponent.vue'
import LinkEmbed from '@/extensions/extension-link-embed'
//import TableOfContents from './extension-table-of-contents/TableOfContents.ts'
// import Iframe from './extension-iframe'
// import Table from './extension-table'
// import TableCell from './extension-table-cell'
// import TableHeader from './extension-table-header'
// import TableRow from './extension-table-row'

import MathExtension from '@/extensions/extension-math'
import { CalloutBox } from '@/extensions/extension-callout-box'
import { FontSize } from '@/extensions/extension-font-size'

export default [
  SlashMenu,
  DragAndDrop,
  SpeechRecognition,
  Youtube,
  LinkEmbed,
  Print,
  Indent,
  Typography,
  ColorHighlighter,
  FontSize,
  // TableOfContents,
  MathExtension.configure({
    evaluation: true,
    katexOptions: {
      macros: {
        "\\B": "\\mathbb{B}"
      }
    }
  }),
  CalloutBox,
  Emoji.configure({
    emojis: gitHubEmojis,
    enableEmoticons: true,
    suggestion: EmojiSuggestion
  }),
  // TableOfContents,
  ...ColumnExtension,
  TextAlign.configure({
    types: ['heading', 'paragraph', 'blockquote'],
    defaultAlignment: 'left'
  }),
  HorizontalRule.extend({
    addInputRules() {
      return [
        new InputRule({
          find: /^(?:---|—-|___\s|\*\*\*\s)$/,
          handler: ({ state, range }) => {
            const attributes = {}
            const { tr } = state
            const start = range.from
            let end = range.to

            tr.insert(start - 1, this.type.create(attributes)).delete(
              tr.mapping.map(start),
              tr.mapping.map(end)
            )
          }
        })
      ]
    }
  }).configure({
    HTMLAttributes: {
      class: 'my-10 border-t border-stone-300'
    }
  }),
  /*Hyperlink.configure({
    hyperlinkOnPaste: true,
    openOnClick: true,
    modals: {
      previewHyperlink: previewHyperlinkModal,
      setHyperlink: setHyperlinkModal
    }
  }),*/
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: 'text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer'
    }
  }).extend({
    inclusive: false
  }),
  Image.configure({
    Component: ImageComponent
  }),
  Video.configure({
    Component: VideoComponent
  }),
  ImagePlaceholder.configure({
    Component: ImagePlaceholderComponent
  }),
  VideoPlaceholder.configure({
    Component: VideoPlaceholderComponent
  }),
  CharacterCount,
  Color,
  FocusClasses,
  FontFamily,
  Highlight.configure({
    multicolor: true
  }),
  /*Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === 'heading') return 'Titre de la leçon'

      return '\'/\' pour les commandes ou \'+++\' pour l\'autocomplétion de l\'IA...'
    },
    includeChildren: true
  }),*/
  Subscript,
  Superscript,
  Table.configure({
    resizable: true
  }),
  TableRow,
  TableHeader,
  TableCell,
  TaskList.configure({
    HTMLAttributes: {
      class: 'not-prose flex flex-col gap-1.5 my-3'
    }
  }),
  TaskItem.configure({
    HTMLAttributes: {
      class: 'flex items-start justify-start gap-2'
    },
    nested: true
  }),
  Markdown.configure({
    html: false,
    transformCopiedText: true
  }),
  TextStyle,
  Underline,
  uniqueId.configure({
    types: ['heading', 'paragraph', 'blockquote', 'codeBlock', 'columnBlock', 'column', 'bulletList', 'orderedList', 'listItem', 'taskList', 'taskItem', 'calloutBox', 'horizontalRule', 'image', 'link', 'mark', 'underline', 'textStyle', 'color', 'highlight', 'code']
  }),
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: 'list-disc list-outside leading-3 gap-1.5 pl-5 my-3'
      }
    },
    orderedList: {
      HTMLAttributes: {
        class: 'list-decimal list-outside leading-3 gap-1.5 pl-5 my-3'
      }
    },
    listItem: {
      HTMLAttributes: {
        class: 'leading-normal m-0'
      }
    },
    blockquote: {
      HTMLAttributes: {
        class: 'border-l-4 border-stone-700 my-3 relative pl-4'
      }
    },
    codeBlock: {
      HTMLAttributes: {
        class: 'inline-flex text-left items-center text-[13.5px] bg-gray-800 text-white rounded-lg w-full p-3 my-3',
      }
    },
    code: {
      HTMLAttributes: {
        class: 'inline-flex items-center font-medium text-xs px-1.5 py-0.5 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 rounded',
        spellcheck: 'false'
      }
    },
    horizontalRule: false,
    dropcursor: {
      color: 'rgb(224 231 255)',
      width: 4,
      class: 'drop-cursor'
    }
  })
]
