import { cva } from "class-variance-authority";
import { cn } from "cn";
const announcementBarBase = cn("py-4");
const announcementBarConfig = {
  variants: {
    theme: {
      light: "bg-background text-foreground",
      dark: "bg-foreground text-background",
      gray: "bg-muted text-foreground",
    },
  },
  compoundVariants: [],
  defaultVariants: { theme: "light" },
} as const;
export const announcementBarCva = cva(announcementBarBase, {
  ...announcementBarConfig,
  compoundVariants: [...announcementBarConfig.compoundVariants],
});
export const ANNOUNCEMENT_BAR_THEMES = Object.keys(
  announcementBarConfig.variants.theme,
) as (keyof typeof announcementBarConfig.variants.theme)[];
export const announcementBarVariants = announcementBarCva;
