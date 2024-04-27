import { InputRule } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import { CharacterCount } from '@tiptap/extension-character-count'
import { Color } from '@tiptap/extension-color'
import { FocusClasses } from '@tiptap/extension-focus'
import { FontFamily } from '@tiptap/extension-font-family'
import { Highlight } from '@tiptap/extension-highlight'
import { Placeholder } from '@tiptap/extension-placeholder'
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
// import { Image } from '@tiptap/extension-image'
import { Markdown } from 'tiptap-markdown'

import { SlashMenu } from './extension-slash-menu'
import { uniqueId } from './extension-unique-id'
import { SpeechRecognition } from './extension-speech-recognition'
import { ColumnExtension } from './extension-multi-columns'
import DragAndDrop from './extension-drag-and-drop'
import Image from './extension-image'
import ImageComponent from './extension-image/ImageComponent.vue'
import ImagePlaceholder from './extension-image/ImagePlaceholder'
import ImagePlaceholderComponent from './extension-image/ImagePlaceholderComponent.vue'
import Video from './extension-video'
import VideoComponent from './extension-video/VideoComponent.vue'
import VideoPlaceholder from './extension-video/VideoPlaceholder'
import VideoPlaceholderComponent from './extension-video/VideoPlaceholderComponent.vue'
// import Iframe from './extension-iframe'
// import Table from './extension-table'
// import TableCell from './extension-table-cell'
// import TableHeader from './extension-table-header'
// import TableRow from './extension-table-row'

export default [
  SlashMenu,
  DragAndDrop,
  SpeechRecognition,
  Youtube,
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
      class: 'mt-4 mb-6 border-t border-stone-300'
    }
  }),
  Link.configure({
    autolink: true,
    linkOnPaste: true,
    HTMLAttributes: {
      class: 'text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer'
    },
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
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === 'heading') {
        return `Heading ${node.attrs.level}`
      }

      return 'Appuyez sur \'/\' pour les commandes ou \'++\' pour l\'autocomplétion de l\'IA...'
    },
    includeChildren: true
  }),
  Subscript,
  Superscript,
  Table.configure({
    HTMLAttributes: {
      class: 'not-prose text-center table-auto ring-1 ring-gray-300 rounded-lg'
    }
  }),
  TableCell.configure({
    HTMLAttributes: {
      class: 'border-b dark:border-slate-200 p-2'
    }
  }),
  TableHeader.configure({
    HTMLAttributes: {
      class: 'border-b dark:border-slate-200 font-medium p-2'
    }
  }),
  TableRow.configure({
    HTMLAttributes: {
      class: 'border-b dark:border-slate-200'
    }
  }),
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
  Typography,
  Underline,
  uniqueId.configure({
    types: ['heading', 'paragraph', 'blockquote', 'codeBlock', 'bulletList', 'orderedList', 'listItem', 'taskList', 'taskItem', 'horizontalRule', 'image', 'link', 'underline', 'textStyle', 'color', 'highlight', 'code']
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
