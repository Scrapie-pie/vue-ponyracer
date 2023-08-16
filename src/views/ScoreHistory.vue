<template>
  <div>
    <h1>{{ t('score.title') }}</h1>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { Chart, Filler, Legend, LinearScale, LineController, LineElement, PointElement, TimeScale, Tooltip } from 'chart.js';
import 'chartjs-adapter-date-fns';

import { useUserStore } from '@/composables/UserStore';
import { useChartService } from '@/composables/ChartService';
import { useTypedI18n } from '@/composables/TypedI18n';

Chart.register(LineController, LinearScale, TimeScale, PointElement, LineElement, Legend, Filler, Tooltip);

const chart = ref<HTMLCanvasElement | null>(null);

const { t, locale } = useTypedI18n();

const userStore = useUserStore();
const chartService = useChartService();
const history = await userStore.getScoreHistory();
const data = chartService.getData(history, t('score.title'));
const options = chartService.getOptions(locale.value);
let chartInstance: Chart | null = null;

onMounted(() => {
  chartInstance = new Chart(chart.value!, { type: 'line', data, options });
});

watch(
  () => locale.value,
  () => {
    if (chartInstance) {
      chartInstance.data = chartService.getData(history, t('score.title'));
      chartInstance.options = chartService.getOptions(locale.value);
      chartInstance.update();
    }
  }
);
</script>
