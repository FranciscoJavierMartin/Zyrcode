import type { Meta, StoryObj } from '@storybook/vue3';
import HomePage from './home-page.vue';

const meta = {
  title: 'Pages/Home',
  component: HomePage,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof HomePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
