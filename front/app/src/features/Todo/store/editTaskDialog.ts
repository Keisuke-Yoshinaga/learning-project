import { defineStore } from "pinia";
import { EditTaskDialog } from "../types/EditTaskDialog";

export const useEditTaskDialogStore = defineStore("editTaskDialog", {
  state: (): EditTaskDialog => ({
    isOpen: false,
    taskId: "",
  }),
  getters: {
    getIsOpen(): boolean {
      return this.isOpen;
    },
    getTaskId(): string {
      return this.taskId;
    },
  },
  actions: {
    setIsOpen(isOpen: boolean): void {
      this.isOpen = isOpen;
    },
    setTaskId(taskId: string): void {
      this.taskId = taskId;
    },
    openDialog(taskId: string): void {
      this.setIsOpen(true);
      this.setTaskId(taskId);
    },
  },
});
