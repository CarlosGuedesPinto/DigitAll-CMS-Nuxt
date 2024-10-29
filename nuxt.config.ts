// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    ['@storyblok/nuxt', { accessToken: process.env.NUXT_PUBLIC_SB_CONTENT_DELIVERY_TOKEN }]
  ],
  runtimeConfig: {
    public: {
      NUXT_PUBLIC_SB_ENV: process.env.NUXT_PUBLIC_SB_ENV
    }
  },
})
