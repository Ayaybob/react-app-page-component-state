import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { PageStateProvider } from "./pageState";

const meta: Meta = {
    component: PageStateProvider,
    title: "Marbella/AppState",
    argTypes: {},
};
export default meta;

type Story = StoryObj;

export const Primary: Story = (args) => (
    <PageStateProvider data-testId="InputField-id" {...args} />
);
Primary.args = {
    primary: true,
    disabled: false,
    text: "Primary",
};

export const Secondary: Story = (args) => (
    <PageStateProvider data-testId="InputField-id" {...args} />
);
Secondary.args = {
    primary: false,
    disabled: false,
    text: "Secondary",
};

export const Disabled: Story = (args) => (
    <PageStateProvider data-testId="InputField-id" {...args} />
);
Disabled.args = {
    primary: false,
    disabled: true,
    text: "Disabled",
};

export const Small: Story = (args) => (
    <PageStateProvider data-testId="InputField-id" {...args} />
);
Small.args = {
    primary: true,
    disabled: false,
    size: "small",
    text: "Small",
};

export const Medium: Story = (args) => (
    <PageStateProvider data-testId="InputField-id" {...args} />
);
Medium.args = {
    primary: true,
    disabled: false,
    size: "medium",
    text: "Medium",
};

export const Large: Story = (args) => (
    <PageStateProvider data-testId="InputField-id" {...args} />
);
Large.args = {
    primary: true,
    disabled: false,
    size: "large",
    text: "Large",
};