<template>
  <figure @click="clicked()">
    <img :src="ponyImageUrl" :alt="ponyModel.name" />
    <figcaption>{{ ponyModel.name }}</figcaption>
  </figure>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { PonyModel } from '@/models/PonyModel';

const props = defineProps<{
  ponyModel: PonyModel;
  isRunning?: boolean;
}>();

const emit = defineEmits<{
  (e: 'ponySelected'): void;
}>();

function clicked() {
  emit('ponySelected');
}

const ponyImageUrl = computed(() => `/images/pony-${props.ponyModel.color.toLowerCase()}${props.isRunning ? '-running' : ''}.gif`);
</script>

<style scoped>
figure {
  margin: 3px;
  padding: 3px;
  font-size: 12px;
}

img {
  height: 50px;
}
</style>
