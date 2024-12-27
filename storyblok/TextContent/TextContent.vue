<template>
  <div
    v-editable="blok"
    class="text-content w-full"
  >
    <span class="text-content__title ldtech" :class="{
      'text-content__title--border': blok.content.length > 0
    }"
     v-html="formatText(blok.title)" />
    <div v-if="blok.content.length > 0" class="text-content__content">
      <component
        v-for="(blok, index) in blok.content"
        :key="index"
        :is="blok.component"
        :blok="blok"
      />
    </div>
  </div>
</template>
  
<script setup>
import { formatText } from '~/src/helpers/text';
import './TextContent.scss';

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
</script>