import { Node, VueNodeViewRenderer, isNodeSelection, mergeAttributes } from "@tiptap/vue-3";
import InlineCard from "./InlineCard.vue";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    inlineCard: {
      /**
       * Set inline card
       */
      setInlineCard: (attributes) => ReturnType;

      /**
       * Converts Link Card into Link Node
       */
      convertToLink: () => ReturnType;

      /**
       * Unlinks inline card
       */
      unlinkInlineCard: (text?: string) => ReturnType;
    };
  }
}

export default Node.create({
  name: "inlineCard",
  marks: "",
  group: "inline",
  content: "inline*",
  inline: true,
  selectable: true,
  atom: true,

  addAttributes() {
    return {
      url: {
        default: null,
        parseHTML: element => element.getAttribute("href"),
        renderHTML: attrs => ({ href: (attrs).url || "" }),
      },
      text: {
        default: null,
        rendered: false,
        parseHTML: element => {
          const text = element.textContent;
          const href = element.getAttribute("href");
          if (text === href) {
            return null;
          }
          return text;
        },
      },
    };
  },

  parseHTML() {
    return [{
      tag: `vue-component[data-type="${this.name}"]`,
      // set priority higher than default 'link' mark
      priority: 51,
    }];
  },

  renderHTML({ node, HTMLAttributes }) {
    const attrs = node.attrs;
    return [
      "vue-component",
      mergeAttributes({
        "data-type": this.name,
        href: attrs.url,
      }, HTMLAttributes),
      attrs.text || attrs.url,
    ];
  },

  addNodeView() {
    return VueNodeViewRenderer(InlineCard);
  },

  renderText({ node }) {
    const attrs = node.attrs;
    return attrs.text || attrs.url;
  },

  addCommands() {
    return {
      toggleLink: () => ({ chain, state }) => {
        const { selection } = state;

        if (!isNodeSelection(selection) || selection.node.type !== this.type) {
          return false;
        }

        const linkNode = selection.node;
        const attrs = linkNode.attrs;
        if (!attrs) return false;

        return chain()
          .deleteSelection()
          .setLinkNode({
            url: attrs.url,
            text: attrs.text,
          })
          .run();
      },

      setLink: attributes => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: attributes,
        });
      },

      unsetLink: text => ({ chain, state }) => {
        const { selection } = state;

        if (!isNodeSelection(selection) || selection.node.type !== this.type) {
          return false;
        }

        const node = selection.node;
        const attrs = node.attrs;
        if (!attrs) return false;

        const textToSet = text || attrs.url;
        const textNode = state.schema.text(textToSet);

        return chain()
          .command(({ tr }) => {
            tr.replaceSelectionWith(textNode);
            return true;
          })
          .setMeta("preventAutolink", true)
          .run();
      },
    };
  },
});
