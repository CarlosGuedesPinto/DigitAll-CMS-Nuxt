<template>
  <div
    v-editable="blok"
    class="trio w-full"
  >
    <template v-if="blok.content.length > 0" class="trio__content">
      <component
        v-for="(blok, index) in blok.content"
        :key="index"
        :is="blok.component"
        :blok="blok"
        class="trio__item"
      />
    </template>
  </div>
</template>
  
<script setup>
import "./Trio.scss";

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
</script>