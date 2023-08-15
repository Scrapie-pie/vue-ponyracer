/// <reference types="vite/client" />

import type Alert from '@/components/Alert.vue';

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    Alert: typeof Alert;
  }
}
