import 'dotenv/config'

// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-04-03',
  nitro: {
    experimental: {
      websocket: true,
    }
  },
  // ssr: false,
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  runtimeConfig: {
    public: {
      WEBSOCKET_URL: process.env.NUXT_WEBSOCKET_URL,
      OPENAI_API_KEY: process.env.NUXT_OPENAI_API_KEY
    }
  },
  extends: [process.env.NUXT_UI_PRO_PATH || '@nuxt/ui-pro', '@leazyhub/editor'],
  modules: [
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    'nuxt-auth-sanctum'
  ],
  ui: {
    icons: ['simple-icons', 'lucide', 'fluent', 'mdi'],
    safelistColors: ['primary', 'red', 'orange', 'green']
  },
  sanctum: {
    baseUrl: process.env.NUXT_API_URL || 'http://leazy.local:8000',
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
    legacy: false,
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
    defaultLocale: 'fr',
    customRoutes: 'config',
    pages: {
      users: {
        en: '/users',
        fr: '/utilisateurs'
      },
      course: {
        en: '/course',
        fr: '/cours'
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
      'library/formations': {
        en: '/library/formations',
        fr: '/bibliotheque/formations'
      },
      'library/formations/[id]': {
        en: '/library/formations/[id]',
        fr: '/bibliotheque/formations/[id]'
      },
      'library/formations/[id]/[lesson_id]': {
        en: '/library/formations/[id]/[lesson_id]',
        fr: '/bibliotheque/formations/[id]/[lesson_id]'
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
      'agenda_[id]': {
        en: '/agenda/[id]',
        fr: '/agenda/[id]'
      },
      classes: {
        en: '/classes',
        fr: '/classes'
      },
      'classes/[id]': {
        en: '/classes/[id]',
        fr: '/classes/[id]'
      },
      templates: {
        en: '/templates',
        fr: '/modeles'
      },
      index: {
        en: '/',
        fr: '/'
      }
    },
    experimental: {
      localeDetector: './localeDetector.ts',
      autoImportTranslationFunctions: true,
      switchLocalePathLinkSSR: true,
      typedOptionsAndMessages: 'default'
    }
  },
  devtools: {
    enabled: false
  },
  optimizeDeps: {
    include: ['highlight.js']
  },
  vite: {
    resolve: {
      alias: {
        'highlight.js': 'highlight.js',
        'evaluatex': 'evaluatex'
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api']
        }
      }
    }
  },
  devServer: {
    host: 'leazy.local'
  }
})
