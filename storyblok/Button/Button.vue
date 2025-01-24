<template>
  <NuxtLink
    v-if="blok.link && !isAnchor"
    :to="blok.link.cached_url ? `/${blok.link.cached_url}` : blok.link"
    class="button"
    :class="`button--${blok.variant}`"
  >
    {{ blok.text }}
    <template v-if="blok.hasIcon">
      <img :src="arrowRightBlue" alt="arrowRight" class="button__icon"/>
    </template>
  </NuxtLink>
  <button v-else class="button" :class="`button--${blok.variant}`" @click="handleClick">
    {{ blok.text }}
    <template v-if="blok.hasIcon">
      <img :src="arrowRightBlue" alt="arrowRight" class="button__icon"/>
    </template>
  </button>
</template>

<script setup>
import "./Button.scss";
import arrowRightBlue from "~/assets/icons/ArrowRightBlue.svg";

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
  isAnchor: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['clicked']);

const handleClick = (event) => {
  if (props.isAnchor) {
    emit('clicked', event);
  }
};
</script>