# Safari MCP audits

Run via `evaluate_javascript`. Each snippet is a **function body** (note `return`). Ignore HMR logs, browser-extension noise, and unlabeled controls inside Vite/TanStack/Nuxt DevTools overlays.

## Environment

```javascript
return {
  userAgent: navigator.userAgent,
  webkit: CSS.supports("-webkit-touch-callout", "none"),
  colorScheme: getComputedStyle(document.documentElement).colorScheme,
  prefersDark: matchMedia("(prefers-color-scheme: dark)").matches,
  prefersReduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
  theme: document.documentElement.getAttribute("data-theme")
    || document.documentElement.getAttribute("class"),
  viewport: { w: innerWidth, h: innerHeight, dpr: devicePixelRatio },
  visualViewport: visualViewport && { w: visualViewport.width, h: visualViewport.height },
};
```

## Accessibility (changed region, then widen)

```javascript
const issues = [];
document.querySelectorAll("img").forEach((img, i) => {
  if (!img.alt && img.getAttribute("alt") === null && !img.closest("[aria-hidden=true]")) {
    issues.push({ type: "img-alt", src: img.currentSrc || img.src, i });
  }
});
document.querySelectorAll("button, a, [role=button]").forEach((el, i) => {
  const name = (el.getAttribute("aria-label") || el.textContent || "").trim();
  if (!name && !el.querySelector("img[alt], svg[aria-label]")) {
    issues.push({ type: "empty-name", tag: el.tagName, i });
  }
});
document.querySelectorAll("input, select, textarea").forEach((el, i) => {
  const id = el.id;
  const label = id && document.querySelector(`label[for="${CSS.escape(id)}"]`);
  if (!label && !el.getAttribute("aria-label") && !el.getAttribute("aria-labelledby")) {
    issues.push({ type: "unlabeled-control", name: el.name || el.type, i });
  }
});
return { count: issues.length, issues: issues.slice(0, 40) };
```

## Safari / WebKit quirks

```javascript
const root = document.documentElement;
const body = document.body;
return {
  horizontalOverflow: root.scrollWidth > innerWidth + 1,
  uses100vh: [...document.querySelectorAll("*")].some((el) =>
    getComputedStyle(el).height.includes("100vh") || getComputedStyle(el).minHeight.includes("100vh")
  ),
  backdropFilter: CSS.supports("backdrop-filter", "blur(8px)") || CSS.supports("-webkit-backdrop-filter", "blur(8px)"),
  positionSticky: CSS.supports("position", "sticky"),
  dvh: CSS.supports("height", "100dvh"),
  safeArea: getComputedStyle(document.documentElement).getPropertyValue("env(safe-area-inset-top)"),
};
```

Keep the 100vh scan scoped if the page is huge (sample main landmarks only).

## Performance (after load + interaction)

```javascript
const nav = performance.getEntriesByType("navigation")[0];
const paints = performance.getEntriesByType("paint");
const lcp = performance.getEntriesByType("largest-contentful-paint").at(-1);
return {
  nav: nav && {
    ttfb: nav.responseStart,
    dcl: nav.domContentLoadedEventEnd,
    load: nav.loadEventEnd,
    transferSize: nav.transferSize,
  },
  paints: Object.fromEntries(paints.map((p) => [p.name, p.startTime])),
  lcp: lcp && { startTime: lcp.startTime, size: lcp.size, url: lcp.url },
};
```

LCP may be empty unless observed with `buffered: true` earlier in the session.

## Dark mode / reduced motion

`set_emulated_media` cannot do this. Prefer clicking the product theme control with `page_interactions` (this registry: **Toggle theme**). If the app follows `class="dark"` / `data-theme`:

```javascript
document.documentElement.classList.add("dark");
document.documentElement.setAttribute("data-theme", "dark");
return document.documentElement.className;
```

Reset afterwards. For reduced motion, report `matchMedia("(prefers-reduced-motion: reduce)").matches` and flag animations that ignore it; do not fake the OS setting unless the product has a toggle.
