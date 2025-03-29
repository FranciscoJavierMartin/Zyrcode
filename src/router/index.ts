import { createRouter, createWebHistory } from 'vue-router';
import { ROUTES } from '@/router/routes';
import HomePage from '@/pages/HomePage/HomePage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      ...ROUTES.HOME,
      component: HomePage,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
});

export default router;
