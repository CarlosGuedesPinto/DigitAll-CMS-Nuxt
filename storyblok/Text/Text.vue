<template>
  <div
    v-editable="blok"
    class="text w-full"
  >
    <span class="extralight" v-html="formatText(blok.text)"></span>
  </div>
</template>
  
<script setup>
import "./Text.scss";
import { formatText } from '~/src/helpers/text';

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
</script>