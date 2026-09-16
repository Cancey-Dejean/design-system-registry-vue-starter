import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const attachmentBase = cn(
  "group/attachment relative flex w-fit max-w-full min-w-0 shrink-0 flex-wrap rounded-xl border bg-card text-card-foreground transition-colors focus-within:ring-1 focus-within:ring-ring/50 has-[>a,>button]:hover:bg-muted/50 data-[state=error]:border-destructive/30 data-[state=idle]:border-dashed",
);

const attachmentConfig = {
  variants: {
    size: {
      default:
        "gap-2 text-sm has-data-[slot=attachment-content]:px-2.5 has-data-[slot=attachment-content]:py-2 has-data-[slot=attachment-media]:p-2",
      sm: "gap-2.5 text-xs has-data-[slot=attachment-content]:px-2 has-data-[slot=attachment-content]:py-1.5 has-data-[slot=attachment-media]:p-1.5",
      xs: "gap-1.5 rounded-lg text-xs has-data-[slot=attachment-content]:px-1.5 has-data-[slot=attachment-content]:py-1 has-data-[slot=attachment-media]:p-1",
    },
    orientation: {
      horizontal: "min-w-40 items-center",
      vertical: "w-24 flex-col has-data-[slot=attachment-content]:w-30",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    size: "default",
    orientation: "horizontal",
  },
} as const;

export const attachmentCva = cva(attachmentBase, {
  ...attachmentConfig,
  compoundVariants: [...attachmentConfig.compoundVariants],
});

export type AttachmentVariants = VariantProps<typeof attachmentCva>;

export const ATTACHMENT_SIZES = Object.keys(
  attachmentConfig.variants.size,
) as (keyof typeof attachmentConfig.variants.size)[];

export const ATTACHMENT_ORIENTATIONS = Object.keys(
  attachmentConfig.variants.orientation,
) as (keyof typeof attachmentConfig.variants.orientation)[];

export const attachmentVariants = attachmentCva;

const attachmentMediaBase = cn(
  "relative flex aspect-square w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted text-foreground group-data-[size=sm]/attachment:w-8 group-data-[size=xs]/attachment:w-7 group-data-[size=xs]/attachment:rounded-md [&_svg:not([class*='size-'])]:size-4 group-data-[size=xs]/attachment:[&_svg:not([class*='size-'])]:size-3.5 group-data-[orientation=vertical]/attachment:w-full group-data-[orientation=vertical]/attachment:[&_svg:not([class*='size-'])]:size-6 group-data-[orientation=vertical]/attachment:*:data-[slot=spinner]:size-6! group-data-[state=error]/attachment:bg-destructive/10 group-data-[state=error]/attachment:text-destructive [&_svg]:pointer-events-none",
);

const attachmentMediaConfig = {
  variants: {
    variant: {
      icon: "",
      image:
        "opacity-60 group-data-[state=idle]/attachment:opacity-100 group-data-[state=done]/attachment:opacity-100 *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    variant: "icon",
  },
} as const;

export const attachmentMediaCva = cva(attachmentMediaBase, {
  ...attachmentMediaConfig,
  compoundVariants: [...attachmentMediaConfig.compoundVariants],
});

export type AttachmentMediaVariants = VariantProps<typeof attachmentMediaCva>;

export const ATTACHMENT_MEDIA_VARIANTS = Object.keys(
  attachmentMediaConfig.variants.variant,
) as (keyof typeof attachmentMediaConfig.variants.variant)[];

export const attachmentMediaVariants = attachmentMediaCva;
