<template>
  <header :class="{
    'navigation--white-border': isMenuOpen,
  }" class="navigation w-full grid" v-if="items.length > 0">
    <!-- Mobile -->
    <div class="h-full w-full flex justify-between px-4 pt-4 pb-[10px] tablet:hidden" :class="{
      'bg-[#0082FF]': isMenuOpen,
    }">
      <NuxtLink to="/">
        <img v-if="!isMenuOpen" :src="logo" alt="Logo" width="160px" height="30px"/>
        <img v-if="isMenuOpen" :src="logoWhite" alt="Logo" width="160px" height="30px"/>
      </NuxtLink>
      <button @click="toggleMenu" class="navigation-mobile__button">
        <img v-if="!isMenuOpen" :src="burguerIcon" alt="Burguer Icon" />
        <img v-if="isMenuOpen" :src="closeIcon" alt="Close Icon" />
      </button>
    </div>
    <div v-if="isMenuOpen" class="navigation-mobile__menu absolute top-[57.5px] left-0 w-full z-50 flex flex-col tablet:hidden justify-between">
      <nav>
        <ul class="flex flex-col space-y-4 text-lg font-bold">
          <li
            v-for="item in items"
            :key="item._uid"
            class="flex"
          >
            <div v-if="item.submenus && item.submenus.length > 0" class="navigation-mobile__nav-item navigation-mobile__nav-item--not-link">
              {{ item.title }}
              <div class="navigation-mobile__submenu">
                <div class="navigation-mobile__submenu-container flex flex-col w-max extralight">
                  <NuxtLink
                    v-for="(submenu, index) in item.submenus"
                    :key="`submenu--${index}`"
                    :to="submenu.slug"
                    class="navigation-mobile__submenu-item"
                    :class="{ 'navigation-mobile__submenu-item--active': $route.path === submenu.slug }"
                    @click="toggleMenu"
                  >
                    {{ submenu.title }}
                  </NuxtLink>
                </div>
              </div>
            </div>
            <NuxtLink v-else :to="item.slug" @click="toggleMenu" :class="['navigation-mobile__nav-item flex w-full', { 'navigation-mobile__nav-item--active': isItemActive(item.slug, item.submenus && item.submenus.length > 0) }]">{{ item.title }}</NuxtLink>
          </li>
          <li class="flex">
            <NuxtLink to="/moodle" @click="toggleMenu" class="navigation-mobile__nav-item w-full">Moodle</NuxtLink>
          </li>
        </ul>
      </nav>
      <div class="navigation-mobile__footer flex justify-center w-full">
        <div class="grid grid-cols-4 gap-4 items-center">
          <img :src="logoIPBWhite" alt="LogoIPB" class="w-full h-auto" />
          <img :src="logoIPCWhite" alt="LogoIPC" class="w-full h-auto" />
          <img :src="logoIPPWhite" alt="LogoIPP" class="w-full h-auto" />
          <img :src="logoIPVCWhite" alt="LogoIPVC" class="w-full h-auto" />
        </div>
      </div>
    </div>
    <!-- Desktop -->
    <div class="navigation__desktop h-full w-full px-4 pt-4 pb-[7.5px] hidden tablet:flex">
      <div class="navigation__desktop--content w-full flex justify-between">
        <NuxtLink to="/">
          <img :src="logo" alt="Logo" width="216px" height="40.5px"/>
        </NuxtLink>
        <nav>
          <ul class="flex gap-4 text-lg font-bold navigation__nav-link relative">
            <li
              v-for="item in items"
              :key="item._uid"
              :class="['navigation__nav-item flex', { 'navigation__nav-item--active': isItemActive(item.slug, item.submenus && item.submenus.length > 0) }]"
            >
              <template v-if="item.submenus && item.submenus.length > 0" class="w-full">
                <div>{{ item.title }}</div>
                <div class="navigation__submenu">
                  <div class="navigation__submenu-container flex flex-col w-max extralight">
                    <NuxtLink
                      v-for="(submenu, index) in item.submenus"
                      :key="`submenu--${index}`"
                      :to="submenu.slug"
                      class="navigation__submenu-item"
                      :class="{ 'navigation__submenu-item--active': $route.path === submenu.slug }"
                    >
                      {{ getTitles(submenu) }}
                    </NuxtLink>
                  </div>
                </div>
              </template>
              <template v-else class="flex">
                <NuxtLink :to="item.slug" class="w-full">{{ item.title }}</NuxtLink>
              </template>
            </li>
            <li class="flex">
              <NuxtLink to="/moodle" class="navigation__nav-item navigation__nav-item--moodle">Moodle</NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storyblokVersion } from "~/helpers/helpers";
import { useRouter } from "vue-router";
import "./Navigation.scss";
import logo from "~/assets/logos/LogoDesktop.svg";
import logoWhite from "~/assets/logos/LogoDesktopWhite.svg";
import burguerIcon from "~/assets/icons/Burguer.svg";
import closeIcon from "~/assets/icons/CloseIconWhite.svg";
import logoIPBWhite from "~/assets/logos/LogoIPBWhite.svg";
import logoIPCWhite from "~/assets/logos/LogoIPCWhite.svg";
import logoIPPWhite from "~/assets/logos/LogoIPPWhite.svg";
import logoIPVCWhite from "~/assets/logos/LogoIPVCWhite.svg";

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

const items = ref([]);
const isMenuOpen = ref(false);
const screenWidth = ref(window.innerWidth);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const getTitles = (submenu) => {
  return screenWidth.value > 1408 ? submenu.title : submenu.acronym;
};

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};

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
      acronym: item.acronym,
      submenus: item.submenus?.map((submenu) => ({
        title: submenu.title,
        slug: `/${submenu.link.cached_url}`,
        acronym: submenu.acronym,
      })),
    });
  }
};

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

onMounted(async () => {
  await fetchSlugs();
  window.addEventListener('resize', updateScreenWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenWidth);
});
</script>

