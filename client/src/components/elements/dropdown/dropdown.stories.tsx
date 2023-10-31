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
    defaultValue: "Feature",
    ariaLabel: "Select Category",
    value: {
      option: "feature",
      name: "Feature",
    },
    onValueChange: (value) => {
      console.log(value);
    },
    values: [
      {
        option: "feature",
        name: "Feature",
      },
      {
        option: "ui",
        name: "UI",
      },
      {
        option: "ux",
        name: "UX",
      },
      {
        option: "enhancement",
        name: "Enhancement",
      },
      {
        option: "bug",
        name: "Bug",
      },
    ],
  },
};
