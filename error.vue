<script setup>
import { defineProps } from "vue";

defineProps({
  error: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="error-page">
    <div class="error-content">
      <h1>{{ error.statusCode }}</h1>
      <p>{{ error.message }}</p>
      <NuxtLink to="/" class="home-link">Voltar à HomePage</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f6fd;
  color: #333;
  text-align: center;
}

.error-content {
  max-width: 600px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
}

h1 {
  font-size: 4rem;
  margin-bottom: 20px;
}

p {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.home-link {
  font-size: 1.2rem;
  color: #007bff;
  text-decoration: none;
}

.home-link:hover {
  text-decoration: underline;
}
</style>