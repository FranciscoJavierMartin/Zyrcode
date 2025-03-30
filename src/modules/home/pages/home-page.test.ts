import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HomePage from '@/modules/home/pages/home-page.vue';
import i18n from '@/i18n';

describe('<HomePage />', () => {
  test('renders heading', () => {
    const wrapper = mount(HomePage, {
      global: {
        plugins: [i18n],
      },
    });
    expect(wrapper.find('h1').text()).toBe('Zyrcode');
    expect(wrapper.find('h2').text()).toBe('Hello, world!');
  });
});
