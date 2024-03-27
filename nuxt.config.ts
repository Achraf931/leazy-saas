// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [process.env.NUXT_UI_PRO_PATH || '@nuxt/ui-pro', 'leazy-nuxt-layer'],
  modules: [
    '@nuxt/ui',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    '@nuxt/content',
    '@nuxtjs/i18n',
    "@nuxt/image",
    // '@leazyhub/editor'
  ],
  ui: {
    icons: {
      dynamic: true
    },
    safelistColors: ['primary', 'red', 'orange', 'green']
  },
  devtools: {
    enabled: false
  }
})
