<script setup lang="ts">
import { getSelectionRanges, NodeRangeSelection } from '@tiptap-pro/extension-node-range';
import { Editor } from '@tiptap/vue-3';
import tippy, { type Instance } from 'tippy.js';

const props = defineProps<{
  editor: Editor;
  isLocked?: boolean;
  onSelection?: (nodeRangeSelection: NodeRangeSelection | null) => void;
}>();

const dragHandleRef = ref<HTMLElement | null>(null);
const childrenRef = ref<HTMLElement | null>(null);
let tippyInstance: Instance | null = null;

const onDragStart = (event: DragEvent) => {
  if (!dragHandleRef.value || !event.dataTransfer) {
    return;
  }

  const nodeRangeSelection = getNodeRangeSelection(event.clientX, event.clientY);

  if (!nodeRangeSelection) {
    return;
  }

  props.editor.commands.setNodeSelection(nodeRangeSelection.from);

  const slice = nodeRangeSelection.content();
  const tr = props.editor.state.tr;

  event.dataTransfer.clearData();
  event.dataTransfer.effectAllowed = 'move';
  props.editor.view.dragging = {
    slice,
    move: event.ctrlKey,
  };
  tr.setSelection(nodeRangeSelection);
  props.editor.view.dispatch(tr);
};

const onDragClick = (event: MouseEvent) => {
  const nodeRangeSelection = getNodeRangeSelection(event.clientX, event.clientY);

  if (!nodeRangeSelection) {
    return;
  }

  props.editor.commands.setNodeSelection(nodeRangeSelection.from);
};

const onMouseMove = (event: MouseEvent) => {
  if (props.isLocked || !dragHandleRef.value) {
    return;
  }

  const targetInfo = getTargetInfo({
    x: event.clientX,
    y: event.clientY,
  });

  if (!targetInfo.resultElement) {
    return;
  }

  const targetElement = findTopMostNode(props.editor.view, targetInfo.resultElement);

  if (targetElement === props.editor.view.dom || !targetElement || targetElement.nodeType !== 1) {
    return;
  }

  setTargetElement(targetElement);
  const nodeRangeSelection = getNodeRangeSelection(event.clientX, event.clientY);
  props.onSelection?.(nodeRangeSelection);
};

onMounted(() => {
  addEventListener('mousemove', onMouseMove);
});

onUnmounted(() => {
  removeEventListener('mousemove', onMouseMove);
});

const getNodeRangeSelection = (clientX: number, clientY: number) => {
  const { doc } = props.editor.state;

  const targetInfo = getTargetInfo({
    x: clientX,
    y: clientY,
  });

  if (!targetInfo.resultNode || null === targetInfo.pos) {
    return null;
  }

  const adjustedCoords = calculateAdjustedCoords(props.editor.view, clientX, clientY);

  const coordPos = props.editor.view.posAtCoords(adjustedCoords);

  if (!coordPos) {
    return null;
  }
  const { pos } = coordPos;

  if (!doc.resolve(pos).parent) {
    return null;
  }

  const fromPos = doc.resolve(targetInfo.pos);
  const toPos = doc.resolve(targetInfo.pos + 1);

  return getSelectionRanges(fromPos, toPos, 0)[0];
};

const getTargetInfo = (options: {
  x: number;
  y: number;
}): {
  resultElement: Element | null;
  resultNode: Node | null;
  pos: number | null;
} => {
  const { y, editor } = options;
  let resultElement = null;
  let resultNode = null;
  let resultPosition = null;
  const relevantElements = editor.view.dom.children;

  for (const element of relevantElements) {
    if (element.getBoundingClientRect().top < y && element.getBoundingClientRect().bottom > y) {
      resultElement = element;
      resultPosition = editor.view.posAtDOM(element, 0);

      if (resultPosition >= 0) {
        resultNode = editor.view.state.doc.nodeAt(Math.max(resultPosition - 1, 0));
        if (resultNode?.isText) {
          resultNode = editor.view.state.doc.nodeAt(Math.max(resultPosition - 1, 0));
        }
        if (!resultNode) {
          resultNode = editor.view.state.doc.nodeAt(Math.max(resultPosition, 0));
        }
        break;
      }
    }
  }

  return {
    resultElement,
    resultNode,
    pos: null != resultPosition ? resultPosition : null,
  };
};

const findTopMostNode = (editor: Editor, targetNode: Element) => {
  let currentNode = targetNode;

  while (currentNode && currentNode.parentNode && currentNode.parentNode !== editor.dom) {
    currentNode = currentNode.parentNode as Element;
  }

  return currentNode;
};

const setTargetElement = (targetElement: Element | null) => {
  if (!tippyInstance || !targetElement) {
    return;
  }

  tippyInstance.setProps({
    getReferenceClientRect: () => targetElement.getBoundingClientRect(),
  });
  tippyInstance.show();
};

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

const calculateAdjustedCoords = (view: Editor, x: number, y: number) => {
  const paddingLeft = parseInt(getComputedStyle(view.dom, 'paddingLeft'), 10);
  const paddingRight = parseInt(getComputedStyle(view.dom, 'paddingRight'), 10);
  const borderLeftWidth = parseInt(getComputedStyle(view.dom, 'borderLeftWidth'), 10);
  const borderRightWidth = parseInt(getComputedStyle(view.dom, 'borderRightWidth'), 10);
  const domRect = view.dom.getBoundingClientRect();

  return {
    left: clamp(
        x,
        domRect.left + paddingLeft + borderLeftWidth,
        domRect.right - paddingRight - borderRightWidth,
    ),
    top: y,
  };
};

const calculateSelectedRanges = (
    clientX: number,
    clientY: number,
): SelectionRange[] => {
  const { doc } = props.editor.state;

  const targetInfo = getTargetInfo({
    x: clientX,
    y: clientY,
  });

  if (!targetInfo.resultNode || null === targetInfo.pos) {
    return [];
  }

  const adjustedCoords = calculateAdjustedCoords(
      props.editor.view,
      clientX,
      clientY,
  );

  const coordPos = props.editor.view.posAtCoords(adjustedCoords);

  if (!coordPos) {
    return [];
  }
  const { pos } = coordPos;

  if (!doc.resolve(pos).parent) {
    return [];
  }

  const fromPos = doc.resolve(targetInfo.pos);
  const toPos = doc.resolve(targetInfo.pos + 1);

  return getSelectionRanges(fromPos, toPos, 0);
};

const getComputedStyle = (
    element: HTMLElement,
    selector: keyof CSSStyleDeclaration,
): string => {
  return window.getComputedStyle(element)[selector] as string;
};
</script>

<template>
  <div ref="dragHandleRef" @dragstart="onDragStart" @click="onDragClick">
    <slot ref="childrenRef" />
  </div>
</template>
