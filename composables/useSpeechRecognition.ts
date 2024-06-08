import { Editor } from '@tiptap/vue-3'

/**
 * Custom composable to manage speech recognition.
 * @returns {
 * `isAvailable`: boolean indicating if speech recognition is available,
 * `isActive`: ref<boolean> indicating if speech recognition is active,
 * `toggle`: a function to toggle the `isActive` value,
 * }
 */
export const useSpeechRecognition = (editor: Editor | null) => {
  const isActive = ref(false);

  const toggle = () => {
    if (isActive.value) {
      editor?.commands.stopSpeechRecognition();
      isActive.value = false;
    } else {
      const started = editor?.commands.startSpeechRecognition() || false;
      isActive.value = started;
    }
  };

  const isAvailable =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      ? true
      : false;

  return { isAvailable, isActive, toggle };
};
