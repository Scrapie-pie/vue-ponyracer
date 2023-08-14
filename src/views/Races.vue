<template>
  <Race v-for="race of races" :key="race.id" :raceModel="race" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RaceModel } from '@/models/RaceModel';
import Race from '@/components/Race.vue';

const races = ref<Array<RaceModel>>([
  {
    id: 12,
    name: 'Paris',
    ponies: [
      { id: 1, name: 'Gentle Pie', color: 'YELLOW' },
      { id: 2, name: 'Big Soda', color: 'ORANGE' },
      { id: 3, name: 'Gentle Bottle', color: 'PURPLE' },
      { id: 4, name: 'Superb Whiskey', color: 'GREEN' },
      { id: 5, name: 'Fast Rainbow', color: 'BLUE' }
    ],
    startInstant: '2020-02-18T08:02:00Z'
  },
  {
    id: 13,
    name: 'Tokyo',
    ponies: [
      { id: 6, name: 'Fast Rainbow', color: 'BLUE' },
      { id: 7, name: 'Gentle Castle', color: 'GREEN' },
      { id: 8, name: 'Awesome Rock', color: 'PURPLE' },
      { id: 9, name: 'Little Rainbow', color: 'YELLOW' },
      { id: 10, name: 'Great Soda', color: 'ORANGE' }
    ],
    startInstant: '2020-02-18T08:03:00Z'
  }
]);
</script>
