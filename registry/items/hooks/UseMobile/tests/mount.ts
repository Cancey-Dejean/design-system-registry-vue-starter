import { createRenderer } from "vue";

// These composables only use component lifecycle hooks. A minimal renderer exercises
// real mount/unmount behavior without introducing a simulated browser dependency.
const renderer = createRenderer<object, object>({
  patchProp: () => {},
  insert: () => {},
  remove: () => {},
  createElement: () => ({}),
  createText: () => ({}),
  createComment: () => ({}),
  setText: () => {},
  setElementText: () => {},
  parentNode: () => null,
  nextSibling: () => null,
});

export function mountComposable<T>(useComposable: () => T) {
  let result!: T;
  const app = renderer.createApp({
    setup() {
      result = useComposable();
      return () => null;
    },
  });
  app.mount({});
  return { result, unmount: () => app.unmount() };
}
