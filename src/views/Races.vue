<template>
  <div>
    <Race v-for="race of races" :key="race.id" :raceModel="race" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RaceModel } from '@/models/RaceModel';
import Race from '@/components/Race.vue';
import { useRaceService } from '@/composables/RaceService';

const raceService = useRaceService();
const races = ref<Array<RaceModel>>([]);

onMounted(async () => {
  races.value = await raceService.list();
});
</script>
