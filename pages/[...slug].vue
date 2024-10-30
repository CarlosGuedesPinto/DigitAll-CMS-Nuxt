<template>
  <div v-if="loading">
    <p>Loading...</p>
  </div>
  <div v-else-if="story">
    <div v-if="story.content.topbar?.length > 0">
      <StoryblokComponent
        :blok="story.content.topbar[0].reference[0].content"
      />
    </div>
    <StoryblokComponent :blok="story.content" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

definePageMeta({
  middleware: "auth",
});

const { $preview } = useNuxtApp();

const version = $preview ? "draft" : "published";

const route = useRoute();
const storyblokApi = useStoryblokApi();
const story = ref(null);
const loading = ref(true);
const config = useRuntimeConfig();
const resolveRelations = ["global_reference.reference"];

const fetchStory = async () => {
  try {
    const slug = route.params.slug ? route.params.slug.join("/") : "home";
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version:
        config.public.NUXT_PUBLIC_SB_ENV === "development" ? "draft" : version,
      resolve_relations: resolveRelations,
    });

    story.value = data.story;
  } catch (error) {
    console.error("Error fetching story:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchStory();

  if ($preview && story.value && story.value.id) {
    useStoryblokBridge(story.value.id, (evStory) => (story.value = evStory), {
      resolveRelations,
    });
  }
});
</script>