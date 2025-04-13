import type { Meta, StoryObj } from '@storybook/vue3';
import CodeCell from './code-cell.vue';

const meta = {
  title: 'Notebook/CodeCell',
  component: CodeCell,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof CodeCell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    code: '',
    id: 'a',
    language: 'javascript',
  },
};
