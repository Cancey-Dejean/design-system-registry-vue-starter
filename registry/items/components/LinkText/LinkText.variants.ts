import { cn } from "cn";
import { cva } from "class-variance-authority";

const linkBase = cn(
  "inline-flex items-center gap-1 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
);

const linkConfig = {
  variants: {
    tone: {
      default: "text-primary hover:text-primary/80",
      muted: "text-muted-foreground hover:text-foreground",
      subtle: "text-neutral-500 hover:text-neutral-700",
      danger: "text-destructive hover:text-destructive/80",
    },
    underline: {
      none: "no-underline",
      hover: "no-underline hover:underline",
      always: "underline",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    tone: "default",
    underline: "hover",
    size: "md",
  },
} as const;

export const linkCva = cva(linkBase, {
  ...linkConfig,
  compoundVariants: [...linkConfig.compoundVariants],
});

export const LINK_SIZES = Object.keys(
  linkConfig.variants.size,
) as (keyof typeof linkConfig.variants.size)[];

export const LINK_TONES = Object.keys(
  linkConfig.variants.tone,
) as (keyof typeof linkConfig.variants.tone)[];

export const LINK_UNDERLINES = Object.keys(
  linkConfig.variants.underline,
) as (keyof typeof linkConfig.variants.underline)[];

export const linkVariants = linkCva;
