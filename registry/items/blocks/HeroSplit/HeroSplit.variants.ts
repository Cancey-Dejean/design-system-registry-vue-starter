import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const heroSplitConfig = {
  variants: {
    theme: {
      indigo: "",
      violet: "",
      blue: "",
      rose: "",
    },
  },
  defaultVariants: {
    theme: "indigo",
  },
} as const;

export const heroSplitCva = cva(cn("relative isolate overflow-hidden"), {
  ...heroSplitConfig,
  compoundVariants: [],
});

export const HERO_SPLIT_THEMES = Object.keys(
  heroSplitConfig.variants.theme,
) as (keyof typeof heroSplitConfig.variants.theme)[];

export const themeClasses: Record<
  keyof typeof heroSplitConfig.variants.theme,
  {
    sectionBg: string;
    skewBg: string;
    panel: string;
    panelAccent: string;
    badgeBg: string;
    badgeText: string;
    badgeRing: string;
    badgeBgDark: string;
    badgeTextDark: string;
    badgeRingDark: string;
    ctaBtn: string;
    ctaBtnHover: string;
    ctaBtnFocus: string;
    ctaBtnDark: string;
    ctaBtnHoverDark: string;
    ctaBtnFocusDark: string;
  }
> = {
  indigo: {
    sectionBg: "from-indigo-100/20 dark:from-indigo-950/10",
    skewBg: "shadow-indigo-600/10 ring-indigo-50 dark:ring-white/5",
    panel: "bg-indigo-500",
    panelAccent: "bg-indigo-100",
    badgeBg: "bg-indigo-50",
    badgeText: "text-indigo-600",
    badgeRing: "ring-indigo-600/20",
    badgeBgDark: "dark:bg-indigo-500/10",
    badgeTextDark: "dark:text-indigo-400",
    badgeRingDark: "dark:ring-indigo-500/25",
    ctaBtn: "bg-indigo-600",
    ctaBtnHover: "hover:bg-indigo-500",
    ctaBtnFocus: "focus-visible:outline-indigo-600",
    ctaBtnDark: "dark:bg-indigo-500",
    ctaBtnHoverDark: "dark:hover:bg-indigo-400",
    ctaBtnFocusDark: "dark:focus-visible:outline-indigo-500",
  },
  violet: {
    sectionBg: "from-violet-100/20 dark:from-violet-950/10",
    skewBg: "shadow-violet-600/10 ring-violet-50 dark:ring-white/5",
    panel: "bg-violet-500",
    panelAccent: "bg-violet-100",
    badgeBg: "bg-violet-50",
    badgeText: "text-violet-600",
    badgeRing: "ring-violet-600/20",
    badgeBgDark: "dark:bg-violet-500/10",
    badgeTextDark: "dark:text-violet-400",
    badgeRingDark: "dark:ring-violet-500/25",
    ctaBtn: "bg-violet-600",
    ctaBtnHover: "hover:bg-violet-500",
    ctaBtnFocus: "focus-visible:outline-violet-600",
    ctaBtnDark: "dark:bg-violet-500",
    ctaBtnHoverDark: "dark:hover:bg-violet-400",
    ctaBtnFocusDark: "dark:focus-visible:outline-violet-500",
  },
  blue: {
    sectionBg: "from-blue-100/20 dark:from-blue-950/10",
    skewBg: "shadow-blue-600/10 ring-blue-50 dark:ring-white/5",
    panel: "bg-blue-500",
    panelAccent: "bg-blue-100",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-600",
    badgeRing: "ring-blue-600/20",
    badgeBgDark: "dark:bg-blue-500/10",
    badgeTextDark: "dark:text-blue-400",
    badgeRingDark: "dark:ring-blue-500/25",
    ctaBtn: "bg-blue-600",
    ctaBtnHover: "hover:bg-blue-500",
    ctaBtnFocus: "focus-visible:outline-blue-600",
    ctaBtnDark: "dark:bg-blue-500",
    ctaBtnHoverDark: "dark:hover:bg-blue-400",
    ctaBtnFocusDark: "dark:focus-visible:outline-blue-500",
  },
  rose: {
    sectionBg: "from-rose-100/20 dark:from-rose-950/10",
    skewBg: "shadow-rose-600/10 ring-rose-50 dark:ring-white/5",
    panel: "bg-rose-500",
    panelAccent: "bg-rose-100",
    badgeBg: "bg-rose-50",
    badgeText: "text-rose-600",
    badgeRing: "ring-rose-600/20",
    badgeBgDark: "dark:bg-rose-500/10",
    badgeTextDark: "dark:text-rose-400",
    badgeRingDark: "dark:ring-rose-500/25",
    ctaBtn: "bg-rose-600",
    ctaBtnHover: "hover:bg-rose-500",
    ctaBtnFocus: "focus-visible:outline-rose-600",
    ctaBtnDark: "dark:bg-rose-500",
    ctaBtnHoverDark: "dark:hover:bg-rose-400",
    ctaBtnFocusDark: "dark:focus-visible:outline-rose-500",
  },
};

export const heroSplitVariants = heroSplitCva;
