import { Meta, StoryObj } from "@storybook/react";
import { Label } from "./label";

const meta: Meta<typeof Label> = {
  title: "Design System/Form/Label",
  component: Label,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Primary: Story = {
  args: {
    primaryText: "Category",
    helperText: "Choose a category for your feedback",
    htmlFor: "feature",
  },
};
