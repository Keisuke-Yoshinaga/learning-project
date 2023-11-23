import { defineStore } from "pinia";
import { TaskList } from "../types/TaskList";
import { v4 as uuidv4 } from "uuid";

export const useTaskListStore = defineStore("taskList", {
  state: (): TaskList => ({
    taskList: [
      {
        id: "1",
        title: "sample",
        memo: "sample",
        dueDate: null,
        color: "red",
        checked: false,
        mainTaskId: null,
        registerDate: new Date(),
        updateDate: new Date(),
      },
      {
        id: "2",
        title: "sample2",
        memo: "sample2",
        dueDate: null,
        color: "blue",
        checked: false,
        mainTaskId: null,
        registerDate: new Date(),
        updateDate: new Date(),
      },
      {
        id: "3",
        title: "sample3",
        memo: "sample3",
        dueDate: null,
        color: "green",
        checked: false,
        mainTaskId: null,
        registerDate: new Date(),
        updateDate: new Date(),
      },
      {
        id: "4",
        title: "sample4",
        memo: "sample4",
        dueDate: null,
        color: "yellow",
        checked: false,
        mainTaskId: "1",
        registerDate: new Date(),
        updateDate: new Date(),
      },
      {
        id: "5",
        title: "sample5",
        memo: "sample5",
        dueDate: null,
        color: "purple",
        checked: false,
        mainTaskId: "4",
        registerDate: new Date(),
        updateDate: new Date(),
      },
    ],
  }),
  getters: {
    getTaskList(state) {
      return state.taskList;
    },
    getMainTaskList(state) {
      return state.taskList.filter((task) => task.mainTaskId === null);
    },
    getSubTaskList: (state) => (id: string) => {
      return state.taskList.filter((task) => task.mainTaskId === id);
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
        title: inputValue,
        memo: "",
        dueDate: null,
        color: "gray",
        checked: false,
        mainTaskId: null,
        registerDate: new Date(),
        updateDate: new Date(),
      });
    },
    editTask(id: string, inputValue: string) {
      const index = this.taskList.findIndex((task) => task.id === id);
      this.taskList[index].title = inputValue;
    },
    checkTask(id: string) {
      const index = this.taskList.findIndex((task) => task.id === id);
      this.taskList[index].checked = !this.taskList[index].checked;
    },
    deleteTask(id: string) {
      this.taskList.splice(
        this.taskList.findIndex((task) => task.id === id),
        1,
      );
    },
  },
});
