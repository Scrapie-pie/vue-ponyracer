<template>
  <div>
    <Race v-for="race in races" :key="race.id" :raceModel="race" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RaceModel } from '@/models/RaceModel';
import { useRaceService } from '@/composables/RaceService';
import Race from '@/components/Race.vue';

const raceService = useRaceService();
const races = ref<Array<RaceModel>>(await raceService.list());
</script>
