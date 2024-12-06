<template>
  <div v-editable="blok" class="page p-4 gap-4 flex flex-col">
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