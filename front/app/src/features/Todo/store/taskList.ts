import { defineStore } from "pinia";
import { TaskList } from "@/features/Todo/types/TaskList";
import { v4 as uuidv4 } from "uuid";
import { colors } from "@/features/Todo/utils/Colors";
import { Filters } from "@/features/Todo/types/Filters";

const today = new Date();
today.setHours(0, 0, 0, 0);
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

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
        parentTaskId: "",
        registerDate: new Date(),
        updateDate: new Date(),
      },
      {
        id: "2",
        title: "sample2",
        memo: "sample2",
        dueDate: today,
        color: "blue",
        checked: false,
        parentTaskId: "",
        registerDate: new Date(),
        updateDate: new Date(),
      },
      {
        id: "3",
        title: "sample3",
        memo: "sample3",
        dueDate: tomorrow,
        color: "green",
        checked: false,
        parentTaskId: "",
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
        parentTaskId: "1",
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
        parentTaskId: "4",
        registerDate: new Date(),
        updateDate: new Date(),
      },
    ],
  }),
  persist: {
    storage: window.localStorage,
    key: "taskList",
  },
  getters: {
    // 全タスクリストを取得
    getTaskList(state) {
      return state.taskList;
    },
    // 全タスクIDリストを取得
    getTaskIdList(state) {
      return state.taskList.map((task) => task.id);
    },
    // タスクを取得
    getTask: (state) => (id: string) => {
      return state.taskList.find((task) => task.id === id);
    },
    // 親タスクかどうか
    isParentTask: (state) => (id: string) => {
      return state.taskList.find((task) => task.id === id)?.parentTaskId === "";
    },
    // 親タスクを取得
    getParentTaskList(state) {
      return state.taskList.filter((task) => task.parentTaskId === "");
    },
    // サブタスクを取得
    getChildTaskList: (state) => (id: string) => {
      return state.taskList.filter((task) => task.parentTaskId === id);
    },
    // フィルター後のタスクIDリストを取得（表示用）
    getFilterTaskIdListForView: (state) => (filters: Filters) => {
      let filteredTaskList = state.taskList;
      // フィルターが何も選択されていない場合は親タスクのみ取得
      if (
        filters.colors.length === 0 &&
        filters.checked === null &&
        filters.overdue === null
      ) {
        filteredTaskList = filteredTaskList.filter(
          (task) => task.parentTaskId === "",
        );
      }
      // 色フィルター
      if (filters.colors.length !== 0) {
        // 選択された色のタスクのみ取得
        const colorFilter = filters.colors.map((color) => {
          return colors[Number(color)].name;
        });
        filteredTaskList = filteredTaskList.filter((task) =>
          colorFilter.includes(task.color),
        );
      }
      // チェックフィルター
      if (filters.checked !== null) {
        filteredTaskList = filteredTaskList.filter(
          (task) => task.checked === filters.checked,
        );
      }
      // 期限フィルター
      if (filters.overdue !== null) {
        filteredTaskList = filteredTaskList.filter((task) => {
          if (task.dueDate !== null) {
            return task.dueDate > today === filters.overdue;
          }
        });
      }
      return filteredTaskList.map((task) => task.id);
    },
    // フィルター後のタスクリストを取得（スタッツ用）
    getFilterTaskListForStats: (state) => (filters: Filters) => {
      let filteredTaskList = state.taskList;
      // 色フィルター
      if (filters.colors.length !== 0) {
        // 選択された色のタスクのみ取得
        const colorFilter = filters.colors.map((color) => {
          return colors[Number(color)].name;
        });
        filteredTaskList = filteredTaskList.filter((task) =>
          colorFilter.includes(task.color),
        );
      }
      // チェックフィルター
      if (filters.checked !== null) {
        filteredTaskList = filteredTaskList.filter(
          (task) => task.checked === filters.checked,
        );
      }
      // 期限フィルター
      if (filters.overdue !== null) {
        filteredTaskList = filteredTaskList.filter((task) => {
          if (task.dueDate !== null) {
            return task.dueDate > today === filters.overdue;
          }
        });
      }
      return filteredTaskList;
    },
  },
  actions: {
    // タスクを追加
    addTask(
      title: string,
      memo: string,
      dueDate: Date | null,
      color: string,
      parentTaskId: string,
    ) {
      this.taskList.push({
        id: uuidv4(),
        title: title.trim(),
        memo: memo.trim(),
        dueDate: dueDate,
        color: color,
        checked: false,
        parentTaskId: parentTaskId,
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
      const childTaskList = this.getChildTaskList(id);
      childTaskList.forEach((childTask) => {
        this.deleteTask(childTask.id);
      });
    },
  },
});
