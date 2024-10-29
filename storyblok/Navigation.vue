<template>
  <header class="w-full h-24 bg-[#f7f6fd]" v-if="items.length > 0">
    <div class="container h-full mx-auto flex items-center justify-between">
      <NuxtLink :to="home.slug">
        <h1 class="text-gray-800 text-3xl font-bold">{{ home.title }}</h1>
      </NuxtLink>
      <nav>
        <ul class="flex space-x-8 text-lg font-bold">
          <li v-for="item in items" :key="item._uid">
            <NuxtLink :to="item.slug" class="hover:text-gray-800">{{
              item.title
            }}</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const storyblokApi = useStoryblokApi();
const items = ref([]);
const home = ref({});

const fetchSlugs = async () => {
  if (props.blok.items.filter((item) => item.isHomePage).length >= 2) {
    console.error("Multiplas paginas como Homepage");
  }

  for (const item of props.blok.items) {
    if (item.isHomePage) {
      home.value = {
        title: item.title,
        slug: item.link.cached_url,
      };
    } else {
      items.value.push({
        title: item.title,
        slug: item.link.cached_url,
      });
    }
  }
};

onMounted(async () => {
  await fetchSlugs();
});
</script>

