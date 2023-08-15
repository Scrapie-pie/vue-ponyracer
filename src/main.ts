import { createApp } from 'vue';
import Alert from '@/components/Alert.vue';
import App from './App.vue';
import './assets/main.css';

createApp(App).component('Alert', Alert).mount('#app');
