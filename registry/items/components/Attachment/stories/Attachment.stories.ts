import type { Meta, StoryObj } from "@storybook/vue3-vite";
import {
  CheckIcon,
  ClockIcon,
  FileCodeIcon,
  FileTextIcon,
  FileWarningIcon,
  RefreshCwIcon,
  TableIcon,
  XIcon,
} from "@lucide/vue";
import StorybookWrapper from "@registry/utility/StorybookWrapper.vue";
import Spinner from "@registry/components/Spinner/Spinner.vue";
import Attachment from "@registry/components/Attachment/Attachment.vue";
import AttachmentAction from "../AttachmentAction.vue";
import AttachmentActions from "@registry/components/Attachment/AttachmentActions.vue";
import AttachmentContent from "@registry/components/Attachment/AttachmentContent.vue";
import AttachmentDescription from "@registry/components/Attachment/AttachmentDescription.vue";
import AttachmentGroup from "@registry/components/Attachment/AttachmentGroup.vue";
import AttachmentMedia from "@registry/components/Attachment/AttachmentMedia.vue";
import AttachmentTitle from "@registry/components/Attachment/AttachmentTitle.vue";
import AttachmentTrigger from "@registry/components/Attachment/AttachmentTrigger.vue";

const images = [
  {
    name: "workspace.png",
    meta: "PNG · 820 KB",
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80",
    alt: "Workspace",
  },
  {
    name: "desk-reference.jpg",
    meta: "JPG · 1.1 MB",
    src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80",
    alt: "Desk",
  },
  {
    name: "office-reference.jpg",
    meta: "JPG · 940 KB",
    src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80",
    alt: "Office",
  },
];

const attachmentParts = {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
  Spinner,
  FileCodeIcon,
  FileTextIcon,
  FileWarningIcon,
  CheckIcon,
  ClockIcon,
  RefreshCwIcon,
  TableIcon,
  XIcon,
};

const meta = {
  title: "Components/Attachment",
  tags: ["autodocs"],
  component: Attachment,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    () => ({
      components: { StorybookWrapper },
      template: /* html */ `<StorybookWrapper class='w-full max-w-sm px-4'><story /></StorybookWrapper>`,
    }),
  ],
  argTypes: {
    state: {
      control: "select",
      options: ["idle", "uploading", "processing", "error", "done"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "xs"],
    },
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
  },
  args: {
    state: "done",
    size: "default",
    orientation: "horizontal",
  },
} satisfies Meta<typeof Attachment>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default file attachment with remove action, matching the docs usage example. */
export const Default: Story = {
  render: (args) => ({
    components: attachmentParts,
    setup: () => ({ args }),
    template: /* html */ `
      <Attachment v-bind="args" class="w-full">
        <AttachmentMedia>
          <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
          <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove sales-dashboard.pdf">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    `,
  }),
};

/** Vertical image cards in a scrollable group. */
export const Image: Story = {
  render: () => ({
    components: attachmentParts,
    setup: () => ({ images }),
    template: /* html */ `
      <AttachmentGroup class="w-full">
        <Attachment
          v-for="image in images"
          :key="image.name"
          orientation="vertical"
        >
          <AttachmentMedia variant="image">
            <img :src="image.src" :alt="image.alt" />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{{ image.name }}</AttachmentTitle>
            <AttachmentDescription>{{ image.meta }}</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction :aria-label="\`Remove \${image.name}\`">
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
          <AttachmentTrigger as-child>
            <a
              :href="image.src"
              target="_blank"
              rel="noreferrer"
              :aria-label="\`Open \${image.name}\`"
            />
          </AttachmentTrigger>
        </Attachment>
      </AttachmentGroup>
    `,
  }),
};

