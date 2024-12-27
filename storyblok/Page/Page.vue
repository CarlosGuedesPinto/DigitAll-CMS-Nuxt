<template>
  <div v-editable="blok" class="page gap-16 flex flex-col pb-16">
    <div class="page__component" v-for="blok in blok.body" :key="blok._uid">
      <StoryblokComponent :blok="blok" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
</script>

<style>
</style>