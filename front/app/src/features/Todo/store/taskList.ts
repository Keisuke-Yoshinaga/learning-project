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
    // タスクリストを取得
    getTaskList(state) {
      return state.taskList;
    },
    // タスクを取得
    getTask: (state) => (id: string) => {
      return state.taskList.find((task) => task.id === id);
    },
    // メインタスクを取得
    getMainTaskList(state) {
      return state.taskList.filter((task) => task.mainTaskId === null);
    },
    // サブタスクを取得
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
    // タスクを追加
    addTask(inputValue: string) {
      this.taskList.push({
        id: uuidv4(),
        title: inputValue.trim(),
        memo: "",
        dueDate: null,
        color: "white",
        checked: false,
        mainTaskId: null,
        registerDate: new Date(),
        updateDate: new Date(),
      });
    },
    // タスクを編集
    editTask(
      id: string,
      title: string,
      memo: string,
      dueDate: Date | null,
      color: string,
    ) {
      const index = this.taskList.findIndex((task) => task.id === id);
      this.taskList[index].title = title.trim();
      this.taskList[index].memo = memo.trim();
      this.taskList[index].dueDate = dueDate;
      this.taskList[index].color = color;
      this.taskList[index].updateDate = new Date();
    },
    // タスクをチェック
    checkTask(id: string) {
      const index = this.taskList.findIndex((task) => task.id === id);
      this.taskList[index].checked = !this.taskList[index].checked;
    },
    // タスクを削除
    deleteTask(id: string) {
      const index = this.taskList.findIndex((task) => task.id === id);
      this.taskList.splice(index, 1);
      // 削除時にサブタスクも削除する
      const subTaskList = this.getSubTaskList(id);
      subTaskList.forEach((subTask) => {
        this.deleteTask(subTask.id);
      });
    },
  },
});
