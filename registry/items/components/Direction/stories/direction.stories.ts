import type { Meta, StoryObj } from "@storybook/vue3";
import { defineComponent, h, ref } from "vue";
import { ConfigProvider, injectConfigProviderContext } from "reka-ui";
import { expect, userEvent, within } from "storybook/test";
import { DirectionProvider, useDirection, type DirectionProviderProps } from "..";

const DirectionProbe = defineComponent({
  setup() {
    const direction = useDirection();
    return () => h("output", { "aria-label": "Reading direction" }, direction.value);
  },
});

const meta = {
  title: "Components/Direction",
  component: DirectionProvider,
  tags: ["autodocs"],
  args: { direction: "rtl" },
  render: (args) => ({
    components: { DirectionProvider, DirectionProbe },
    setup: () => ({ args }),
    template: /* html */ `<DirectionProvider v-bind="args"><div :dir="args.direction" class="rounded-lg border p-6"><p>مرحبا بالعالم</p><DirectionProbe /></div></DirectionProvider>`,
  }),
} satisfies Meta<DirectionProviderProps>;
export default meta;
type Story = StoryObj<typeof meta>;

export const RightToLeft: Story = {
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByLabelText("Reading direction")).toHaveTextContent(
      "rtl",
    );
  },
};
export const LeftToRight: Story = {
  args: { direction: "ltr" },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByLabelText("Reading direction")).toHaveTextContent(
      "ltr",
    );
  },
};

const InheritedConfigProbe = defineComponent({
  setup() {
    const context = injectConfigProviderContext();
    const direction = useDirection();
    return () =>
      h(
        "output",
        { "aria-label": "Inherited configuration" },
        JSON.stringify({
          direction: direction.value,
          locale: context.locale?.value,
          scrollBody: context.scrollBody?.value,
          nonce: context.nonce?.value,
          teleportTo: context.teleportTo?.value,
          id: context.useId?.(),
        }),
      );
  },
});

export const PreservesParentConfiguration: Story = {
  render: () => ({
    components: { ConfigProvider, DirectionProvider, InheritedConfigProbe },
    setup: () => ({ locale: ref("fr-FR"), stableId: () => "provided-id" }),
    template: /* html */ `<ConfigProvider :locale="locale" :scroll-body="false" nonce="test-nonce" teleport-to="#portal" :use-id="stableId"><DirectionProvider direction="rtl"><InheritedConfigProbe /><button type="button" @click="locale = 'ar-SA'">Change locale</button></DirectionProvider></ConfigProvider>`,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const result = () =>
      JSON.parse(canvas.getByLabelText("Inherited configuration").textContent ?? "{}");
    await expect(result()).toEqual({
      direction: "rtl",
      locale: "fr-FR",
      scrollBody: false,
      nonce: "test-nonce",
      teleportTo: "#portal",
      id: "provided-id",
    });
    await userEvent.click(canvas.getByRole("button", { name: "Change locale" }));
    await expect(result().locale).toBe("ar-SA");
  },
};
