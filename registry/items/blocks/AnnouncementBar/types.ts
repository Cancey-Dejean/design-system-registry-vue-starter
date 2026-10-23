import type { VariantProps } from "class-variance-authority";
import type { announcementBarCva } from "./AnnouncementBar.variants";
export type AnnouncementTheme = NonNullable<VariantProps<typeof announcementBarCva>["theme"]>;
