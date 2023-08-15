<template>
  <Navbar />
  <main class="container" style="margin-top: 70px">
    <h1>Ponyracer</h1>
    <Alert v-if="error" variant="danger" dismissible @dismissed="error = false">An error occurred while loading.</Alert>
    <Suspense v-else>
      <Races />
      <template #fallback>Loading...</template>
    </Suspense>
  </main>
</template>

<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Races from '@/views/Races.vue';

const error = ref(false);
onErrorCaptured((e: unknown) => {
  console.warn(e);
  error.value = true;
  return false;
});
</script>
