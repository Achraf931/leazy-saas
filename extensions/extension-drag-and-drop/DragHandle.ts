import { NodeSelection, Plugin } from '@tiptap/pm/state'
import { __serializeForClipboard, EditorView } from '@tiptap/pm/view'

export interface DragHandleOptions {
  /**
   * The width of the drag handle
   */
  dragHandleWidth: number
}

function absoluteRect(node: Element) {
  const data = node.getBoundingClientRect()

  return {
    top: data.top,
    left: data.left,
    width: data.width
  }
}

function nodeDOMAtCoords(coords: { x: number; y: number }) {
  return document
    .elementsFromPoint(coords.x, coords.y)
    .find(
      (elem: HTMLElement) =>
        elem.parentElement?.matches?.(".ProseMirror") ||
        elem.matches(
          [
            "p:not(:first-child)",
            "pre",
            "blockquote",
            "h1, h2, h3",
            "[data-node-name=calloutBox]",
            "[data-type=horizontalRule]",
            "table",
            ".node-subdocument",
            ".node-equationBlock"
          ].join(", ")
        )
    )
}

export function nodePosAtDOM(node: Element, view: EditorView) {
  const boundingRect = node.getBoundingClientRect()

  return view.posAtCoords({
    left: boundingRect.left + 1,
    top: boundingRect.top + 1
  })?.inside
}

export default function DragHandle(options: DragHandleOptions) {
  function handleDragStart(event: DragEvent, view: EditorView) {
    view.focus()

    if (!event.dataTransfer) return

    const node = nodeDOMAtCoords({
      x: event.clientX + 50 + options.dragHandleWidth * .84,
      y: event.clientY
    })

    if (!(node instanceof Element)) return

    const nodePos = nodePosAtDOM(node, view)
    if (!nodePos) return

    view.dispatch(
      view.state.tr.setSelection(
        NodeSelection.create(view.state.doc, nodePos)
      )
    )

    const slice = view.state.selection.content()
    const { dom, text } = __serializeForClipboard(view, slice)

    event.dataTransfer.clearData()
    event.dataTransfer.setData("text/html", dom.innerHTML)
    event.dataTransfer.setData("text/plain", text)
    event.dataTransfer.effectAllowed = "copyMove"

    event.dataTransfer.setDragImage(node, 0, 0)

    view.dragging = { slice, move: event.ctrlKey }
  }

  function handleClick(event: MouseEvent, view: EditorView) {
    view.focus()

    view.dom.classList.remove("dragging")

    const node = nodeDOMAtCoords({
      x: event.clientX + 50 + options.dragHandleWidth * .84,
      y: event.clientY
    })

    if (!(node instanceof Element)) return

    const nodePos = nodePosAtDOM(node, view)
    if (!nodePos) return

    view.dispatch(
      view.state.tr.setSelection(
        NodeSelection.create(view.state.doc, nodePos)
      )
    )
  }

  let containerElement: HTMLElement | null = null
  let dragHandleElement: HTMLElement | null = null
  let plusButtonElement: HTMLElement | null = null

  function hideDragHandle() {
    if (dragHandleElement) {
      containerElement.classList.add("hidden")
    }
  }

  function showDragHandle() {
    if (dragHandleElement) {
      containerElement.classList.remove("hidden")
    }
  }

  function addNodeView(event: MouseEvent, view: EditorView) {
    view.focus()

    view.dom.classList.remove("dragging")

    const node = nodeDOMAtCoords({
      x: event.clientX + 50 + options.dragHandleWidth * .84,
      y: event.clientY
    })

    if (!(node instanceof Element)) return

    const nodePos = nodePosAtDOM(node, view)
    if (!nodePos) return

    view.dispatch(
      view.state.tr.setSelection(
        NodeSelection.create(view.state.doc, nodePos)
      )
    )
    view.dom.editor.commands.createParagraphNear()
    view.dom.editor.commands.insertContent('/')
  }

  return new Plugin({
    view: (view) => {
      containerElement = document.createElement("div")
      containerElement.classList.add("drag-handle-container")

      dragHandleElement = document.createElement("div")
      dragHandleElement.draggable = true
      dragHandleElement.dataset.dragHandle = ""
      dragHandleElement.classList.add("drag-handle")
      dragHandleElement.addEventListener("dragstart", (e) => {
        handleDragStart(e, view)
      })
      dragHandleElement.addEventListener("click", (e) => {
        handleClick(e, view)
      })

      plusButtonElement = document.createElement("div")
      plusButtonElement.classList.add("plus-button")
      plusButtonElement.addEventListener("click", (e) => {
        addNodeView(e, view)
      })

      containerElement.appendChild(plusButtonElement)
      containerElement.appendChild(dragHandleElement)

      containerElement.addEventListener('drag', (e) => {
        hideDragHandle()
        let scrollY = window.scrollY
        if (e.clientY < options.dragHandleWidth * .84) {
          window.scrollTo({ top: scrollY - 30, behavior: 'smooth' })
        } else if (window.innerHeight - e.clientY < options.dragHandleWidth * .84) {
          window.scrollTo({ top: scrollY + 30, behavior: 'smooth' })
        }
      })

      hideDragHandle()

      view?.dom?.parentElement?.appendChild(containerElement)

      return {
        destroy: () => {
          containerElement?.remove?.()
          containerElement = null
        }
      }
    },
    props: {
      handleDOMEvents: {
        mousemove: (view, event) => {
          if (!view.editable) {
            return
          }

          const node = nodeDOMAtCoords({
            x: event.clientX + 50 + options.dragHandleWidth * .84,
            y: event.clientY
          })

          if (!(node instanceof Element)) {
            hideDragHandle()
            return
          }

          const compStyle = window.getComputedStyle(node)
          const lineHeight = parseInt(compStyle.lineHeight, 10)
          const paddingTop = parseInt(compStyle.paddingTop, 10)

          const rect = absoluteRect(node)

          rect.top += (lineHeight - 24) / 2
          rect.top += paddingTop
          // Li markers
          if (
            node.matches("ul:not([data-type=taskList]) li, ol li")
          ) {
            rect.left -= options.dragHandleWidth * .84
          }
          rect.width = options.dragHandleWidth * .84

          if (!dragHandleElement) return

          containerElement.style.left = `${rect.left - (rect.width * 2)}px`
          containerElement.style.top = `${rect.top}px`
          showDragHandle()
        },
        keydown: () => {
          hideDragHandle()
        },
        mousewheel: () => {
          hideDragHandle()
        },
        // dragging class is used for CSS
        dragstart: (view) => {
          view.dom.classList.add("dragging")
        },
        drop: (view) => {
          view.dom.classList.remove("dragging")
        },
        dragend: (view) => {
          view.dom.classList.remove("dragging")
        }
      }
    }
  })
}
