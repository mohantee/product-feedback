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
    status: "primary",
    name: "Post Reply",
    // icon: <IoChevronBack />,
    transition: "opacity",
  },
};

export const Secondary: Story = {
  args: {
    status: "secondary",
    name: "Cancel",
    transition: "opacity",
  },
};

export const Accent: Story = {
  args: {
    status: "accent",
    name: "Edit Feedback",
    transition: "opacity",
  },
};

export const Alert: Story = {
  args: {
    status: "alert",
    name: "Delete",
    transition: "opacity",
  },
};

export const GoBack: Story = {
  args: {
    status: "blank",
    name: "Go Back",
    transition: "underline",
    icon: <IoChevronBack />,
  },
};

export const GoBack2: Story = {
  args: {
    status: "secondary",
    name: "Go Back",
    transition: "underline",
    icon: <IoChevronBack />,
  },
};
