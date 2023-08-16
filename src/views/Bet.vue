<template>
  <h1>{{ raceModel.name }}</h1>
  <p>{{ startInstant }}</p>
  <RouterLink :to="{ name: 'live', params: { raceId: raceModel.id } }" class="btn btn-large btn-primary">{{ t('bet.watch') }}</RouterLink>
  <Alert class="mt-2" v-if="betFailed" variant="danger" dismissible @dismissed="betFailed = false">{{ t('bet.failed') }}</Alert>
  <div class="row">
    <div class="col" v-for="pony of raceModel.ponies" :key="pony.id" :class="{ selected: isPonySelected(pony) }">
      <Pony :ponyModel="pony" @ponySelected="placeOrCancelBet(pony)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import Pony from '@/components/Pony.vue';
import fromNow from '@/utils/FromNow';
import { RaceModel } from '@/models/RaceModel';
import { PonyModel } from '@/models/PonyModel';
import { useRaceService } from '@/composables/RaceService';
import { useTypedI18n } from '@/composables/TypedI18n';

const { t, locale } = useTypedI18n();

const route = useRoute();
const raceId = +route.params.raceId;

const raceService = useRaceService();
const raceModel = ref<RaceModel>(await raceService.get(raceId));

const startInstant = computed(() => fromNow(raceModel.value!.startInstant, locale.value));

function isPonySelected(pony: PonyModel): boolean {
  return pony.id === raceModel.value.betPonyId;
}

const betFailed = ref(false);
async function placeOrCancelBet(pony: PonyModel) {
  betFailed.value = false;
  try {
    if (!isPonySelected(pony)) {
      raceModel.value = await raceService.bet(raceId, pony.id);
    } else {
      await raceService.cancelBet(raceId);
      raceModel.value.betPonyId = null;
    }
  } catch (e) {
    betFailed.value = true;
  }
}
</script>

<style scoped>
.selected {
  border: 3px solid green;
  border-radius: 10px;
}
</style>
