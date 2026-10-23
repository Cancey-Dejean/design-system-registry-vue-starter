# React and Vue catalog capability mapping

Date: October 18, 2026. This is source evidence from the React reference and Vue working tree, not proof that every installed item or behavior has been exercised in a consumer project.

React reference: `/Users/canceydejean/Documents/Code/UI Libraries/React/Projects/design-system-registry-react-starter`.

## Catalog counts and interpretation

The starting inventory contained 87 React `_registry.mdx` descriptors and 76 Vue `_registry.md` descriptors, with 68 exact names shared. Exact names are not a functional-equivalence test. In particular, React `datepicker` and `toast` have Vue counterparts named `date-picker` and `sonner`.

Shared-name APIs, variant options, keyboard interactions and visual details still need component-level verification. Vue's additional Form, Number Field, Range Calendar, Stepper and Tags Input should be retained; framework parity does not require deleting useful framework-native items.

## Implemented capability coverage — October 19 verification

The Vue catalog now contains **93 descriptors**. All 17 genuine missing names have been added: data-table, code-block, direction, section, trace, questionnaire, hero-01, hero-02, announcement-bar, dot-canvas, theme-toggle, mode-toggle, use-copy-to-clipboard, use-highlighted-code, use-mobile, use-body-overflow and use-close-mobile-menu-on-resize.

| Capability                                  | Vue implementation and boundary                                                                                                       |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Data Table                                  | Published TanStack Vue v8 component with sorting, filters, visibility, selection and pagination.                                      |
| Code Block / highlighted code               | Compound components, copy feedback, diff lines and lazy Shiki; async highlighting composable.                                         |
| Direction / Section / Trace                 | Reka direction context, reference padding variants, composable expandable trace states.                                               |
| Questionnaire                               | Single/multiple choices, Other/freeform, validation, progress, skip and native form submission.                                       |
| Hero 01 / Hero 02                           | Both reference names published. React sources are identical apart from their names; Hero02 reuses Hero01. Existing Vue Hero retained. |
| Announcement Bar                            | Theme variants and Embla slides with controls; dynamic slot updates covered by a regression story.                                    |
| Dot Canvas                                  | Static radial-gradient dot texture matching the actual React implementation; no animation/canvas lifecycle required.                  |
| Mode / Theme toggles                        | Persistent light/dark/system mode and independent primary/secondary/tertiary palette selection.                                       |
| Clipboard / mobile / body overflow / resize | Explicit Vue imports, lifecycle cleanup, clipboard race protection and shared scroll-lock ownership.                                  |
| datepicker → date-picker                    | Existing Vue date picker is the framework-native counterpart; complete date/locale API equivalence remains unverified.                |
| toast → sonner                              | Existing Vue Sonner is the framework-native counterpart; React manager API equivalence is not claimed.                                |

This establishes catalog coverage for all 87 React descriptors through 85 exact names and two intentional aliases. It does not certify pixel equality or every API and interaction across the shared catalog.

## Vue-only blocks requiring publication decisions

`registry/items/blocks/Sidebar03` and `Sidebar07` contain Vue sources, barrels and demo pages but lack `_registry.md` descriptors. These are not missing React components. Publishing them requires listing all nested sources/dependencies and adding previews. Do not claim them as installable based only on their demo pages.

## Consumer publication fixes made during this parity pass

- Resolve authoring component aliases from manifest targets rather than retaining `@registry/components/*` or guessing case from `#registry-ui/*`. For example, Button intentionally installs in `components/ui/Button`, while Sheet and Input Group install in lowercase `sheet` and `input-group` folders.
- Publish Spinner's `index.ts` barrel and document its named export.
- Publish the complete Input Group barrel closure, including `InputGroupButton.vue`, `InputGroupInput.vue` and `InputGroupTextarea.vue`; declare Button/Input/Textarea and CVA dependencies.
- Declare Button for Dialog/Sheet, Reka for Breadcrumb and Embla for Carousel.
- Declare direct `@vueuse/core` imports in Tabs, Drawer, Button Group, Input, Dropdown Menu, Separator, Checkbox, Label, Dialog, Table, Command, Sheet and Badge.
- Declare `@internationalized/date` for Calendar.

The dependency scan considers source files listed in each published descriptor and direct component imports through both registry aliases and relative sibling paths. It excludes authoring-only previews/stories and treats Vue as a framework prerequisite and `cn` as supplied by the documented Styles prerequisite. A passing direct-import scan does not prove a complete clean-consumer install or production build.

## Additional consumer-path validation

Relative source imports between PascalCase authoring folders can also require rewriting when their published target folders are lowercase. Examples include DatePicker → Calendar/Popover, Form → Label, ToggleGroup → Toggle, Item → Separator, and Calendar → NativeSelect. Validate resolved published imports against target paths on a case-sensitive filesystem. Merely confirming the source imports work on macOS does not establish consumer correctness.

## Final validation — October 19

The actual shadcn-vue CLI installed all new capabilities (Hero01 transitively through Hero02) from the local production registry into the disposable consumer. Its published component barrels and composables bundled successfully. This checks source/dependency resolution, not CSS pixel fidelity or arbitrary consumer alias layouts. The project production build, Vue type check and 348 tests passed; production docs/search/registry/sitemap returned 200.
