<template>
  <div class="pagination">
    <Pagination />
  </div>
</template>
  
<script setup>
import { Pagination } from "vue3-carousel";
import "./Pagination.scss";

const props = defineProps({
  slidesCount: {
    type: Number,
    required: true,
  },
});

defineComponent({
  components: {
    Pagination,
  },
});
</script>