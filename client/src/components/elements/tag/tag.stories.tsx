import { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./tag";

const meta: Meta<typeof Tag> = {
  title: "Design System/Elements/Tag",
  component: Tag,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    isPressed: false,
    text: "Enhancement",
  },
};

export const Pressed: Story = {
  args: {
    isPressed: true,
    text: "Enhancement",
  },
};
