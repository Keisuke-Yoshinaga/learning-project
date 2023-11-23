// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/Default.vue"),
    children: [
      {
        path: "",
        name: "Top",
        component: () => import("@/features/Top/views/Top.vue"),
      },
    ],
  },
  {
    path: "/todo",
    component: () => import("@/layouts/FixScreen.vue"),
    children: [
      {
        path: "",
        name: "Todo",
        component: () => import("@/features/Todo/views/Todo.vue"),
      },
      {
        path: "/register",
        name: "RegisterTask",
        component: () => import("@/features/Todo/views/RegisterTask.vue"),
      },
      {
        path: "/edit/:id",
        name: "EditTask",
        component: () => import("@/features/Todo/views/EditTask.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
