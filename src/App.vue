<template>
  <Navbar />
  <main class="container" style="margin-top: 70px">
    <RouterView v-slot="{ Component }">
      <Alert v-if="error" variant="danger" dismissible @dismissed="error = false"> An error occurred while loading. </Alert>
      <Suspense v-else timeout="0">
        <component :is="Component" />
        <template #fallback>Loading...</template>
      </Suspense>
    </RouterView>
  </main>
</template>

<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue';
import Navbar from '@/components/Navbar.vue';

const error = ref(false);
onErrorCaptured((e: unknown) => {
  console.warn(e);
  error.value = true;
  return false;
});
</script>
