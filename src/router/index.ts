import { createRouter, createWebHistory } from 'vue-router';
import { ROUTES } from '@/router/routes';
import HomePage from '@/modules/home/pages/home-page.vue';
import NotebookPage from '@/modules/notebook/pages/notebook-page.vue';
import SettingsPage from '@/modules/settings/pages/settings-page.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      ...ROUTES.HOME,
      component: HomePage,
    },
    {
      ...ROUTES.NOTEBOOK,
      component: NotebookPage,
    },
    {
      ...ROUTES.SETTINGS,
      component: SettingsPage,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
});

export default router;
