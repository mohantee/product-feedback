import { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { IoChevronBack } from "react-icons/io5";

const meta: Meta<typeof Button> = {
  title: "Design System/Elements/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    type: "primary",
    name: "Post Reply",
    // icon: <IoChevronBack />,
    transition: "opacity",
  },
};

export const Secondary: Story = {
  args: {
    type: "secondary",
    name: "Cancel",
    transition: "opacity",
  },
};

export const Accent: Story = {
  args: {
    type: "accent",
    name: "Edit Feedback",
    transition: "opacity",
  },
};

export const Alert: Story = {
  args: {
    type: "alert",
    name: "Delete",
    transition: "opacity",
  },
};

export const GoBack: Story = {
  args: {
    type: "blank",
    name: "Go Back",
    transition: "underline",
    icon: <IoChevronBack />,
  },
};

export const GoBack2: Story = {
  args: {
    type: "secondary",
    name: "Go Back",
    transition: "underline",
    icon: <IoChevronBack />,
  },
};
