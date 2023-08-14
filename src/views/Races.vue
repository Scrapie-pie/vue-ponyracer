<template>
  <div>
    <div class="alert alert-danger" v-if="error">
      An error occurred while loading.
      <button type="button" class="btn-close" aria-label="Close" @click="error = false"></button>
    </div>
    <Race v-for="race in races" :key="race.id" :raceModel="race" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RaceModel } from '@/models/RaceModel';
import Race from '@/components/Race.vue';
import { useRaceService } from '@/composables/RaceService';

const races = ref<Array<RaceModel>>([]);
const error = ref(false);
const raceService = useRaceService();
onMounted(async () => {
  try {
    races.value = await raceService.list();
  } catch (e) {
    error.value = true;
  }
});
</script>
