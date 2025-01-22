<template>
  <div
    v-editable="blok"
    class="hero w-full aspect-video bg-cover bg-center flex justify-center"
    :style="{ backgroundImage: `url(${blok.image.filename})` }"
  >
    <div v-if="blok.image.filename" class="hero__overlay" />
    <div class="hero__content flex flex-col">
      <span class="hero__content--title ldtech" :class="{
        'hero__content--title-blue': !blok.image.filename,
      }" v-html="formatText(blok.title)" />
      <template v-if="blok.button.length > 0">
        <component
          v-for="(blok, index) in blok.button"
          :key="index"
          :is="blok.component"
          :blok="blok" />
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
</script>