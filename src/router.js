import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";
import Home from "./pages/Home.vue";
import config from "./config";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

const waitForStorageToBeReady = async (to, from, next) => {
  await store.restored;
  next();
};
router.beforeEach(waitForStorageToBeReady);

// eslint-disable-next-line consistent-return
router.beforeEach((to, from, next) => {
  if (!store.getters.isLoggedIn) {
    window.location = config.makerlogOauthAuthorizationUrl;
  } else return next();
});

export default router;
