import { defineStore, type _GettersTree } from "pinia";
import { TaskList } from "../types/TaskList";
import { v4 as uuidv4 } from "uuid";

export const useTaskListStore = defineStore("taskList", {
  state: (): TaskList => ({
    taskList: [
      {
        id: "1",
        inputValue: "sample",
        checked: false,
      },
      {
        id: "2",
        inputValue: "sample2",
        checked: false,
      },
      {
        id: "3",
        inputValue: "sample3",
        checked: false,
      },
    ],
  }),
  getters: {
    getTaskList(state) {
      return state.taskList;
    },
    getTaskListLength(state) {
      return state.taskList.length;
    },
    getTaskListCheckedLength(state) {
      return state.taskList.filter((task) => task.checked).length;
    },
    getTaskListUncheckedLength(state) {
      return state.taskList.filter((task) => !task.checked).length;
    },
  },
  actions: {
    addTask(inputValue: string) {
      this.taskList.push({
        id: uuidv4(),
        inputValue: inputValue,
        checked: false,
      });
    },
    editTask(id: string, inputValue: string) {
      const index = this.taskList.findIndex((task) => task.id === id);
      this.taskList[index].inputValue = inputValue;
    },
    checkTask(id: string) {
      const index = this.taskList.findIndex((task) => task.id === id);
      this.taskList[index].checked = !this.taskList[index].checked;
    },
    deleteTask(id: string) {
      this.taskList.splice(
        this.taskList.findIndex((task) => task.id === id),
        1
      );
    },
  },
});
