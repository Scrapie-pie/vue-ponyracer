import { describe, expect, test, vi } from 'vitest';
import { flushPromises, mount, RouterLinkStub } from '@vue/test-utils';
import { defineComponent } from 'vue';
import FinishedRaces from '@/views/FinishedRaces.vue';
import Race from '@/components/Race.vue';
import { RaceModel } from '@/models/RaceModel';
import i18n from '@/i18n';

const mockRaceService = {
  list: vi.fn()
};
vi.mock('@/composables/RaceService', () => ({
  useRaceService: () => mockRaceService
}));

const AsyncWrapper = defineComponent({
  components: { FinishedRaces },
  template: `<Suspense><FinishedRaces/></Suspense>`
});

describe('FinishedRaces.vue', () => {
  test('should display every race name in a title', async () => {
    mockRaceService.list.mockResolvedValue([
      { name: 'London', startInstant: '2020-02-18T08:02:00Z' },
      { name: 'New York', startInstant: '2020-02-18T08:03:00Z' }
    ] as Array<RaceModel>);
    const asyncWrapper = mount(AsyncWrapper, {
      global: {
        plugins: [i18n],
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });
    await flushPromises();

    expect(mockRaceService.list).toHaveBeenCalledWith('FINISHED');

    const wrapper = asyncWrapper.findComponent(FinishedRaces);
    const raceComponents = wrapper.findAllComponents(Race);
    // You should have a `Race` component per race in your template
    expect(raceComponents).toHaveLength(2);

    // You should have no `RouterLink` to go to the bet page
    const links = asyncWrapper.findAllComponents(RouterLinkStub);
    expect(links).toHaveLength(0);
  });
});
