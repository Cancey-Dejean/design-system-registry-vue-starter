import { registryConfig } from "./registry/config";

export interface DocsPageActionUrls {
  markdownPath: string;
  pageDescription: string;
  pageTitle: string;
  pageUrl: string;
  registryItemJsonUrl?: string;
}

export async function getDocsPageMarkdown(markdownPath: string): Promise<string> {
  const response = await fetch(markdownPath, { headers: { Accept: "text/markdown" } });

  if (!response.ok) {
    throw new Error("Page markdown is unavailable.");
  }

  return response.text();
}

export function getPromptUrl(baseUrl: string, url: string): string {
  const promptUrl = new URL(baseUrl);
  const prompt = `I have questions about this documentation page for the shadcn-compatible ${registryConfig.name} registry: ${url}\n\nStudy it and let me know when you're ready to answer my questions.`;

  promptUrl.searchParams.set("q", prompt);

  return promptUrl.toString();
}

export function getV0RegistryItemUrl({
  prompt,
  registryItemJsonUrl,
  title,
}: {
  prompt: string;
  registryItemJsonUrl: string;
  title: string;
}): string {
  const openUrl = new URL("https://v0.app/chat/api/open");

  openUrl.searchParams.set("url", registryItemJsonUrl);
  openUrl.searchParams.set("title", title.trim());
  openUrl.searchParams.set("prompt", prompt.trim());

  return openUrl.toString();
}
