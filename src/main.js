import Vue from "vue";
import infiniteScroll from "vue-infinite-scroll";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "normalize.css";

global.browser = require("webextension-polyfill");

Vue.prototype.$browser = global.browser;

Vue.use(infiniteScroll);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  render: (h) => h(App),
});
