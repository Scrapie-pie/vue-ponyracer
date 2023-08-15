import { createWebHistory, createRouter, RouteLocationNormalized } from 'vue-router';
import Home from '@/views/Home.vue';
const Races = () => import('@/views/Races.vue');
const PendingRaces = () => import('@/views/PendingRaces.vue');
const FinishedRaces = () => import('@/views/FinishedRaces.vue');
const Bet = () => import('@/views/Bet.vue');
const Live = () => import('@/views/Live.vue');
const Register = () => import('@/views/Register.vue');
const Login = () => import('@/views/Login.vue');
const ScoreHistory = () => import('@/views/ScoreHistory.vue');
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
      component: Races,
      children: [
        {
          path: '',
          name: 'races',
          redirect: {
            name: 'pendingRaces'
          }
        },
        {
          path: 'pending',
          name: 'pendingRaces',
          component: PendingRaces
        },
        {
          path: 'finished',
          name: 'finishedRaces',
          component: FinishedRaces
        }
      ]
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
    },
    {
      path: '/score-history',
      name: 'score',
      component: ScoreHistory
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
