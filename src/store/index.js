/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VuexPersistence from "vuex-persist";
import browser from "webextension-polyfill";
import sharedMutations from "vuex-shared-mutations";
import config from "../config";
import task from "./modules/task";

axios.defaults.baseURL = config.makerlogApiUrl;

const vuexBrowserStorage = new VuexPersistence({
  saveState: (key, state) => {
    const obj = {};
    obj[key] = JSON.stringify(state);
    browser.storage.local.set(obj);
  },
  restoreState: async (key) => {
    const results = await browser.storage.local.get(key);
    if (!results[key]) return {};
    return JSON.parse(results[key]);
  },
  asyncStorage: true,
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: undefined,
    user: undefined,
  },
  mutations: {
    SET_TOKEN(state, accessToken) {
      state.token = accessToken;
    },
    SET_USER(state, user) {
      state.user = user;
    },
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
  },
  actions: {
    async auth({ commit, dispatch }, credentials) {
      try {
        const resp = await axios({
          method: "post",
          url: "https://api.getmakerlog.com/api-token-auth/",
          data: credentials,
        });
        if (resp.data) {
          // eslint-disable-next-line camelcase
          const { token } = resp.data;
          // eslint-disable-next-line camelcase
          axios.defaults.headers.common.Authorization = `Token ${token}`;
          axios.defaults.baseURL = config.makerlogApiUrl;
          commit("SET_TOKEN", token);
          await dispatch("getUser");
          await dispatch("getTasks");
          if (resp.status === 200) return true;
          return false;
        }
        return false;
      } catch (error) {
        console.log(error);
        console.log(error.response);
        return false;
      }
    },
    async getUser({ commit }) {
      console.log("getUser() called");
      try {
        const resp = await axios({
          url: "/me",
          method: "get",
        });
        if (resp.data) {
          commit("SET_USER", resp.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: { task },
  plugins: [
    vuexBrowserStorage.plugin,
    sharedMutations({
      predicate: [
        "SET_TOKEN",
        "SET_USER",
        "ADD_TASK",
        "DELETE_TASK",
        "UPDATE_TASK",
        "SET_TASKS",
      ],
    }),
  ],
});
