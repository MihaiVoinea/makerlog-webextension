import Vue from "vue";
import infiniteScroll from "vue-infinite-scroll";
import axios from "axios";
import App from "./App.vue";
import store from "./store";
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
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
    axios.defaults.headers.common.Authorization = `Token ${store.state.token}`;
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
