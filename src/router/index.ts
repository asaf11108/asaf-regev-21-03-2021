import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: () =>
      // eslint-disable-next-line
      import(/* webpackChunkName: "favorites" */ "../views/Favorites/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
