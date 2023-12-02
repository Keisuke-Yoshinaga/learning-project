import { defineStore } from "pinia";
import { Filters } from "@/features/Todo/types/Filters";

export const useFiltersStore = defineStore("filters", {
  state: (): Filters => ({
    colors: [],
    checked: null,
    overdue: null,
  }),
  persist: {
    storage: window.localStorage,
    key: "filters",
  },
  getters: {
    getFilters(): Filters {
      return this;
    },
    getColors(): string[] {
      return this.colors;
    },
    getChecked(): boolean | null {
      return this.checked;
    },
    getOverdue(): boolean | null {
      return this.overdue;
    },
    isNull(): boolean {
      return (
        this.colors.length === 0 &&
        this.checked === null &&
        this.overdue === null
      );
    },
  },
  actions: {
    setClear(): void {
      this.colors = [];
      this.checked = null;
      this.overdue = null;
    },
    setColors(colors: string[]): void {
      this.colors = colors;
    },
    setChecked(checked: boolean | null): void {
      this.checked = checked;
    },
    setOverdue(overdue: boolean | null): void {
      this.overdue = overdue;
    },
  },
});
