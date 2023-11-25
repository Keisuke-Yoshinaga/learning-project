// 色
export const colors = [
  {
    name: "white",
    color: "#FFFFFF",
  },
  {
    name: "red",
    color: "#F44336",
  },
  {
    name: "purple",
    color: "#9C27B0",
  },
  {
    name: "blue",
    color: "#2196F3",
  },
  {
    name: "green",
    color: "#4CAF50",
  },
  {
    name: "yellow",
    color: "#FFEB3B",
  },
  {
    name: "orange",
    color: "#FF9800",
  },
  {
    name: "brown",
    color: "#795548",
  },
  {
    name: "gray",
    color: "#9E9E9E",
  },
  {
    name: "black",
    color: "#000000",
  },
];

// colorを取得
export const getColor = (colorName: string) => {
  const color = colors.find((color) => color.name === colorName);
  return color ? color.color : "#FFFFFF";
};
