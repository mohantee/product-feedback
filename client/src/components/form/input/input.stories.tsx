import { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "Design System/Form/Input",
  component: Input,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: {
    value: "Feature",
    id: "feature",
  },
};
