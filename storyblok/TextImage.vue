<template>
  <div v-editable="blok">
    <div class="w-full bg-gray-100 rounded-md text-center overflow-hidden">
      <div class="px-12 py-6">
        <div v-if="blok.imagePosition === 'top'">
          <img
            :src="blok.image.filename"
            :alt="blok.image.alt"
            class="w-full mb-4"
          />
          <div v-html="content" />
        </div>
        <div v-else-if="blok.imagePosition === 'bottom'">
          <div v-html="content" />
          <img
            :src="blok.image.filename"
            :alt="blok.image.alt"
            class="w-full mt-4"
          />
        </div>
        <div
          v-else-if="
            blok.imagePosition === 'left' || blok.imagePosition === 'right'
          "
          class="flex items-center"
        >
          <img
            :src="blok.image.filename"
            :alt="blok.image.alt"
            :class="{
              'order-last ml-4': blok.imagePosition === 'right',
              'mr-4': blok.imagePosition === 'left',
            }"
            class="w-1/2"
          />
          <div v-html="content" class="w-1/2" />
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

const content = computed(() => renderRichText(props.blok.text));
</script>
  
<style scoped>
.order-last {
  order: 1;
}
.ml-4 {
  margin-left: 1rem;
}
.mr-4 {
  margin-right: 1rem;
}
.mb-4 {
  margin-bottom: 1rem;
}
.mt-4 {
  margin-top: 1rem;
}
</style>