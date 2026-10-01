import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";
import { setProjectAnnotations } from "@storybook/vue3-vite";
import { beforeAll } from "vite-plus/test";

import * as projectAnnotations from "./preview";

const annotations = setProjectAnnotations([a11yAddonAnnotations, projectAnnotations]);

beforeAll(annotations.beforeAll);
