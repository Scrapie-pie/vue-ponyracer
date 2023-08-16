import { describe, expect, test } from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils';
import { nextTick } from 'vue';
import Races from '@/views/Races.vue';
import i18n from '@/i18n';

async function racesWrapper() {
  const wrapper = mount(Races, {
    global: {
      plugins: [i18n],
      stubs: {
        RouterView: { template: 'view' },
        RouterLink: RouterLinkStub
      }
    }
  });
  i18n.global.locale.value = 'en';
  await nextTick();
  return wrapper;
}

describe('Races.vue', () => {
  test('should display two tabs', async () => {
    const wrapper = await racesWrapper();

    // You should have a `RouterLink` per tabs
    const links = wrapper.findAllComponents(RouterLinkStub);
    expect(links).toHaveLength(2);
    expect(links[0].text()).toBe('Pending races');
    expect(links[1].text()).toBe('Finished races');
  });

  test('should display texts in French', async () => {
    const wrapper = await racesWrapper();
    i18n.global.locale.value = 'fr';
    await nextTick();

    expect(wrapper.get('h1').text()).toBe('Courses');
    const links = wrapper.findAllComponents(RouterLinkStub);
    expect(links[0].text()).toBe('Prochaines courses');
    expect(links[1].text()).toBe('Courses terminées');
  });
});
