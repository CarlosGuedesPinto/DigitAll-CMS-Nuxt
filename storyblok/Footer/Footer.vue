<template>
  <footer class="footer w-full">
    <div class="footer__content flex-col flex justify-between">
      <img :src="blok.logo.filename" :alt="blok.logo.alt" loading="lazy" />
    </div>
    <div class="footer__rows grid grid-flow-col">
      <div
        v-for="row in blok.rows"
        :key="row.uid"
        class="footer__rows--row flex flex-col text-white gap-4"
      >
        <div class="content-center">
          <img :src="row.logo.filename" :alt="row.logo.alt" loading="lazy" />
        </div>
        <!-- Fix this -->
        <a class="extrabold" :href="row.website.cached_url" target="_blank" rel="noopener noreferrer">{{ row.website.cached_url }}</a>

        <div class="flex flex-col">
          <span class="extrabold">Morada</span>
          <span class="extralight">{{ row.address }}</span>
        </div>

        <div class="flex flex-col">
          <span class="extrabold">Mail</span>
          <span class="extralight">{{ row.mail }}</span>
        </div>

        <div class="flex flex-col">
          <span class="extrabold">Telefone</span>
          <span class="extralight">{{ row.cellphone }}</span>
        </div>

        <div class="flex flex-col">
          <span class="extrabold">Redes Sociais</span>
          <NuxtLink
            v-if="row.socials[0].instagram_link"
            :to="row.socials[0].instagram_link.cached_url"
             class="extralight"
            >Instagram</NuxtLink
          >
          <NuxtLink
            v-if="row.socials[0].facebook_link"
            :to="row.socials[0].facebook_link.cached_url"
             class="extralight"
            >Facebook</NuxtLink
          >
          <NuxtLink
            v-if="row.socials[0].linkedin_link"
            :to="row.socials[0].linkedin_link.cached_url"
             class="extralight"
            >LinkedIn</NuxtLink
          >
          <NuxtLink
            v-if="row.socials[0].youtube_link"
            :to="row.socials[0].youtube_link.cached_url"
             class="extralight"
            >Youtube</NuxtLink
          >
          <NuxtLink
            v-if="row.socials[0].tiktok_link"
            :to="row.socials[0].tiktok_link.cached_url"
             class="extralight"
            >TikTok</NuxtLink
          >
          <NuxtLink
            v-if="row.socials[0].x_link"
            :to="row.socials[0].x_link.cached_url"
             class="extralight"
            >X</NuxtLink
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import "./Footer.scss";
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
</script>

