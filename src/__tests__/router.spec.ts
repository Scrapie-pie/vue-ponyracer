import { beforeEach, describe, expect, test } from 'vitest';
import { setActivePinia } from 'pinia';
import { createVitestPinia } from './pinia';
import router from '@/router';
import { UserModel } from '@/models/UserModel';
import { useUserStore } from '@/composables/UserStore';

describe('Router', () => {
  beforeEach(() => {
    setActivePinia(createVitestPinia());
  });

  test('should not allow to navigate if user is not logged in', async () => {
    const userStore = useUserStore();
    userStore.userModel = null;
    await router.push('/races');

    // You can directly return '/'
    expect(router.currentRoute.value.path).toBe('/');

    await router.push('/races/1');

    // You can directly return '/'
    expect(router.currentRoute.value.path).toBe('/');

    await router.push('/races/1/live');

    // You can directly return '/'
    expect(router.currentRoute.value.path).toBe('/');
  });

  test('should allow to navigate if user is logged in', async () => {
    const userStore = useUserStore();
    userStore.userModel = { login: 'cedric' } as UserModel;
    await router.push('/races');

    // You can either return true or undefined to allow the navigation
    expect(router.currentRoute.value.path).toBe('/races/pending');

    await router.push('/races/1');

    // You can either return true or undefined to allow the navigation
    expect(router.currentRoute.value.path).toBe('/races/1');

    await router.push('/races/1/live');

    // You can either return true or undefined to allow the navigation
    expect(router.currentRoute.value.path).toBe('/races/1/live');

    await router.push('/races/pending');

    // You can either return true or undefined to allow the navigation
    expect(router.currentRoute.value.path).toBe('/races/pending');

    await router.push('/races/finished');

    // You can either return true or undefined to allow the navigation
    expect(router.currentRoute.value.path).toBe('/races/finished');

    await router.push('/score-history');

    // You can either return true or undefined to allow the navigation
    expect(router.currentRoute.value.path).toBe('/score-history');
  });

  test('should allow to navigate if navigating to home, login or register anonymously', async () => {
    const userStore = useUserStore();
    userStore.userModel = null;
    await router.push('/');

    // You can either return true or undefined to allow the navigation
    expect(router.currentRoute.value.path).toBe('/');

    await router.push('/login');

    // You can either return true or undefined to allow the navigation
    expect(router.currentRoute.value.path).toBe('/login');

    await router.push('/register');

    // You can either return true or undefined to allow the navigation
    expect(router.currentRoute.value.path).toBe('/register');
  });
});
