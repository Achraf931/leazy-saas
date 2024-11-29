// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  components: [
    {
      path: '@/components',
      pathPrefix: false
    }
  ],
  runtimeConfig: {
    public: {
      CONVERT_APP_ID: process.env.NUXT_CONVERT_APP_ID,
      JWT_CONVERT_TOKEN: process.env.NUXT_JWT_CONVERT_TOKEN
    }
  },
  extends: ['@nuxt/ui-pro', '@leazyhub/editor'],
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxtjs/i18n',
    '@nuxt/image',
    'nuxt-auth-sanctum'
  ],
  // ssr: false,
  devtools: {
    enabled: false
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  ui: {
    safelistColors: ['primary', 'red', 'orange', 'green']
  },
  devServer: {
    host: 'leazy.local'
  },
  future: {
    compatibilityVersion: 4
  },
  compatibilityDate: '2024-07-11',
  typescript: {
    strict: false
  },
  icon: {
    provider: 'server',
    serverBundle: {
      collections: ['heroicons', 'lucide', 'fluent', 'mdi', 'simple-icons']
    }
  },
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  i18n: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
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
      'users': {
        en: '/users',
        fr: '/utilisateurs'
      },
      'course': {
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
      'login': {
        en: '/login',
        fr: '/connexion'
      },
      'library': {
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
      'preview': {
        en: '/preview',
        fr: '/preview'
      },
      'preview/[id]': {
        en: '/preview/[id]',
        fr: '/preview/[id]'
      },
      'preview/[id]/[lesson_id]': {
        en: '/preview/[id]/lesson/[lesson_id]',
        fr: '/preview/[id]/lesson/[lesson_id]'
      },
      'inbox': {
        en: '/inbox',
        fr: '/messages'
      },
      'kanban': {
        en: '/kanban',
        fr: '/kanban'
      },
      'agenda': {
        en: '/agenda',
        fr: '/agenda'
      },
      'agenda_[id]': {
        en: '/agenda/[id]',
        fr: '/agenda/[id]'
      },
      'classes': {
        en: '/classes',
        fr: '/classes'
      },
      'classes/[id]': {
        en: '/classes/[id]',
        fr: '/classes/[id]'
      },
      'templates': {
        en: '/templates',
        fr: '/modeles'
      },
      'index': {
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
  sanctum: {
    baseUrl: process.env.NUXT_API_URL || 'http://leazy.local:8000',
    endpoints: {
      csrf: '/sanctum/csrf-cookie',
      login: '/api/login',
      logout: '/api/logout',
      user: '/api/me'
    },
    redirect: {
      onLogout: '/connexion',
      onAuthOnly: '/connexion',
      onGuestOnly: '/'
    },
    globalMiddleware: {
      enabled: true
    }
  }
})
