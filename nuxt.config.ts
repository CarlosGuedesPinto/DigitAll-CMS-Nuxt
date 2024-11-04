// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    ['@storyblok/nuxt', { accessToken: process.env.NUXT_PUBLIC_SB_CONTENT_DELIVERY_TOKEN }],
    '@nuxtjs/sitemap',
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
});