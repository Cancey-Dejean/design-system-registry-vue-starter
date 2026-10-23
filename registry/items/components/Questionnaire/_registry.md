---
name: questionnaire
type: registry:ui
title: Questionnaire
description: A multi-step questionnaire with single or multiple choice, freeform answers, validation, and skip controls.
dependencies:
  - reka-ui
  - "@lucide/vue"
localRegistryDependencies:
  - button
files:
  - path: Questionnaire.vue
    type: registry:ui
    target: components/ui/questionnaire/Questionnaire.vue
  - path: QuestionnaireActions.vue
    type: registry:ui
    target: components/ui/questionnaire/QuestionnaireActions.vue
  - path: QuestionnaireChoice.vue
    type: registry:ui
    target: components/ui/questionnaire/QuestionnaireChoice.vue
  - path: QuestionnaireChoiceDescription.vue
    type: registry:ui
    target: components/ui/questionnaire/QuestionnaireChoiceDescription.vue
  - path: QuestionnaireChoices.vue
    type: registry:ui
    target: components/ui/questionnaire/QuestionnaireChoices.vue
  - path: QuestionnaireDescription.vue
    type: registry:ui
    target: components/ui/questionnaire/QuestionnaireDescription.vue
  - path: QuestionnaireError.vue
    type: registry:ui
    target: components/ui/questionnaire/QuestionnaireError.vue
  - path: QuestionnaireInput.vue
    type: registry:ui
    target: components/ui/questionnaire/QuestionnaireInput.vue
  - path: QuestionnaireItem.vue
    type: registry:ui
    target: components/ui/questionnaire/QuestionnaireItem.vue
  - path: QuestionnaireNext.vue
    type: registry:ui
    target: components/ui/questionnaire/QuestionnaireNext.vue
  - path: QuestionnairePrevious.vue
    type: registry:ui
    target: components/ui/questionnaire/QuestionnairePrevious.vue
  - path: QuestionnaireProgress.vue
    type: registry:ui
    target: components/ui/questionnaire/QuestionnaireProgress.vue
  - path: QuestionnaireSkip.vue
    type: registry:ui
    target: components/ui/questionnaire/QuestionnaireSkip.vue
  - path: QuestionnaireSubmit.vue
    type: registry:ui
    target: components/ui/questionnaire/QuestionnaireSubmit.vue
  - path: QuestionnaireTitle.vue
    type: registry:ui
    target: components/ui/questionnaire/QuestionnaireTitle.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/questionnaire/index.ts
  - path: useQuestionnaire.ts
    type: registry:ui
    target: components/ui/questionnaire/useQuestionnaire.ts
---

Build a step-by-step form from the questionnaire parts. The root owns question order, progress, navigation, keyboard shortcuts and validation. A question is a fieldset with a legend, and answers stay in the form when you navigate between questions.

```vue
<script setup lang="ts">
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire";

const items = [
  { name: "task", required: true, choices: [{ value: "inspect" }, { value: "build" }] },
];
function submit(event: Event) {
  event.preventDefault();
  const answers = new FormData(event.target as HTMLFormElement);
  console.log(answers.get("task"));
}
</script>

<template>
  <Questionnaire :items="items" @submit="submit">
    <QuestionnaireProgress />
    <QuestionnaireItem name="task" required>
      <QuestionnaireTitle>What should happen next?</QuestionnaireTitle>
      <QuestionnaireChoices>
        <QuestionnaireChoice value="inspect">Inspect the project</QuestionnaireChoice>
        <QuestionnaireChoice value="build">Build the feature</QuestionnaireChoice>
        <QuestionnaireInput aria-label="Other task" placeholder="Describe another task…" />
      </QuestionnaireChoices>
      <QuestionnaireError />
    </QuestionnaireItem>
    <QuestionnaireActions
      ><QuestionnaireSubmit>Save plan</QuestionnaireSubmit></QuestionnaireActions
    >
  </Questionnaire>
</template>
```

Add `QuestionnairePrevious`, `QuestionnaireNext` and `QuestionnaireSkip` to the actions for multi-question forms. Each hides itself when it does not apply. Required questions must be answered before continuing. Optional questions may be deliberately skipped; skipping clears their answers. Use `multiple` on an item for checkbox selection and read `FormData.getAll(name)` to preserve every selected value. A freeform input submits its text under the item's name and behaves as an alternative answer for a single-choice item.

Pass `items` to declare order and required/disabled metadata during server rendering. `default-item` resumes a question; `v-model:item` controls the active question. Choices support `v-model:checked`, and freeform inputs support `v-model`. `QuestionnaireItem` emits `update:status` with `unanswered`, `answered` or `skipped`. `QuestionnaireProgress` exposes `current`, `total`, `first` and `last` to its slot. Listen to native `submit`/`reset` events; call `preventDefault()` to manage transport or prevent reset yourself.

Set `shortcuts="letters"` or `"numbers"` for displayed answer shortcuts. Arrow keys navigate answers/questions, Enter confirms, and Ctrl/Meta+Enter confirms the active question. Text entry is kept editable without intercepting ordinary typing. Inactive questions are hidden/inert and errors are associated with their fieldsets. Set `:no-validate="false"` to additionally run native constraint validation on answered controls, and use the item's `invalid` prop for external validation.

Adapted from the official [shadcn-vue Questionnaire](https://shadcn-vue.com/docs/components/questionnaire), with button variants aligned to this registry's `md`/`primary` conventions. Install the [Styles](/docs/styles) foundation first.
