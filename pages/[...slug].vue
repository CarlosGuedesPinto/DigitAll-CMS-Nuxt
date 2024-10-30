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
import { storyblokVersion } from "~/helpers/helpers";

definePageMeta({
  middleware: "auth",
});

const { $preview } = useNuxtApp();

const route = useRoute();
const storyblokApi = useStoryblokApi();
const story = ref(null);
const loading = ref(true);
const resolveRelations = ["global_reference.reference"];

const fetchStory = async () => {
  try {
    const slug = route.params.slug ? route.params.slug.join("/") : "home";
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: storyblokVersion(),
      resolve_relations: resolveRelations,
    });

    story.value = data.story;
  } catch (error) {
    console.error("Erro ao buscar historia:", error);

    throw createError({
      statusCode: 404,
      statusMessage:
        storyblokVersion() === "draft"
          ? "Storyblok - Erro ao buscar historia"
          : "Ups! Algo deu errado",
      fatal: true,
    });
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