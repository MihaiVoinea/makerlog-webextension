/* eslint-disable no-param-reassign */
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VuexPersistence from "vuex-persist";

import config from "../config";

// const browser = require("webextension-polyfill");

const vuexLocal = new VuexPersistence({
  // storage: browser.storage.local
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    access_token: undefined,
    scope: undefined,
    refresh_token: undefined,
    user: undefined
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
    }
  },
  getters: {
    isLoggedIn(state) {
      return !!state.access_token;
    }
  },
  actions: {
    async auth({ commit, dispatch }, code) {
      try {
        const resp = await axios({
          url: config.functionsAuthUrl,
          method: "GET",
          params: { code }
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
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    async getUser({ commit }) {
      try {
        const resp = await axios({
          url: "/me",
          method: "get"
        });
        if (resp.data) {
          console.log(resp.data);
          commit("SET_USER", resp.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  plugins: [vuexLocal.plugin]
});
