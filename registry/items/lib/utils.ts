import { createCn } from "cn/config";

/**
 * `--text-*` font-size names from `registry/items/files/styles/theme.css`.
 * The `cn` package only knows Tailwind's t-shirt sizes (`text-sm`). Any other
 * `text-*` class is treated as a text color, so `text-14` or `text-label`
 * disappears when a color such as `text-foreground` is merged in.
 */
export const themeTextSizes = [
  "10",
  "12",
  "14",
  "16",
  "18",
  "20",
  "24",
  "30",
  "36",
  "48",
  "60",
  "72",
  "96",
  "120",
  "label",
  "meta",
  "body",
  "heading",
  "title",
  "display",
  "display-xl",
] as const;

export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [{ text: [...themeTextSizes] }],
    },
  },
});
