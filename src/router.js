import Vue from "vue";
import VueRouter from "vue-router";
import Loading from "./pages/Loading.vue";
import Home from "./pages/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "loading",
    component: Loading
  },
  {
    path: "/home",
    name: "home",
    component: Home
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router;
