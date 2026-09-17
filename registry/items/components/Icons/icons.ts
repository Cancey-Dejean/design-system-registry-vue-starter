import type { Component } from "vue";
import {
  Aperture,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  EyeIcon,
  Feather,
  Glasses,
  Layers,
  PlayCircle,
  SearchIcon,
  ShieldCheck,
  ShoppingCart,
  Sun,
  User,
} from "@lucide/vue";

import NavArrow from "./IconSet/NavArrow.vue";
import XCircleSolid from "./IconSet/XCircleSolid.vue";

export const ICONS = {
  "nav-arrow": NavArrow,
  "x-circle-solid": XCircleSolid,
  "arrow-right": ArrowRight,
  "arrow-left": ArrowLeft,
  sun: Sun,
  check: Check,
  "shield-check": ShieldCheck,
  glasses: Glasses,
  user: User,
  eye: EyeIcon,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "shopping-cart": ShoppingCart,
  search: SearchIcon,
  aperture: Aperture,
  feather: Feather,
  "play-circle": PlayCircle,
  layers: Layers,
} as const satisfies Record<string, Component>;
