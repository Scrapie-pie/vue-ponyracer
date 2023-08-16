<template>
  <Navbar />
  <main class="container" style="margin-top: 70px">
    <RouterView v-slot="{ Component }">
      <Alert v-if="error" variant="danger" dismissible @dismissed="error = false">{{ t('app.error') }}</Alert>
      <Suspense v-else timeout="0">
        <component :is="Component" />
        <template #fallback>{{ t('app.loading') }}</template>
      </Suspense>
    </RouterView>
  </main>
</template>

<script setup lang="ts">
import { onErrorCaptured, ref, watchEffect } from 'vue';
import Navbar from '@/components/Navbar.vue';
import { useTypedI18n } from '@/composables/TypedI18n';

const { t, locale } = useTypedI18n();
watchEffect(() => {
  document.documentElement.setAttribute('lang', locale.value);
  window.localStorage.setItem('preferredLocale', locale.value);
});

const error = ref(false);
onErrorCaptured((e: unknown) => {
  console.warn(e);
  error.value = true;
  return false;
});
</script>
