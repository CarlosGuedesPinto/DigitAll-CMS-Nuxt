<template>
  <footer class="footer w-full bg-[#2596be]">
    <div class="footer__content flex-col flex justify-between">
      <img :src="blok.logo.filename" :alt="blok.logo.alt" loading="lazy" />
      <div class="flex">
        <img
          v-for="logo in blok.logo_row"
          :key="logo.uid"
          :src="logo.filename"
          :alt="logo.alt"
          loading="lazy"
        />
      </div>
    </div>
    <div class="footer__rows grid grid-flow-col">
      <div
        v-for="row in blok.rows"
        :key="row.uid"
        class="footer__rows--row flex flex-col text-white gap-4"
      >
        <img :src="row.logo.filename" :alt="row.logo.alt" loading="lazy" />
        <span class="font-bold">{{ row.website.cached_url }}</span>

        <div class="flex flex-col">
          <span class="font-bold">Morada</span>
          <span>{{ row.address }}</span>
        </div>

        <div class="flex flex-col">
          <span class="font-bold">Mail</span>
          <span>{{ row.mail }}</span>
        </div>

        <div class="flex flex-col">
          <span class="font-bold">Telefone</span>
          <span>{{ row.cellphone }}</span>
        </div>

        <div class="flex flex-col">
          <span class="font-bold">Redes Sociais</span>
          <NuxtLink
            v-if="row.socials[0].instagram_link"
            :to="row.socials[0].instagram_link.cached_url"
            >Instagram</NuxtLink
          >
          <NuxtLink
            v-if="row.socials[0].facebook_link"
            :to="row.socials[0].facebook_link.cached_url"
            >Facebook</NuxtLink
          >
          <NuxtLink
            v-if="row.socials[0].linkedin_link"
            :to="row.socials[0].linkedin_link.cached_url"
            >LinkedIn</NuxtLink
          >
          <NuxtLink
            v-if="row.socials[0].youtube_link"
            :to="row.socials[0].youtube_link.cached_url"
            >Youtube</NuxtLink
          >
          <NuxtLink
            v-if="row.socials[0].tiktok_link"
            :to="row.socials[0].tiktok_link.cached_url"
            >TikTok</NuxtLink
          >
          <NuxtLink
            v-if="row.socials[0].x_link"
            :to="row.socials[0].x_link.cached_url"
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

