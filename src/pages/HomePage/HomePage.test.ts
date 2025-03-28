import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HomePage from '@/pages/HomePage/HomePage.vue';

describe('<HomePage />', () => {
  test('renders heading', () => {
    const wrapper = mount(HomePage);
    expect(wrapper.find('h1').text()).toBe('Zyrcode');
  });
});
