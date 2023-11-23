import { defineStore } from "pinia";
import { Dialog } from "../types/Dialog";

export const useDialogStore = defineStore("dialog", {
  state: (): Dialog => ({
    dialog: false,
    taskId: "",
  }),
  getters: {
    getDialog(): boolean {
      return this.dialog;
    },
    getTaskId(): string {
      return this.taskId;
    },
  },
  actions: {
    setDialog(dialog: boolean): void {
      this.dialog = dialog;
    },
    setTaskId(taskId: string): void {
      this.taskId = taskId;
    },
    openDialog(taskId: string): void {
      this.setDialog(true);
      this.setTaskId(taskId);
    },
  },
});
