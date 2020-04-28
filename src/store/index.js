/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VuexPersistence from "vuex-persist";
import browser from "webextension-polyfill";
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
    access_token: undefined,
    scope: undefined,
    refresh_token: undefined,
    user: undefined,
  },
  mutations: {
    SET_ACCESS_TOKEN(state, accessToken) {
      state.access_token = accessToken;
    },
    SET_SCOPE(state, scope) {
      state.scope = scope;
    },
    SET_REFRESH_TOKEN(state, refreshToken) {
      state.refresh_token = refreshToken;
    },
    SET_USER(state, user) {
      state.user = user;
    },
  },
  getters: {
    isLoggedIn(state) {
      return !!state.access_token;
    },
  },
  actions: {
    async auth({ commit, dispatch }, code) {
      try {
        const resp = await axios({
          url: config.functionsAuthUrl,
          method: "GET",
          params: { code },
        });
        if (resp.data) {
          // eslint-disable-next-line camelcase
          const { access_token, scope, refresh_token } = resp.data;
          // eslint-disable-next-line camelcase
          axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
          axios.defaults.baseURL = config.makerlogApiUrl;
          commit("SET_ACCESS_TOKEN", access_token);
          commit("SET_SCOPE", scope);
          commit("SET_REFRESH_TOKEN", refresh_token);
          dispatch("getUser");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async refreshToken({ commit, dispatch }) {
      console.log("refreshToken() called");
      // eslint-disable-next-line camelcase
      const oldRefreshToken = this.state.refresh_token;
      if (oldRefreshToken)
        try {
          const resp = await axios({
            url: config.functionsRefreshUrl,
            method: "GET",
            params: { refresh_token: oldRefreshToken },
          });
          if (resp.data) {
            // eslint-disable-next-line camelcase
            const { access_token, scope, refresh_token } = resp.data;
            // eslint-disable-next-line camelcase
            axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
            axios.defaults.baseURL = config.makerlogApiUrl;
            commit("SET_ACCESS_TOKEN", access_token);
            commit("SET_SCOPE", scope);
            commit("SET_REFRESH_TOKEN", refresh_token);
            dispatch("getUser");
          }
          return resp;
        } catch (error) {
          console.log(error);
          return error;
        }
      else {
        console.log("refreshToken() failed: no refresh_token in state");
        return new Error("no refresh_token in state");
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
  plugins: [vuexBrowserStorage.plugin],
});
