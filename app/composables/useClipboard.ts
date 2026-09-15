async function copyTextToClipboard(value: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = value;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.inset = "0 auto auto -9999px";
  document.body.append(textArea);
  textArea.select();

  const copied = document.execCommand("copy");
  textArea.remove();

  if (!copied) {
    throw new Error("Copy command was rejected.");
  }
}

export function useClipboard(resetDelay = 2000) {
  const copied = ref(false);
  let resetTimeout: ReturnType<typeof setTimeout> | undefined;

  async function copy(value: string | (() => string | Promise<string>)): Promise<void> {
    if (copied.value) {
      return;
    }

    try {
      const textToCopy = typeof value === "function" ? await value() : value;
      await copyTextToClipboard(textToCopy);
      clearTimeout(resetTimeout);
      copied.value = true;
      resetTimeout = setTimeout(() => {
        copied.value = false;
      }, resetDelay);
    } catch {
      copied.value = false;
    }
  }

  onUnmounted(() => clearTimeout(resetTimeout));

  return { copied, copy };
}
