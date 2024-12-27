<template>
  <NuxtLink
      v-if="props.link"
      :to="`/${props.link}`"
      class="button"
      :class="`button--${variant}`"
    >
      {{ props.text }}
      <template v-if="hasIcon">
        <img :src="arrowRightBlue" alt="arrowRight" class="button__icon"/>
      </template>
    </NuxtLink>
    <button v-else class="button">
      {{ props.text }}
      <template v-if="hasIcon">
        <img :src="arrowRightBlue" alt="arrowRight" class="button__icon"/>
      </template>
    </button>
</template>

<script setup>
import "./Button.scss";
import arrowRightBlue from "~/assets/icons/ArrowRightBlue.svg";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: false,
  },
  hasIcon: {
    type: Boolean,
    required: false,
  },
  variant: {
    type: String,
    required: false,
    default: "primary",
    validator: value => ["primary", "secondary"].includes(value),
  },
});
</script>

<style>

</style>