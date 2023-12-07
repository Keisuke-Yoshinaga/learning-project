// Composables
import { createRouter, createWebHashHistory } from "vue-router";

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
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
