<template>
  <div v-editable="blok" class="news-page gap-16 flex flex-col pb-16" :class="containerClass">
    <Image :blok="blok" />
    <TitleContent :blok="titleContentBlok" />
    <div class="news-page__component" v-for="blok in blok.body" :key="blok._uid">
      <StoryblokComponent :blok="blok" />
    </div>
  </div>
</template>

<script setup>
import TitleContent from '../TitleContent/TitleContent.vue';
import Image from '../Image/Image.vue';

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

console.log('props', props.blok);

const containerClass = computed(() => {
  return props.blok.body && props.blok.body[0] && props.blok.body[0].component === 'hero'
    ? ''
    : 'pt-16';
});

const titleContentBlok = {
  title: props.blok.title,
  content: [
    {
      alignedLeft: false,
      component: 'text',
      hasBorder: false,
      text: props.blok.primaryText,
      title: ""
    }
  ]
};
</script>
