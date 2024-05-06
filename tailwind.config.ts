import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  content: [
    './extensions/**/*.{vue,js,ts,mjs}',
    './components/**/*.{vue,js,ts,mjs}',
    './layouts/**/*.{vue,js,ts,mjs}',
    './pages/**/*.{vue,js,ts,mjs}',
    './plugins/**/*.{js,ts,mjs}',
    './nuxt.config.{js,ts,mjs}'
  ],
  theme: {
    extend: {
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9'
      },
      fontFamily: {
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans]
      }
    }
  }
}
