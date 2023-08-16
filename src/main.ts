import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import Alert from '@/components/Alert.vue';
import router from './router';
import i18n from './i18n';

import '@/assets/main.css';

createApp(App).use(createPinia()).use(router).use(i18n).component('Alert', Alert).mount('#app');
