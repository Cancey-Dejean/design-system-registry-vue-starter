import { describe, expect, test } from "vite-plus/test";
import {
  createQuestionnaireCollection,
  getInitialItemName,
  getShortcutByChoiceValue,
  getShortcutFromKey,
  getAnswerKeyShortcuts,
  hasInputValue,
} from "../useQuestionnaire";

describe("questionnaire collection and answers", () => {
  const items = [
    { name: "intro", disabled: true },
    { name: "task", required: true },
    { name: "notes" },
  ];
  test("excludes disabled questions from progress without dropping metadata", () => {
    const collection = createQuestionnaireCollection(items)!;
    expect(collection.enabledItems.map((item: { name: string }) => item.name)).toEqual([
      "task",
      "notes",
    ]);
    expect(collection.itemByName.has("intro")).toBe(true);
  });
  test("resumes a valid item and falls back for unknown or disabled defaults", () => {
    const collection = createQuestionnaireCollection(items);
    expect(getInitialItemName(collection, "notes")).toBe("notes");
    expect(getInitialItemName(collection, "intro")).toBe("task");
    expect(getInitialItemName(collection, "missing")).toBe("task");
  });
  test("supports empty collections and client-registered items", () => {
    expect(getInitialItemName(createQuestionnaireCollection([]), undefined)).toBeNull();
    expect(getInitialItemName(null, "task")).toBe("task");
  });
  test("freeform answers reject whitespace but accept zero and nonblank values", () => {
    for (const value of [undefined, null, "", "  ", ["", "  "]])
      expect(hasInputValue(value)).toBe(false);
    for (const value of [0, "Other answer", ["", "typed answer"]])
      expect(hasInputValue(value)).toBe(true);
  });
  test("choice shortcuts skip disabled choices and keep declared order", () => {
    const item = {
      name: "task",
      choices: [{ value: "disabled", disabled: true }, { value: "inspect" }, { value: "build" }],
    };
    expect([...getShortcutByChoiceValue(item, "letters")]).toEqual([
      ["inspect", "A"],
      ["build", "B"],
    ]);
    expect([...getShortcutByChoiceValue(item, "numbers")]).toEqual([
      ["inspect", "1"],
      ["build", "2"],
    ]);
  });
  test("recognizes valid shortcut keys without intercepting arbitrary input", () => {
    expect(getShortcutFromKey("a", "letters")).toBe("A");
    expect(getShortcutFromKey("4", "numbers")).toBe("4");
    expect(getShortcutFromKey("0", "numbers")).toBeNull();
    expect(getShortcutFromKey("Enter", "letters")).toBeNull();
  });
  test("only announces Enter when the answer is filled", () => {
    expect(getAnswerKeyShortcuts("A", false)).toBe("A");
    expect(getAnswerKeyShortcuts("A", true)).toBe("A Enter");
    expect(getAnswerKeyShortcuts(null, false)).toBeUndefined();
  });
});
