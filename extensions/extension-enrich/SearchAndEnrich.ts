import { Extension } from "@tiptap/core";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
import { Plugin, PluginKey } from "@tiptap/pm/state";

// Fonction pour obtenir des entités depuis votre API d'enrichissement.
const getEntities = async (text) => {
  const response = await fetch('/api/enrich', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt: text })
  });

  const result = await response.json();
  return result || []; // Assurez-vous qu'il renvoie un tableau d'entités
};

// Fonction pour obtenir des données de Wikipedia pour un terme donné.
const getWikipediaData = async (term) => {
  const response = await fetch(
    `https://fr.wikipedia.org/w/api.php?action=query&titles=${term}&prop=extracts%7Cinfo&format=json&origin=*`
  );
  const result = await response.json();

  const pages = Object.values(result.query.pages);
  const page = pages[0]; // Premier résultat (cela pourrait nécessiter des ajustements si plusieurs pages sont retournées)

  // Assurez-vous que la clé existe avant d'accéder aux propriétés.
  if (!page) {
    return {};
  }

  return {
    canonicalurl: page.canonicalurl || "",
    title: page.title || "",
    extract: page.extract || "",
  };
};

// Fonction pour créer des décorations avec des attributs de données de Wikipedia.
const createDecorations = (doc, terms, wikiDataMap, searchResultClass) => {
  const decorations = [];

  for (const term of terms) {
    const regex = new RegExp(`\\b${term}\\b`, 'g'); // Utilisation de \b pour éviter les correspondances partielles

    doc.descendants((node, pos) => {
      if (node.isText) {
        let match;
        while ((match = regex.exec(node.text)) !== null) {
          const from = pos + match.index;
          const to = from + match[0].length;

          const wikiData = wikiDataMap[term] || {};

          // Créer une décoration avec la classe et les attributs de données.
          const decoration = Decoration.inline(from, to, {
            class: searchResultClass, // Classe CSS
            'data-wiki-title': wikiData.title || "",
            'data-wiki-url': wikiData.canonicalurl || "",
            'data-wiki-extract': wikiData.extract || "",
          });
          console.log(decoration)

          decorations.push(decoration);
        }
      }
    });
  }

  return DecorationSet.create(doc, decorations); // Retournez le set de décorations
};

const SearchAndEnrichPluginKey = new PluginKey("SearchAndEnrich");

export const SearchAndEnrich = Extension.create({
  name: "searchAndEnrich",
  addOptions() {
    return {
      searchResultClass: "enrich-search-result", // Classe CSS pour les résultats
    };
  },
  addCommands() {
    return {
      setEnrich:
        () =>
          async ({ editor }) => {
            const text = editor.getText(); // Obtenez le texte de l'éditeur
            const entities = await getEntities(text); // Obtenez le tableau des entités
            const wikiDataMap = {};

            // Obtenez les données de Wikipedia pour chaque entité
            for (const term of entities) {
              const data = await getWikipediaData(term);
              wikiDataMap[term] = data; // Stockez les données pour chaque entité
            }

            const decorations = createDecorations(editor.state.doc, entities, wikiDataMap, this.options.searchResultClass);

            console.log('Décorations générées :', decorations)
            // Appliquez les décorations au document
            editor.state.tr.setMeta(SearchAndEnrichPluginKey, { decorations });
            editor.view.dispatch(editor.state.tr); // Appliquez les changements

            return true;
          },
    };
  },
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: SearchAndEnrichPluginKey,
        state: {
          init: () => DecorationSet.empty,
          apply: (tr, decorationSet) => {
            const decorations = tr.getMeta(SearchAndEnrichPluginKey)?.decorations || decorationSet;
            console.log('Décorations après application du plugin:', decorations);
            return decorations;
          },
        },
        props: {
          decorations(state) {
            return this.getState(state);
          },
        },
      }),
    ];
  },
});

export default SearchAndEnrich;
