<template>
  <div
    v-editable="blok"
    class="hero w-full aspect-video bg-cover bg-center flex justify-center"
    :style="{ backgroundImage: `url(${blok.image.filename})` }"
    ref="hero"
  >
    <div v-if="blok.image.filename" class="hero__overlay" />
    <div class="hero__content flex flex-col">
      <span class="hero__content--title ldtech" :class="{
        'hero__content--title-blue': !blok.image.filename,
      }" v-html="formatText(blok.title)" />
      <template v-if="blok.button.length > 0">
        <component
          v-for="(buttonBlok, index) in blok.button"
          :key="index"
          :is="buttonBlok.component"
          :blok="buttonBlok"
          :is-anchor="blok.isAnchorButton"
          @clicked="scroll" />
      </template>
    </div>
  </div>
</template>
  
<script setup>
import "./Hero.scss";
import { formatText } from "~/src/helpers/text"

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

const hero = ref(null);

const scroll = (event) => {
  event.preventDefault();
  const offsetElement = hero.value;
  if (offsetElement) {
    const offset = window.innerHeight - (64);
    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });
  }
};
</script>