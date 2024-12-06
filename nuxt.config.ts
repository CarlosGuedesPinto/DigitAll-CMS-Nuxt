// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    ['@storyblok/nuxt', { accessToken: process.env.NUXT_PUBLIC_SB_CONTENT_DELIVERY_TOKEN }],
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],
  runtimeConfig: {
    public: {
      NUXT_PUBLIC_SB_ENV: process.env.NUXT_PUBLIC_SB_ENV,
      NUXT_PUBLIC_AUTH_USERNAME: process.env.NUXT_PUBLIC_AUTH_USERNAME,
      NUXT_PUBLIC_AUTH_PASSWORD: process.env.NUXT_PUBLIC_AUTH_PASSWORD,
      NUXT_PUBLIC_SITE_URL: process.env.NUXT_PUBLIC_SITE_URL
    }
  },
  sitemap: {
    hostname: process.env.NUXT_PUBLIC_SITE_URL,
    gzip: true,
    cacheTime: 1000 * 60 * 2,
    sources: [
      '/api/__sitemap__/urls',
    ]
  },
  app: {
    head: {
      title: process.env.NUXT_PUBLIC_SITE_NAME,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'digitall', name: 'DigitAll', content: 'DigitAll website' }
      ]
    }
  }
});