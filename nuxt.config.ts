// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  server:{
    host: 'leazy.local',
    port: 3000
  },
  extends: [process.env.NUXT_UI_PRO_PATH || '@nuxt/ui-pro'],
  modules: [
    '@nuxt/ui',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    'nuxt-auth-sanctum'
  ],
  ui: {
    icons: ['simple-icons', 'lucide', 'fluent'],
    safelistColors: ['primary', 'red', 'orange', 'green']
  },
  sanctum: {
    baseUrl: 'https://api.leazy.net',
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
      'library/chapters/[id]_[slug]': {
        en: '/library/chapters/[id]_[slug]',
        fr: '/bibliotheque/chapitres/[id]_[slug]'
      },
      'library/themes/index': {
        en: '/library/themes',
        fr: '/bibliotheque/themes'
      },
      'library/themes/[id]_[slug]': {
        en: '/library/themes/[id]_[slug]',
        fr: '/bibliotheque/themes/[id]_[slug]'
      },
      'library/lessons/index': {
        en: '/library/lessons',
        fr: '/bibliotheque/lecons'
      },
      'library/lessons/[id]_[slug]': {
        en: '/library/lessons/[id]_[slug]',
        fr: '/bibliotheque/lecons/[id]_[slug]'
      },
      inbox: {
        en: '/inbox',
        fr: '/messages'
      },
      index: {
        en: '/',
        fr: '/'
      }
    }
  },
  devtools: {
    enabled: false
  }
})
