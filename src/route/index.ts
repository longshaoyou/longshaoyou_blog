import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// 2. 配置路由
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("../page/Home.vue"),
  },
  {
    path: "/comment",
    name: "Comment",
    component: () => import("../page/Comment.vue"),
  },
  {
    path: "/article",
    name: "Article",
    component: () => import("../page/Article.vue"),
  },
  {
    path: "/project",
    name: "Project",
    component: () => import("../page/Project.vue"),
  },
];
// 1.返回一个 router 实列，为函数，里面有配置项（对象） history
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 3导出路由   然后去 main.ts 注册 router.ts
export default router;
