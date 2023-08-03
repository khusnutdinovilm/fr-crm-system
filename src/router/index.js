import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Record from "@/views/Record.vue";
import { getAuth } from "firebase/auth";
import { inject } from "vue";

const routes = [
  {
    path: "/login",
    name: "login",
    meta: {
      title: "titles.sign-in",
      layout: "empty",
      auth: false,
    },
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: {
      title: "titles.sign-up",
      layout: "empty",
      auth: false,
    },
    component: () => import("@/views/Register.vue"),
  },
  {
    path: "/",
    name: "home",
    meta: {
      title: "titles.home",
      layout: "main",
      auth: true,
    },
    component: Home,
  },
  {
    path: "/categories",
    name: "categories",
    meta: {
      title: "titles.category",
      layout: "main",
      auth: true,
    },
    component: () => import("@/views/Categories.vue"),
  },
  {
    path: "/detail-record/:id",
    name: "detail-record",
    meta: {
      title: "titles.detail",
      layout: "main",
      auth: true,
    },
    component: () => import("@/views/DetailRecord.vue"),
  },
  {
    path: "/history",
    name: "history",
    meta: {
      title: "titles.history",
      layout: "main",
      auth: true,
    },
    component: () => import("@/views/History.vue"),
  },
  {
    path: "/planning",
    name: "planning",
    meta: {
      title: "titles.planning",
      layout: "main",
      auth: true,
    },
    component: () => import("@/views/Planning.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: {
      title: "titles.profile",
      layout: "main",
      auth: true,
    },
    component: () => import("@/views/Profile.vue"),
  },
  {
    path: "/record",
    name: "record",
    meta: {
      title: "titles.new-record",
      layout: "main",
      auth: true,
    },
    component: () => import("@/views/Record.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const currentUser = getAuth().currentUser;
  const requireAuth = to.meta.auth;

  if (requireAuth && !currentUser) {
    next("/login?message=auth");
  } else {
    next();
  }
});
export default router;
