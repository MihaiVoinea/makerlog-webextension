import Vue from "vue";
import infiniteScroll from "vue-infinite-scroll";
import axios from "axios";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import config from "./config";
import "normalize.css";

global.browser = require("webextension-polyfill");

Vue.prototype.$browser = global.browser;

Vue.use(infiniteScroll);

const setupAxios = async () => {
  await store.restored;
  axios.defaults.baseURL = config.makerlogApiUrl;
  if (store.getters.isLoggedIn) {
    axios.defaults.headers.common.Authorization = `Bearer ${store.state.access_token}`;
  }
};
setupAxios();

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  render: (h) => h(App),
});
