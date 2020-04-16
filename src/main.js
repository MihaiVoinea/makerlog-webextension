import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import config from "./config";

global.browser = require("webextension-polyfill");

Vue.prototype.$browser = global.browser;

axios.defaults.baseURL = config.makerlogApiUrl;

if (store.getters.isLoggedIn) {
  // Set Bearer token in axios headers
  axios.defaults.headers.common.Authorization = `Bearer ${store.state.access_token}`;
}

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
});
