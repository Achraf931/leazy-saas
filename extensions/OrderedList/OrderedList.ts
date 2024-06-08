import { OrderedList as TiptapOrderedList, type OrderedListOptions as TiptapOrderedListOptions } from '@tiptap/extension-ordered-list'
import ActionButton from '@/components/ActionButton.vue'
import type { GeneralOptions } from '@/type'

export interface OrderedListOptions extends TiptapOrderedListOptions, GeneralOptions<OrderedListOptions> {}

export const OrderedList = TiptapOrderedList.extend<OrderedListOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.toggleOrderedList(),
          isActive: () => editor.isActive('orderedList') || false,
          disabled: !editor.can().toggleOrderedList(),
          icon: 'i-lucide-list-ordered',
          shortcuts: ['mod', 'shift', '7'],
          tooltip: t('editor.orderedlist.tooltip'),
        },
      }),
    }
  },
})
