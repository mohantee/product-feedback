import { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "./text-area";

const meta: Meta<typeof TextArea> = {
  title: "Design System/Form/TextArea",
  component: TextArea,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Primary: Story = {
  args: {
    value: "Feature",
    id: "feature",
  },
};
