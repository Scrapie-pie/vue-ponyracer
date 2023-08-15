import { createWebHistory, createRouter, RouteLocationNormalized } from 'vue-router';
import Home from '@/views/Home.vue';
import Races from '@/views/Races.vue';
import Bet from '@/views/Bet.vue';
import Live from '@/views/Live.vue';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import { useUserStore } from '@/composables/UserStore';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/races',
      name: 'races',
      component: Races
    },
    {
      path: '/races/:raceId',
      name: 'bet',
      component: Bet
    },
    {
      path: '/races/:raceId/live',
      name: 'live',
      component: Live
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
});

router.beforeEach((to: RouteLocationNormalized) => {
  if (to.name === 'home' || to.name === 'login' || to.name === 'register') {
    return true;
  }
  const userStore = useUserStore();
  // we navigate only if the user is logged in
  if (userStore.userModel) {
    return true;
  }
  // otherwise, we redirect to the home page
  return '/';
});

export default router;
