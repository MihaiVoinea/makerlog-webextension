import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";
import Home from "./pages/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/Login.vue"),
  },
];

const router = new VueRouter({
  routes,
});

const waitForStorageToBeReady = async (to, from, next) => {
  await store.restored;
  next();
};
router.beforeEach(waitForStorageToBeReady);

// eslint-disable-next-line consistent-return
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth))
    if (!store.getters.isLoggedIn) {
      return next("/login");
    }
  return next();
});

export default router;
