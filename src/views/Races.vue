<template>
  <!-- eslint-disable-next-line vue/require-v-for-key -->
  <div v-for="race of races">
    <h2>{{ race.name }}</h2>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RaceModel } from '@/models/RaceModel';

const races = ref<Array<RaceModel>>([{ name: 'Lyon' }, { name: 'London' }]);
</script>
