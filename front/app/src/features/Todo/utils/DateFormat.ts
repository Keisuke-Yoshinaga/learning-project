// 日付フォーマット
export const dateFormat = (date: Date) => {
  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1;
  const day: number = date.getDate();
  const hour: string = date.getHours().toString().padStart(2, "0");
  const minute: string = date.getMinutes().toString().padStart(2, "0");
  const dayOfWeek: number = date.getDay();
  const dayOfWeekStr: string = ["日", "月", "火", "水", "木", "金", "土"][
    dayOfWeek
  ];
  return `${year}/${month}/${day} (${dayOfWeekStr}) ${hour}:${minute}`;
};

// 明日の日付を取得
export const getTomorrow = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
};

// 現在時刻と比較して過去の日付かどうかを判定
export const isPastDueDate = (dueDate: Date | null) => {
  if (!dueDate) {
    return false;
  }
  const today = new Date();
  return dueDate < today;
};
