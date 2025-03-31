import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HomePage from '@/modules/home/pages/home-page.vue';
import i18n from '@/i18n';
import router from '@/router';

describe('<HomePage />', () => {
  test('renders header', () => {
    const wrapper = mount(HomePage, {
      global: {
        plugins: [i18n, router],
      },
    });
    expect(wrapper.find('h1').text()).toBe('Zyrcode');
    expect(wrapper.find('.quote-typing').text()).contains(
      'Where Code Meets Creativity.',
    );
    const createNotebookButton = wrapper.find('a');
    expect(createNotebookButton.attributes('href')).toBe('/notebook');
    expect(createNotebookButton.text()).toBe('Create notebook');
  });
});
