import { describe, expect, MockedObject, test, vi } from 'vitest';
import { defineComponent } from 'vue';
import { flushPromises, mount } from '@vue/test-utils';
import { createVitestPinia } from '@/__tests__/pinia';
import i18n from '@/i18n';
import { useUserStore } from '@/composables/UserStore';
import ScoreHistory from '../ScoreHistory.vue';

const mockChartService = {
  getData: vi.fn(),
  getOptions: vi.fn()
};
vi.mock('@/composables/ChartService', () => ({
  useChartService: () => mockChartService
}));

const pinia = createVitestPinia();

const userStore = useUserStore() as MockedObject<ReturnType<typeof useUserStore>>;
userStore.getScoreHistory.mockResolvedValue([]);

const AsyncWrapper = defineComponent({
  components: { ScoreHistory },
  template: `
  <Suspense>
    <ScoreHistory/>
  </Suspense>`
});

async function scoreHistoryWrapper() {
  const wrapper = mount(AsyncWrapper, {
    global: {
      plugins: [i18n, pinia]
    }
  });
  i18n.global.locale.value = 'en';
  await flushPromises();
  return wrapper;
}

describe('ScoreHistory.vue', () => {
  test('should render the score history', async () => {
    const wrapper = await scoreHistoryWrapper();

    expect(wrapper.get('h1').text()).toBe('Score history');
    // You need a `<canvas>` element to render the chart
    expect(wrapper.get('canvas')).not.toBeNull();

    // You need to call `getScoreHistory()` on mount
    expect(userStore.getScoreHistory).toHaveBeenCalled();
  });

  test('should display texts in French', async () => {
    const wrapper = await scoreHistoryWrapper();

    expect(mockChartService.getData).toHaveBeenCalledWith([], 'Score history');
    expect(mockChartService.getOptions).toHaveBeenCalledWith('en');
    expect(wrapper.get('h1').text()).toBe('Score history');

    // Switch the locale
    i18n.global.locale.value = 'fr';
    await flushPromises();

    expect(mockChartService.getData).toHaveBeenCalledWith([], 'Historique du score');
    expect(mockChartService.getOptions).toHaveBeenCalledWith('fr');
    // The title should now be in French
    expect(wrapper.get('h1').text()).toBe('Historique du score');
  });
});
