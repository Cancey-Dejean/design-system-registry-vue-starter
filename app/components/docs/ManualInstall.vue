<script setup lang="ts">
import { FileCode } from "@lucide/vue";
import { getPackageInstallCommands } from "~/lib/package-managers";
import CodeBlock from "./CodeBlock.vue";
import PackageManagerCommand from "./PackageManagerCommand.vue";

interface ManualInstallSourceFile {
  path: string;
  content: string;
  target?: string;
}

const props = defineProps<{
  dependencies?: readonly string[];
  devDependencies?: readonly string[];
  sourceFiles: readonly ManualInstallSourceFile[];
}>();

const preferredPackageManager = usePreferredPackageManager();

const hasPackageDependencies = computed(
  () => (props.dependencies?.length ?? 0) > 0 || (props.devDependencies?.length ?? 0) > 0,
);

const dependencyCommand = computed(() =>
  getPackageInstallCommands(
    { dependencies: props.dependencies, devDependencies: props.devDependencies },
    preferredPackageManager.value,
  ).join("\n"),
);

const targetPlaceholderDisplayPrefixes = [
  ["@ui/", "components/ui/"],
  ["@components/", "components/"],
  ["@hooks/", "hooks/"],
  ["@lib/", "lib/"],
] as const;

function getManualInstallFilePath(file: ManualInstallSourceFile): string {
  const path = file.target ?? file.path;

  for (const [prefix, replacement] of targetPlaceholderDisplayPrefixes) {
    if (path.startsWith(prefix)) {
      return `${replacement}${path.slice(prefix.length)}`;
    }
  }

  return path;
}

function langFromPath(path: string): string {
  const extension = path.split(".").at(-1);
  return extension === "vue" || extension === "ts" || extension === "js" ? extension : "text";
}
</script>

<template>
  <ol class="flex flex-col gap-8">
    <li
      v-if="hasPackageDependencies"
      class="grid min-w-0 grid-cols-[1.75rem_minmax(0,1fr)] gap-x-3 sm:grid-cols-[2rem_minmax(0,1fr)] sm:gap-x-4"
    >
      <div class="relative row-span-2 flex justify-center">
        <span
          class="absolute top-8 bottom-[-1.75rem] hidden w-px bg-border sm:block"
          aria-hidden="true"
        />
        <span
          class="relative z-10 flex size-7 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground"
          >1</span
        >
      </div>
      <p class="min-w-0 text-base leading-7 text-foreground">Install the following dependencies:</p>
      <div class="col-span-2 mt-4 min-w-0 sm:col-span-1 sm:col-start-2">
        <PackageManagerCommand
          :command="dependencyCommand"
          copy-label="Copy dependency install command"
        />
      </div>
    </li>

    <li
      class="grid min-w-0 grid-cols-[1.75rem_minmax(0,1fr)] gap-x-3 sm:grid-cols-[2rem_minmax(0,1fr)] sm:gap-x-4"
    >
      <div class="relative row-span-2 flex justify-center">
        <span
          class="absolute top-8 bottom-[-1.75rem] hidden w-px bg-border sm:block"
          aria-hidden="true"
        />
        <span
          class="relative z-10 flex size-7 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground"
          >{{ hasPackageDependencies ? 2 : 1 }}</span
        >
      </div>
      <p class="min-w-0 text-base leading-7 text-foreground">
        Copy and paste the following code into your project.
      </p>
      <div class="col-span-2 mt-4 min-w-0 sm:col-span-1 sm:col-start-2">
        <div v-if="sourceFiles.length > 0" class="flex flex-col gap-4">
          <CodeBlock
            v-for="file in sourceFiles"
            :key="file.path"
            :code="file.content"
            :lang="langFromPath(getManualInstallFilePath(file))"
          >
            <template #header>
              <span class="flex min-w-0 items-center gap-2">
                <FileCode class="size-4 shrink-0 text-muted-foreground" />
                <span class="truncate font-mono text-[13px] text-foreground/80">{{
                  getManualInstallFilePath(file)
                }}</span>
              </span>
            </template>
          </CodeBlock>
        </div>
        <p v-else class="text-sm text-muted-foreground">
          This item installs metadata only and does not publish files.
        </p>
      </div>
    </li>

    <li
      class="grid min-w-0 grid-cols-[1.75rem_minmax(0,1fr)] gap-x-3 sm:grid-cols-[2rem_minmax(0,1fr)] sm:gap-x-4"
    >
      <div class="relative row-span-2 flex justify-center">
        <span
          class="relative z-10 flex size-7 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground"
          >{{ hasPackageDependencies ? 3 : 2 }}</span
        >
      </div>
      <p class="min-w-0 text-base leading-7 text-foreground">
        Update the import paths to match your project setup.
      </p>
    </li>
  </ol>
</template>
