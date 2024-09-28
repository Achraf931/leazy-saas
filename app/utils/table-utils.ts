export function tableRowTools() {
  return [
    {
      title: "Ajout d'une ligne avant",
      name: "addRowBefore",
      icon: 'i-lucide-between-vertical-start',
      command: (editor) => {
        editor.commands.addRowBefore();
      },
    },
    {
      title: "Ajout d'une ligne après",
      name: "addRowAfter",
      icon: 'i-lucide-between-vertical-end',
      command: (editor) => {
        editor.commands.addRowAfter();
      },
    },
    {
      title: "Fusionner/diviser les cellules",
      name: "mergeCells",
      icon: 'i-lucide-table-cells-merge',
      command: (editor) => {
        editor.commands.mergeOrSplit();
      }
    },
    {
      title: "Supprimer la ligne",
      name: "deleteRow",
      icon: 'i-heroicons-trash',
      command: (editor) => {
        editor.commands.deleteRow();
      },
    }
  ];
}
export function tableColumnTools() {
  return [
    {
      title: "Ajouter une colonne avant",
      name: "addColumnBefore",
      icon: 'i-lucide-between-horizontal-start',
      command: (editor) => {
        editor.commands.addColumnBefore();
      },
    },
    {
      title: "Ajouter une colonne après",
      icon: 'i-lucide-between-horizontal-end',
      name: "addColumnAfter",
      command: (editor) => {
        editor.commands.addColumnAfter();
      },
    },
    {
      title: "Fusionner/diviser les cellules",
      name: "mergeCells",
      icon: 'i-lucide-table-cells-merge',
      command: (editor) => {
        editor.commands.mergeOrSplit();
      }
    },
    {
      title: "Supprimer la colonne",
      name: "deleteColumn",
      icon: 'i-heroicons-trash',
      command: (editor) => {
        editor.commands.deleteColumn();
      }
    }
  ];
}
