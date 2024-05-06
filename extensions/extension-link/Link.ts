import Link from '@tiptap/extension-link'
import { getAttributes } from '@tiptap/core'
import { VueRenderer } from '@tiptap/vue-3'
import LinkComponent from './Link.vue'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import tippy from 'tippy.js'
import { find } from "linkifyjs";

async function fetchOpenGraphData(url) {
  console.log("Fetching Open Graph data for URL:", url);
  try {
    const response = await fetch('/api/opengraph', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des métadonnées');
    }

    const data = await response.json();
    console.log("Open Graph data fetched:", data);
    return data;
  } catch (error) {
    console.error("Erreur:", error);
    return null;
  }
}

export default Link.extend({
  inclusive: false,

  addAttributes() {
    return {
      ...this.parent?.(),
      'data-image': {
        default: null,
      },
      'data-description': {
        default: null,
      },
      'data-site_title': {
        default: null,
      },
      'data-site_description': {
        default: null,
      },
      'data-fetched': {
        default: false
      },
      'data-last-url': {
        default: null
      }
    }
  },

  addProseMirrorPlugins() {
    let component: VueRenderer | null = null
    let popup: any | null = null

    return [
      new Plugin({
        key: new PluginKey('hoverLink'),
        props: {
          handleDOMEvents: {
            mouseover: (view, event) => {
              const link = (event.target as HTMLElement)?.closest('a')

              if (link && link.hasAttribute('href')) {
                // const attrs = getAttributes(view.state, this.type.name)

                const attrs = {}

                for (let i = 0; i < link.attributes.length; i++) {
                  const attribute = link.attributes[i]
                  attrs[attribute.name] = attribute.value
                }

                component = new VueRenderer(LinkComponent, {
                  props: {
                    editor: this.editor,
                    attrs
                  },
                  editor: this.editor
                })

                popup = tippy('body', {
                  getReferenceClientRect: () => link.getBoundingClientRect(),
                  appendTo: () => document.body,
                  content: component.element,
                  interactive: true,
                  inertia: true,
                  trigger: 'manual',
                  placement: 'top-start',
                  onHidden: () => {
                    component?.destroy()
                  }
                })

                popup[0].show()
              }

              return false
            },
            mouseleave: () => {
              console.log('mouseleave')
              if (popup && popup[0]) {
                popup[0].destroy()
                popup = null
              }

              return false
            }
          }
        }
      }),

      new Plugin({
        key: new PluginKey('handlePasteLink'),
        props: {
          handlePaste: async (view, event, slice) => {
            const { state } = view
            const { selection } = state
            const { empty } = selection

            if (empty) return false

            let textContent = ''

            slice.content.forEach(node => {
              textContent += node.textContent
            })

            const link = find(textContent).find(item => item.isLink && item.value === textContent)

            if (!textContent || !link) return false

            const attrs = getAttributes(view.state, this.type.name)
            const currentUrl = link.href

            if (attrs['data-last-url'] && attrs['data-last-url'] === currentUrl) {
              if (attrs['data-fetched']) {
                return true
              }
            }

            const openGraphData = await fetchOpenGraphData(link.href)

            this.editor.commands.setMark(this.type, {
              href: link.href,
              'data-image': openGraphData?.image,
              'data-description': openGraphData?.description,
              'data-site-title': openGraphData?.siteTitle,
              'data-site-description': openGraphData?.siteDescription,
              'data-fetched': true,
              'data-last-url': currentUrl
            })

            return true
          }
        }
      }),

      new Plugin({
        key: new PluginKey('handleClickLink'),
        props: {
          handleClick: (view, pos, event) => {
            if (popup && popup[0]) {
              popup[0].destroy()
              popup = null

              return false
            }

            const attrs = getAttributes(view.state, this.type.name)
            const link = (event.target as HTMLElement)?.closest('a')

            if (link && attrs.href) {
              if (event.metaKey) {
                window.open(attrs.href, attrs.target)

                return false
              }

              component = new VueRenderer(LinkComponent, {
                props: {
                  editor: this.editor,
                  attrs
                },
                editor: this.editor
              })

              popup = tippy('body', {
                getReferenceClientRect: () => link.getBoundingClientRect(),
                appendTo: () => document.body,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                inertia: true,
                trigger: 'manual',
                placement: 'top-start'
              })

              return true
            }

            return false
          }
        }
      })
    ]
  }
})
