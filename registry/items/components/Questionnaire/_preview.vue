<script setup lang="ts">
import { ref } from "vue";
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from ".";

const items = [
  {
    name: "task",
    required: true,
    choices: [{ value: "inspect" }, { value: "build" }, { value: "review" }],
  },
  { name: "sources", choices: [{ value: "tests" }, { value: "docs" }, { value: "history" }] },
  { name: "timing", required: true, choices: [{ value: "now" }, { value: "later" }] },
];
const submitted = ref<Record<string, string[]> | null>(null);
function handleSubmit(event: Event) {
  event.preventDefault();
  const answers: Record<string, string[]> = {};
  for (const [key, value] of new FormData(event.target as HTMLFormElement)) {
    (answers[key] ??= []).push(String(value));
  }
  submitted.value = answers;
}
</script>

<template>
  <div class="mx-auto flex w-full max-w-lg flex-col gap-4">
    <Questionnaire :items="items" shortcuts="letters" @submit="handleSubmit">
      <QuestionnaireProgress />
      <QuestionnaireItem name="task" required>
        <QuestionnaireTitle>What should the agent do next?</QuestionnaireTitle>
        <QuestionnaireDescription>Choose a task or write another answer.</QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="inspect">Inspect the implementation</QuestionnaireChoice>
          <QuestionnaireChoice value="build">Build the feature</QuestionnaireChoice>
          <QuestionnaireChoice value="review">Review the changes</QuestionnaireChoice>
          <QuestionnaireInput aria-label="Other task" placeholder="Other: describe a task…" />
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireItem name="sources" multiple>
        <QuestionnaireTitle>What context should be included?</QuestionnaireTitle>
        <QuestionnaireDescription
          >Select all that apply, or skip this question.</QuestionnaireDescription
        >
        <QuestionnaireChoices>
          <QuestionnaireChoice value="tests">Tests</QuestionnaireChoice>
          <QuestionnaireChoice value="docs">Documentation</QuestionnaireChoice>
          <QuestionnaireChoice value="history">Commit history</QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireItem name="timing" required>
        <QuestionnaireTitle>When should work begin?</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="now">Start now</QuestionnaireChoice>
          <QuestionnaireChoice value="later">Schedule later</QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireActions>
        <QuestionnairePrevious />
        <QuestionnaireSkip />
        <QuestionnaireNext />
        <QuestionnaireSubmit>Save plan</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
    <output
      v-if="submitted"
      aria-label="Submitted answers"
      class="rounded-md border p-3 text-sm wrap-break-word"
      >{{ JSON.stringify(submitted) }}</output
    >
  </div>
</template>
