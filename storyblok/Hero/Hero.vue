<template>
  <div
    v-editable="blok"
    class="hero w-full min-h-[400px] bg-cover bg-center flex items-center justify-center"
    :style="{ backgroundImage: `url(${blok.image.filename})` }"
  >
    <div class="hero__content flex flex-col">
      <span class="text-white text-5xl">{{ blok.title }}</span>
      <NuxtLink :to="`/${blok.link.cached_url}`">Saber Mais</NuxtLink>
    </div>
  </div>
</template>
  
<script setup>
import "./Hero.scss";
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
</script>