import { setup, type Preview } from '@storybook/vue3';
import i18n from '@/i18n';
import router from '@/router';
import '@/assets/styles.css';

setup((app) => {
  app.use(i18n);
  app.use(router);
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
