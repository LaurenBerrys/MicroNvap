/*
 * @Author: LaurenBerrys && 949154547@qq.com
 * @Date: 2023-11-15 16:26:37
 * @LastEditTime: 2023-11-16 17:21:34
 * @Description:
 */
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

export const constantRoutes = [
  {
    path: "/",
    component: () => import("@/views/home/index.vue"),
    children: [
      {
        path: "nvap/NvapNaive",
        component: "",
        // components: {
        //   micro: () => import("@/views/micro/index.vue"),
        // },
      },
      {
        path: "nvap/reactApp",
        component: "",
        // components: {
        //   micro: () => import("@/views/micro/index.vue"),
        // },
      },
    ],
  },
  {
    path: "/login",
    component:  () => import("@/views/micro/index.vue"),
  }
];
const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes,
});

export default router;
