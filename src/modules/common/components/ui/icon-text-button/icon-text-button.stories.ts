import type { Meta, StoryObj } from '@storybook/vue3';
import IconTextButton from './icon-text-button.vue';

const meta = {
  title: 'Common/UI/IconTextButton',
  component: IconTextButton,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof IconTextButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Toggle console',
  },
};
