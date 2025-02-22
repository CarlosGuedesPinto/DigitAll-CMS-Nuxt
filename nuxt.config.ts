// https://nuxt.com/docs/api/configuration/nuxt-config

import path from 'path';
import fs from 'fs';

export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: { port: 80 },

  server: {
    https: {
        key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem'))
    }
  },

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
      title: `Digit'ALL APNOR`,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'digitall', name: `Digit'ALL APNOR`, content: `Digit'ALL APNOR` },
        { name: 'description', content: `Digit'ALL APNOR` },
        { name: 'og:description', content: `Digit'ALL APNOR` },
        { name: `og:title`, content: `Digit'ALL APNOR` },
      ]
    }
  },

  compatibilityDate: '2024-12-29'
});