import { Node } from "@tiptap/core";
import tippy from "tippy.js";

export interface SpeechRecognitionOptions {
  lang: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    SpeechRecognition: {
      startSpeechRecognition: () => ReturnType;
      stopSpeechRecognition: () => ReturnType;
      toggleSpeechRecognition: () => ReturnType;
    };
  }
}

class SR_Node<O = any, S = any> extends Node<O, S> {
  recognition: typeof SpeechRecognition | null = null;
  isListening: boolean = false;

  static create<O = any, S = any>(config?: any) {
    return Node.create(config) as SR_Node<O, S>;
  }
}

export const SpeechRecognition = SR_Node.create<SpeechRecognitionOptions>({
  name: "SpeechRecognition",

  addOptions() {
    return {
      lang: "fr-FR",
    };
  },

  addKeyboardShortcuts() {
    return {
      "Mod-Shift-l": () => this.editor.commands.toggleSpeechRecognition()
    }
  },

  addCommands() {
    let totalTranscript = "";
    let tippyInstance: any = null;
    let initialRect: any = null;

    const createTippy = (editor) => {
      const { $from, $to } = editor.state.selection;
      const startPos = editor.view.coordsAtPos($from.pos);
      const endPos = editor.view.coordsAtPos($to.pos);

      if (!startPos || !endPos) return;

      // Stocker la position initiale
      if (!initialRect) {
        const rectWidth = Math.abs(startPos.left - endPos.right);
        const rectHeight = Math.abs(startPos.top - endPos.bottom);

        initialRect = {
          top: window.innerHeight - rectHeight, // 20px padding from the bottom
          left: (window.innerWidth - rectWidth) / 2, // Center horizontally
          width: rectWidth,
          height: rectHeight,
        };
      }

      const rect = initialRect;

      tippyInstance = tippy("body", {
        getReferenceClientRect: () => rect,
        content: `
          <div class="flex items-center justify-center gap-2.5 bg-white border rounded shadow-xl border-stone-200 p-2 text-stone-600">
            <p class="font-bold">Transcription vocale en cours...</p>
            <button id="transcriptPopup">
              <svg class="text-red-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><rect width="6" height="6" x="9" y="9"/></svg>
            </button>
          </div>`,
        arrow: false,
        allowHTML: true,
        hideOnClick: false,
        interactive: true,
        interactiveDebounce: 75,
        inertia: false,
        maxWidth: 300,
        offset: [0, 10],
        trigger: "manual",
        appendTo: () => document.body,
      })[0];

      tippyInstance.show();

      document
        .getElementById("transcriptPopup")
        ?.addEventListener("click", (e: any) => {
          e.preventDefault();
          editor.commands.stopSpeechRecognition();
        });
    };

    return {
      startSpeechRecognition:
        () =>
          ({ editor, commands }) => {
            if (!this.isListening) {
              createTippy(editor);
              const SpeechRecognition =
                window.SpeechRecognition || window.webkitSpeechRecognition;
              this.recognition = new SpeechRecognition();

              this.recognition.lang = this.options.lang;
              this.recognition.interimResults = true;
              this.recognition.maxAlternatives = 1;
              this.recognition.continuous = true;

              this.recognition.start();

              this.recognition.onresult = (event) => {
                let transcript = "";

                // Concaténer les résultats de la reconnaissance vocale
                for (let i = event.resultIndex; i < event.results.length; i++) {
                  transcript += event.results[i][0].transcript;
                }

                // Calculer la partie du texte nouvellement reconnue
                const newTranscript = transcript.slice(totalTranscript.length);

                // Ajouter la partie nouvellement reconnue au texte existant dans l'éditeur
                const { from } = editor.state.selection;
                const tr = editor.state.tr.insertText(newTranscript, from);

                // Envoyer la transaction pour mettre à jour l'état de l'éditeur
                editor.view.dispatch(tr);

                // Mettre à jour le texte total transcrit pour la prochaine itération
                totalTranscript = transcript;
              };

              this.isListening = true;
            }

            return commands;
          },

      stopSpeechRecognition:
        () =>
          ({ commands }) => {
            if (this.isListening) {
              if (tippyInstance) tippyInstance.destroy();
              this.recognition.stop();
              this.editor.commands.focus();
              this.recognition.lastResult = "";
              this.isListening = false;
            }
            return commands;
          },

      toggleSpeechRecognition:
        () =>
          ({ commands }) => {
            this.isListening
              ? commands.stopSpeechRecognition()
              : commands.startSpeechRecognition();
          },
    };
  },
});
