// Task型の定義
export type Task = {
  id: string;
  title: string;
  memo: string;
  dueDate: Date | null;
  color: string;
  checked: boolean;
  parentTaskId: string;
  registerDate: Date;
  updateDate: Date;
};
