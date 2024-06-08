import { Editor } from '@tiptap/vue-3'

/**
 * Custom composable to manage speech synthesis.
 * @returns {
 * `isActivated`: ref<boolean> indicating if speech synthesis is activated,
 * `toggle`: a function to toggle the `isActivated` value,
 * }
 */
export const useSpeechSynthesis = (editor: Editor | null) => {
  const isActivated = ref<boolean>(false);

  const toggle = () => {
    if (isActivated.value) {
      editor?.commands.stopSpeechSynthesis();
      isActivated.value = false;
    } else {
      const speech = editor?.commands.startSpeechSynthesis() || false;
      isActivated.value = speech;
    }
  };

  watch(isActivated, (newVal) => {
    if (newVal && !editor) {
      isActivated.value = false;
    }
  });

  return { isActivated, toggle };
};
