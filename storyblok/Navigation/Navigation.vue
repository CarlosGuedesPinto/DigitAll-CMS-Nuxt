<template>
  <header class="navigation w-full h-24" v-if="items.length > 0">
    <div class="h-full w-full flex items-center justify-between px-4">
      <NuxtLink to="/">
        <div class="flex items-end">
          <!-- Will be an svg -->
          <h1 class="leading-none navigation__logo">Digit'ALL</h1>
        </div>
      </NuxtLink>
      <nav>
        <ul
          class="flex space-x-8 text-lg font-bold navigation__nav-link relative"
        >
          <NuxtLink
            v-for="item in items"
            :key="item._uid"
            class="navigation__nav-item"
            :class="{
              'navigation__nav-item--active': isItemActive(item.slug, item.submenus && item.submenus.length > 0),
            }"
            :to="item.slug"
          >
            {{item.title}}

            <div v-if="item.submenus && item.submenus.length > 0" class="navigation__submenu">
              <div class="navigation__submenu-container flex flex-col w-max extralight">
                <NuxtLink
                  v-for="(submenu, index) in item.submenus"
                  :key="`submenu--${index}`"
                  :to="submenu.slug"
                  class="navigation__submenu-item"
                  :class="{
                    'navigation__submenu-item--active': $route.path === submenu.slug,
                  }"
                  >{{ submenu.title }}</NuxtLink
                >
              </div>
            </div>
          </NuxtLink>
          <NuxtLink
            to="/moodle"
            class="navigation__nav-item navigation__nav-item--moodle"
            >Moodle</NuxtLink>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storyblokVersion } from "~/helpers/helpers";
import { useRouter } from "vue-router";
import "./Navigation.scss";

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

const items = ref([]);
const home = ref({});



const fetchSlugs = async () => {
  if (props.blok.items.filter((item) => item.isHomePage).length >= 2) {
    console.error("Navigation - Multiplas paginas como Homepage");

    throw createError({
      statusCode: 404,
      statusMessage:
        storyblokVersion() === "draft"
          ? "CMS - Navigation - Multiplas paginas como Homepage"
          : "Ups! Algo deu errado",
      fatal: true,
    });
  }

  for (const item of props.blok.items) {
    items.value.push({
      title: item.title,
      slug: `/${item.link.cached_url}`,
      submenus: item.submenus?.map((submenu) => ({
        title: submenu.title,
        slug: `/${submenu.link.cached_url}`,
      })),
    });
  }
};

onMounted(async () => {
  await fetchSlugs();
});

const isItemActive = (slug, hasSubmenus) => {
  const route = useRouter();
  if (hasSubmenus) {
    for (const submenu of items.value.find((item) => item.slug === slug).submenus) {
      if (route.currentRoute.value.path === submenu.slug) {
        return true;
      }
    }
  }

  return route.currentRoute.value.path === slug;
};
</script>

