import { defineStore } from "pinia";
import { EditTaskDialog } from "@/features/Todo/types/EditTaskDialog";

export const useEditTaskDialogStore = defineStore("editTaskDialog", {
  state: (): EditTaskDialog => ({
    isOpen: false,
    taskId: "",
    parentTaskId: "",
  }),
  persist: {
    storage: window.localStorage,
    key: "editTaskDialog",
  },
  getters: {
    getIsOpen(): boolean {
      return this.isOpen;
    },
    getTaskId(): string {
      return this.taskId;
    },
    getParentTaskId(): string {
      return this.parentTaskId;
    },
  },
  actions: {
    setIsOpen(isOpen: boolean): void {
      this.isOpen = isOpen;
    },
    setTaskId(taskId: string): void {
      this.taskId = taskId;
    },
    setParentTaskId(parentTaskId: string): void {
      this.parentTaskId = parentTaskId;
    },
    openNewDialog(parentTaskId: string): void {
      this.setIsOpen(true);
      this.setTaskId("");
      this.setParentTaskId(parentTaskId);
    },
    openEditDialog(taskId: string): void {
      this.setIsOpen(true);
      this.setTaskId(taskId);
      this.setParentTaskId("");
    },
    closeDialog(): void {
      this.setIsOpen(false);
      this.setTaskId("");
      this.setParentTaskId("");
    },
  },
});
