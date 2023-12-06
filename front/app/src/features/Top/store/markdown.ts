import { defineStore } from "pinia";

type Markdown = {
  markdown: string;
};

export const useMarkdownStore = defineStore("markdown", {
  state: (): Markdown => ({
    markdown: "# Hello World!",
  }),
  persist: {
    storage: window.localStorage,
    key: "markdown",
  },
  getters: {
    getMarkdown(): string {
      return this.markdown;
    },
  },
  actions: {
    setMarkdown(markdown: string): void {
      this.markdown = markdown;
    },
  },
});
