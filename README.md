# Leazy - Plateforme Éducative SaaS

**[Leazy](https://leazy.net)** est une plateforme éducative SaaS innovante permettant aux enseignants de créer des séquences pédagogiques interactives adaptées à leurs élèves. Elle simplifie la gestion des formations tout en offrant un environnement d’apprentissage engageant et collaboratif.

### 🎯 **Objectifs de Leazy**
- **Faciliter la création de séquences pédagogiques** : Permettre aux enseignants de structurer des formations sous forme de leçons et d'étapes pédagogiques.
- **Offrir une expérience collaborative** : Encourager l’interaction entre enseignants et étudiants grâce à des outils modernes.
- **Optimiser l’accessibilité** : Adapter les ressources à tous les niveaux d’élèves et à toutes les situations géographiques et financières.

### 💻 **Technologies Utilisées**

- **Frontend : Nuxt 4 & Nuxt UI**
  - Utilisation de **[Nuxt 4](https://nuxt.com/)**, la dernière version de Nuxt, pour une performance optimisée et une gestion simplifiée du frontend.
  - **[Nuxt UI](https://ui.nuxt.com/)** pour une interface moderne et réactive.
  - **[Nuxt UI Pro](https://ui.nuxt.com/pro/getting-started)** pour des composants premium et une personnalisation avancée de l'UI.
  - **[Tiptap](https://tiptap.dev/)** pour un éditeur de contenu interactif et flexible, intégré dans la plateforme.
  - Création d'un éditeur **[Leazyhub Editor](https://www.npmjs.com/package/@leazyhub/editor)** personnalisé, basé sur Tiptap, permettant aux enseignants de créer des leçons dynamiques avec une interface simple et intuitive.

- **Backend : Laravel 11**
  - **Laravel 11** pour gérer la logique backend, les utilisateurs et les données de manière sécurisée et efficace, en mode API-first.
  - Gestion de l'authentification avec le module **[Nuxt Auth Sanctum](https://manchenkoff.gitbook.io/nuxt-auth-sanctum)**, intégrant la sécurité avec Sanctum pour un accès fluide et sécurisé.
  - Notre application backend disponible ici : **[API](https://github.com/leazyhub/leazy-api)**.

- **Outils supplémentaires :**
  - **[VueUse](https://vueuse.org/)** : Utilisation de VueUse pour enrichir l'application avec des fonctionnalités réactives puissantes et une gestion optimisée des états.

### 🔧 **Fonctionnalités Principales**
- **Création de séquences pédagogiques** : Organisez des leçons et des étapes pédagogiques dans une séquence logique et cohérente.
- **Éditeur interactif Tiptap** : Intégrez des vidéos, quiz, images et autres types de contenu pour des leçons dynamiques.
- **Interface collaborative** : Les étudiants interagissent avec les leçons, suivent leur progression et participent à des discussions.

### 🚀 **Lancer le Projet**
Pour lancer le projet, suivez les étapes ci-dessous :

1. Clonez le repository :
   ```bash
   git clone git@github.com:leazyhub/leazy-saas.git
   ```
2. Installez les dépendances avec **Bun** :
   ```bash
   bun install
   ```
3. Démarrez le projet en mode développement :
   ```bash
   bun run dev
   ```

### 🌐 **Variables d'Environnement à Configurer**
Pour une exécution correcte, ajoutez les variables suivantes dans votre fichier `.env` :
```env
NUXT_UI_PRO_LICENSE=
NUXT_PUBLIC_SITE_URL=
NUXT_OPENAI_API_KEY=
NUXT_API_URL=
NUXT_WEBSOCKET_URL=
```