/** Upload lifecycle states with shimmer on in-progress titles. */
export const States: Story = {
  render: () => ({
    components: attachmentParts,
    template: /* html */ `
      <div class="flex w-full flex-col gap-2">
        <Attachment state="idle" class="w-full">
          <AttachmentMedia>
            <ClockIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>selected-file.pdf</AttachmentTitle>
            <AttachmentDescription>Ready to upload</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Remove selected-file.pdf">
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
        <Attachment state="uploading" class="w-full">
          <AttachmentMedia>
            <Spinner />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>design-system.zip</AttachmentTitle>
            <AttachmentDescription>Uploading · 64%</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Cancel upload">
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
        <Attachment state="processing" class="w-full">
          <AttachmentMedia>
            <FileTextIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>market-research.pdf</AttachmentTitle>
            <AttachmentDescription>Processing document</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Remove market-research.pdf">
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
        <Attachment state="error" class="w-full">
          <AttachmentMedia>
            <FileWarningIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>financial-model.xlsx</AttachmentTitle>
            <AttachmentDescription>Upload failed. Try again.</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Retry upload">
              <RefreshCwIcon />
            </AttachmentAction>
            <AttachmentAction aria-label="Remove financial-model.xlsx">
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
        <Attachment state="done" class="w-full">
          <AttachmentMedia>
            <CheckIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>uploaded-report.pdf</AttachmentTitle>
            <AttachmentDescription>Uploaded · 1.8 MB</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Remove uploaded-report.pdf">
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      </div>
    `,
  }),
};

/** Size variants from default down to xs. */
export const Sizes: Story = {
  render: () => ({
    components: attachmentParts,
    template: /* html */ `
      <div class="flex w-full flex-col gap-3">
        <Attachment size="default" class="w-full">
          <AttachmentMedia>
            <FileTextIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>Default attachment</AttachmentTitle>
            <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
        <Attachment size="sm" class="w-full">
          <AttachmentMedia>
            <FileTextIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>Small attachment</AttachmentTitle>
            <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
        <Attachment size="xs" class="w-full">
          <AttachmentMedia>
            <FileTextIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>Extra small attachment</AttachmentTitle>
          </AttachmentContent>
        </Attachment>
      </div>
    `,
  }),
};

/** Horizontally scrollable mixed file and image group. */
export const Group: Story = {
  render: () => ({
    components: attachmentParts,
    setup: () => ({
      items: [
        { name: "briefing-notes.pdf", meta: "PDF · 1.4 MB", icon: FileTextIcon },
        {
          name: "workspace.png",
          meta: "PNG · 820 KB",
          src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80",
        },
        { name: "customers.csv", meta: "CSV · 18 KB", icon: TableIcon },
        { name: "renderer.vue", meta: "Vue · 12 KB", icon: FileCodeIcon },
      ],
    }),
    template: /* html */ `
      <AttachmentGroup class="w-full">
        <Attachment v-for="item in items" :key="item.name" class="w-64">
          <AttachmentMedia v-if="item.src" variant="image">
            <img :src="item.src" :alt="item.name" />
          </AttachmentMedia>
          <AttachmentMedia v-else>
            <component :is="item.icon" />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{{ item.name }}</AttachmentTitle>
            <AttachmentDescription>{{ item.meta }}</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction :aria-label="\`Remove \${item.name}\`">
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      </AttachmentGroup>
    `,
  }),
};

/** Full-card trigger that opens a link while actions stay clickable. */
export const Trigger: Story = {
  render: () => ({
    components: attachmentParts,
    template: /* html */ `
      <Attachment class="w-full">
        <AttachmentMedia>
          <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>research-summary.pdf</AttachmentTitle>
          <AttachmentDescription>Open attachment preview</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove research-summary.pdf">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
        <AttachmentTrigger as-child>
          <a
            href="https://www.shadcn-vue.com/docs/components/attachment"
            target="_blank"
            rel="noreferrer"
            aria-label="Preview research-summary.pdf"
          />
        </AttachmentTrigger>
      </Attachment>
    `,
  }),
};
