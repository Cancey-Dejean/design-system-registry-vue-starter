import type { VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "vue";
import type { heroSplitCva } from "./";

type HeroSplitVariantProps = VariantProps<typeof heroSplitCva>;

export type HeroSplitTheme = NonNullable<HeroSplitVariantProps["theme"]>;

export type CtaLink = {
  label: string;
  href: string;
};

export type CodeTab = {
  name: string;
  active?: boolean;
};

export type HeroSplitProps = {
  logoSrc?: string;
  logoDarkSrc?: string;
  logoAlt?: string;
  badge?: string;
  badgeHref?: string;
  announcement?: string;
  title: string;
  description?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  codeTabs?: CodeTab[];
  theme?: HeroSplitTheme;
  class?: HTMLAttributes["class"];
};
