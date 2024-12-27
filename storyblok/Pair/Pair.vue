<template>
  <div
    v-editable="blok"
    class="pair w-full"
  >
    <template v-if="blok.content.length > 0" class="pair__content">
      <component
        v-for="(blok, index) in blok.content"
        :key="index"
        :is="blok.component"
        :blok="blok"
      />
    </template>
  </div>
</template>
  
<script setup>
import "./Pair.scss";

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

console.log(props.blok);
</script>