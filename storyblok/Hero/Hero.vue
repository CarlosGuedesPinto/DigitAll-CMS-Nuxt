<template>
  <div
    v-editable="blok"
    class="hero w-full aspect-video bg-cover bg-center flex justify-center"
    :style="{ backgroundImage: `url(${blok.image.filename})` }"
  >
    <div class="hero__overlay" />
    <div class="hero__content flex flex-col">
      <span class="hero__content--title ldtech" v-html="formatText(blok.title)" />
      <template v-if="blok.button.length > 0">
        <Button :link="button.link.cached_url" :text="button.text" :hasIcon="button.hasIcon" :variant="button.variant" />
      </template>
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

const button = ref(props.blok.button[0]);
</script>