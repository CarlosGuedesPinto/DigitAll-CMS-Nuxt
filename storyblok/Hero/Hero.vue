<template>
  <div
    v-editable="blok"
    class="hero w-full aspect-video bg-cover bg-center flex justify-center"
    :style="{ backgroundImage: `url(${blok.image.filename})` }"
  >
    <div class="hero__overlay" />
    <div class="hero__content flex flex-col">
      <span class="hero__content--title ldtech" v-html="formatText(blok.title)" />
      <Button :link="blok.link.cached_url" :text="blok.linkText" :hasIcon="blok.hasLinkIcon" variant="secondary" />
    </div>
  </div>
</template>
  
<script setup>
import "./Hero.scss";
import { formatText } from "~/src/helpers/text"
import Button from "~/src/components/Button.vue";

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

console.log(props.blok);
</script>