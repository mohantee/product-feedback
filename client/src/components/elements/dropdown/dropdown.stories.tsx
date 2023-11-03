import { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from ".";

const meta: Meta<typeof Dropdown> = {
  title: "Design System/Elements/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    ariaLabel: "Select Category",
    value: "Bug",
    onValueChange: (value) => {
      console.log(value);
    },
    values: ["All", "UI", "UX", "Feature", "Enhancement", "Bug"],
  },
};
