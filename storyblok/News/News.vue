<template>
  <div v-editable="blok" class="news">
    <h2>{{ blok.title }}</h2>
    <carousel :items-to-show="4" :gap="16" :items-to-scroll="2">
      <slide v-for="item in blok.items" :key="item._uid">
        <Card :blok="item" />
      </slide>

      <template #addons="{ slidesCount }">
        <Pagination :slides-count="slidesCount" />
      </template>
    </carousel>
  </div>
</template>
  
<script setup>
import "./News.scss";
import Card from "../Card/Card.vue";

import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
import Pagination from "./components/Pagination.vue";

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

defineComponent({
  components: {
    Card,
    Carousel,
    Slide,
    Pagination,
  },
});
</script>