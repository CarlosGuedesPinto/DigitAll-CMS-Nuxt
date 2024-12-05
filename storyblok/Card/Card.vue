<template>
  <div
    v-editable="blok"
    class="card p-4 gap-4 flex rounded-3xl border-black border-2"
    :class="[
      `card__size--${blok.size}`,
      {
        'flex-row': blok.imagePosition === 'left',
        'flex-col': blok.imagePosition === 'top',
      },
    ]"
  >
    <div v-if="!isImageNotVisible" class="card__image-container">
      <img
        :src="blok.image.filename"
        :alt="blok.image.alt"
        class="w-full rounded-2xl card__image h-full object-cover"
        loading="lazy"
      />
    </div>
    <div class="card__content flex flex-col gap-4">
      <span class="font-extrabold text-3xl">{{ blok.title }}</span>
      <span>{{ blok.content }}</span>

      <NuxtLink
        class="justify-between flex font-bold"
        :to="`/${blok.redirect.cached_url}`"
      >
        <span>Saber mais</span>
        <span> &#8594; </span>
      </NuxtLink>
    </div>
  </div>
</template>
  
<script setup>
import "./Card.scss";

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

const isImageNotVisible = computed(
  () =>
    !props.blok.image ||
    (props.blok.imagePosition === "left" && props.blok.size === "small")
);

console.log(props.blok);
</script>