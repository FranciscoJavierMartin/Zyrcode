import type { Meta, StoryObj } from '@storybook/vue3';
import Button from './my-button.vue';

const meta = {
  title: 'Common/UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
