import type { Meta, StoryObj } from '@storybook/vue3';
import InputTitle from './input-title.vue';

const meta = {
  title: 'Common/InputTitle',
  component: InputTitle,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof InputTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: 'Hello, World!',
    'onUpdate:modelValue': (value) => {
      console.log('Updated value:', value);
    },
    placeholder: 'Enter title',
    autoFocus: true,
    class: 'max-w-96',
  },
};
