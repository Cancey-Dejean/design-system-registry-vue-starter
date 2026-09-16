import type { Component } from "vue";

import AlphaWave from "./LogoSet/AlphaWave.vue";
import Apple from "./LogoSet/Apple.vue";
import AppleStore from "./LogoSet/AppleStore.vue";
import BrandLogo from "./LogoSet/BrandLogo.vue";
import Facebook from "./LogoSet/Facebook.vue";
import Google from "./LogoSet/Google.vue";
import Instagram from "./LogoSet/Instagram.vue";
import LeapYear from "./LogoSet/LeapYear.vue";
import LogoText from "./LogoSet/LogoText.vue";
import MainLogo from "./LogoSet/MainLogo.vue";
import Nuxt from "./LogoSet/Nuxt.vue";
import PlayStore from "./LogoSet/PlayStore.vue";
import ThreePortals from "./LogoSet/ThreePortals.vue";
import VoxelLabs from "./LogoSet/VoxelLabs.vue";
import Vue from "./LogoSet/Vue.vue";
import X from "./LogoSet/X.vue";

export const LOGOS = {
  "brand-logo": BrandLogo,
  "logo-text": LogoText,
  apple: Apple,
  "main-logo": MainLogo,
  "three-portals": ThreePortals,
  "alpha-wave": AlphaWave,
  "leap-year": LeapYear,
  "voxel-labs": VoxelLabs,
  "apple-store": AppleStore,
  "google-play": PlayStore,
  instagram: Instagram,
  "x-logo": X,
  facebook: Facebook,
  google: Google,
  vue: Vue,
  nuxt: Nuxt,
} as const satisfies Record<string, Component>;
