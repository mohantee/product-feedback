import { Meta, StoryObj } from "@storybook/react";
import { UpvoteButton } from "./upvote-button";
import { FaChevronUp } from "react-icons/fa";
import "./upvote-button.css";

const meta: Meta<typeof UpvoteButton> = {
  tags: ["autodocs"],
  title: "Design System/UpvoteButton",
  component: UpvoteButton,
};

export default meta;

type Story = StoryObj<typeof UpvoteButton>;

export const Primary: Story = {
  args: {
    text: "99",
    isPressed: true,
    icon: <FaChevronUp />,
  },
};
