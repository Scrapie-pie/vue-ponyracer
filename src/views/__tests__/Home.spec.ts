import { beforeEach, describe, expect, test } from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils';
import { nextTick } from 'vue';
import { createVitestPinia } from '@/__tests__/pinia';
import i18n from '@/i18n';
import Home from '@/views/Home.vue';
import { UserModel } from '@/models/UserModel';
import { useUserStore } from '@/composables/UserStore';

const pinia = createVitestPinia();
async function homeWrapper() {
  const wrapper = mount(Home, {
    global: {
      plugins: [pinia, i18n],
      stubs: {
        RouterLink: RouterLinkStub
      }
    }
  });
  i18n.global.locale.value = 'en';
  await nextTick();
  return wrapper;
}

describe('Home.vue', () => {
  beforeEach(() => {
    const userStore = useUserStore();
    userStore.userModel = null;
  });

  test('should display every race name in a title', async () => {
    const wrapper = await homeWrapper();

    // You should have an `h1` element to display the title
    const title = wrapper.get('h1');
    expect(title.text()).toContain('Ponyracer');
    // You should have the `small` element inside the `h1` element
    expect(title.text()).toContain('Always a pleasure to bet on ponies');

    // You should have a `small` element to display the subtitle
    const subtitle = wrapper.get('small');
    expect(subtitle.text()).toBe('Always a pleasure to bet on ponies');
  });

  test('display a link to go the login', async () => {
    const wrapper = await homeWrapper();

    // You should have an `a` element to display the link to the login page
    const link = wrapper.getComponent(RouterLinkStub);
    // The link should have a text
    expect(link.text()).toBe('Login');
    // The URL of the link is not correct.
    // Maybe you forgot to use `<RouterLink to="/login">` or `<RouterLink :to="{ name: 'login' }">`?
    expect(link.props().to?.name || link.props().to).toContain('login');
  });

  test('display a link to go the register page', async () => {
    const wrapper = await homeWrapper();

    const link = wrapper.findAllComponents(RouterLinkStub)[1];
    // You should have an `a` element to display the link to the register page
    expect(link.exists()).toBe(true);
    // The link should have a text
    expect(link.text()).toBe('Register');
    // The URL of the link is not correct.
    // Maybe you forgot to use `<RouterLink to="/register">` or `<RouterLink :to="{ name: 'register' }">`?
    expect(link.props().to?.name || link.props().to).toContain('register');
  });

  test('display a link to go the races page if the user is logged in', async () => {
    const wrapper = await homeWrapper();

    // if the user is logged in
    const userStore = useUserStore();
    userStore.userModel = {
      login: 'cedric',
      money: 200,
      birthYear: 1986,
      password: ''
    } as UserModel;
    await nextTick();

    const links = wrapper.findAllComponents(RouterLinkStub);
    // You should have only one link to the races when user is logged in
    expect(links).toHaveLength(1);
    const link = links[0];
    // You should have an `a` element to display the link to the races page
    expect(link.exists()).toBe(true);
    // The link should have a text
    expect(link.text()).toBe('Races');
    // The URL of the link is not correct.
    // Maybe you forgot to use `<RouterLink to="/races">` or `<RouterLink :to="{ name: 'races' }">`?
    expect(link.props().to?.name || link.props().to).toContain('races');
  });

  test('display texts in French', async () => {
    const wrapper = await homeWrapper();
    i18n.global.locale.value = 'fr';
    await nextTick();

    const title = wrapper.get('h1');
    expect(title.text()).toContain('Ponyracer');
    const tagline = wrapper.get('small');
    expect(tagline.text()).toContain('Toujours un plaisir de parier sur des poneys');
    const links = wrapper.findAllComponents(RouterLinkStub);
    expect(links[0].text()).toBe('Se connecter');
    expect(links[1].text()).toBe("S'enregistrer");

    const userStore = useUserStore();
    userStore.userModel = {} as UserModel;
    await nextTick();
    expect(wrapper.findComponent(RouterLinkStub).text()).toBe('Courses');
  });
});
