import { defineProject } from "vite-plus";

export default defineProject({
  test: {
    name: "unit",
    environment: "node",
    include: ["**/*.test.ts"],
  },
});
