<template>
  <div
    v-if="!loading"
    v-editable="blok"
    class="title-content w-full"
  >
    <span class="title-content__title ldtech" :class="{
      'title-content__title--border': blok.content.length > 0
    }"
     v-html="formatText(blok.title)" />
    <div v-if="blok.content.length > 0" class="title-content__content">
      <component
        v-for="(blok, index) in blok.content"
        :key="index"
        :is="blok.component"
        :blok="blok"
      />
    </div>
  </div>
  <div v-else class="title-content__skeleton">
    <div class="skeleton skeleton-logo" />
    <div class="skeleton skeleton-content" />
  </div>

</template>
  
<script setup>
import { formatText } from '~/src/helpers/text';
import './TitleContent.scss';

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>