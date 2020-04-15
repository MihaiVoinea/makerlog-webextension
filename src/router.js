import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./pages/Home.vue";
import store from "./store/index";
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

router.beforeEach((to, from, next) => {
  if (store.getters.isLoggedIn) {
    return next();
  }
  window.location = config.makerlogOauthAuthorizationUrl;
});

export default router;
