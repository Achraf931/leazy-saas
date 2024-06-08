// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY
  },
  extends: [process.env.NUXT_UI_PRO_PATH || '@nuxt/ui-pro'],
  modules: [
    '@nuxt/ui',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    'nuxt-auth-sanctum',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  ui: {
    icons: ['simple-icons', 'lucide', 'fluent', 'mdi'],
    safelistColors: ['primary', 'red', 'orange', 'green']
  },
  sanctum: {
    baseUrl: 'http://leazy.local:8000',
    redirectIfAuthenticated: false,
    endpoints: {
      csrf: '/sanctum/csrf-cookie',
      login: '/api/login',
      logout: '/api/logout',
      user: '/api/me',
    },
    csrf: {
      cookie: 'XSRF-TOKEN',
      header: 'X-XSRF-TOKEN',
    },
    client: {
      retry: false,
    },
    redirect: {
      keepRequestedRoute: false,
      onLogin: '/',
      onLogout: '/connexion',
      onAuthOnly: '/connexion',
      onGuestOnly: '/',
    },
    globalMiddleware: {
      enabled: true,
      allow404WithoutAuth: true,
    },
  },
  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    },
    locales: [
      {
        id: 1,
        code: 'fr',
        iso: 'fr-FR',
        label: 'Français',
        name: 'Français',
        file: 'fr.json'
      },
      {
        id: 2,
        code: 'en',
        iso: 'en-US',
        label: 'English',
        name: 'English',
        file: 'en.json'
      }
    ],
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'fr',
    customRoutes: 'config',
    pages: {
      users: {
        en: '/users',
        fr: '/utilisateurs'
      },
      'settings/index': {
        en: '/settings',
        fr: '/parametres'
      },
      'settings/members': {
        en: '/settings/members',
        fr: '/parametres/membres'
      },
      'settings/notifications': {
        en: '/settings/notifications',
        fr: '/parametres/notifications'
      },
      login: {
        en: '/login',
        fr: '/connexion'
      },
      library: {
        en: '/library',
        fr: '/bibliotheque'
      },
      'library/chapters/index': {
        en: '/library/chapters',
        fr: '/bibliotheque/chapitres'
      },
      'library/chapters/[id]': {
        en: '/library/chapters/[id]',
        fr: '/bibliotheque/chapitres/[id]'
      },
      'library/themes/index': {
        en: '/library/themes',
        fr: '/bibliotheque/themes'
      },
      'library/themes/[id]': {
        en: '/library/themes/[id]',
        fr: '/bibliotheque/themes/[id]'
      },
      'library/lessons/index': {
        en: '/library/lessons',
        fr: '/bibliotheque/lecons'
      },
      'lesson_[id]': {
        en: '/library/lessons/[id]',
        fr: '/bibliotheque/lecons/[id]'
      },
      inbox: {
        en: '/inbox',
        fr: '/messages'
      },
      kanban: {
        en: '/kanban',
        fr: '/kanban'
      },
      agenda: {
        en: '/agenda',
        fr: '/agenda'
      },
      classes: {
        en: '/classes',
        fr: '/classes'
      },
      'classes/[id]': {
        en: '/classes/[id]',
        fr: '/classes/[id]'
      },
      index: {
        en: '/',
        fr: '/'
      }
    }
  },
  devtools: {
    enabled: false
  },
  tailwindcss: {
    quiet: true
  },
  vite: {
    optimizeDeps: {
      include: ['zod']
    }
  }
})
