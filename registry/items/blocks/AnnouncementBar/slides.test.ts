import { Fragment, createCommentVNode, createTextVNode, h } from "vue";
import { expect, test } from "vite-plus/test";
import { getAnnouncementSlides } from "./slides";
test("counts real slides while flattening fragments and ignoring whitespace", () => {
  const first = h("p", "First");
  const second = h("p", "Second");
  expect(
    getAnnouncementSlides([
      createCommentVNode("if"),
      createTextVNode("  "),
      first,
      h(Fragment, [second]),
    ]),
  ).toEqual([first, second]);
});
test("keeps meaningful text messages", () => {
  expect(getAnnouncementSlides([createTextVNode("New release")])).toHaveLength(1);
});
