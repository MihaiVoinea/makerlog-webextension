/* eslint-disable no-param-reassign */
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VuexWebExtensions from "vuex-webextensions";
import config from "../config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    access_token: undefined,
    expires_in: undefined,
    scope: undefined,
    refresh_token: undefined,
    loadingStore: true
  },
  mutations: {
    SET_ACCESS_TOKEN(state, accessToken) {
      state.access_token = accessToken;
    },
    SET_EXPIRES_IN(state, expiresIn) {
      state.expires_in = expiresIn;
    },
    SET_SCOPE(state, scope) {
      state.scope = scope;
    },
    SET_REFRESH_TOKEN(state, refreshToken) {
      state.refresh_token = refreshToken;
    }
  },
  getters: {
    isLoggedIn(state) {
      return !!state.access_token;
    }
  },
  actions: {
    async auth({ commit }, code) {
      try {
        const resp = await axios({
          url: config.functionsAuthUrl,
          method: "GET",
          params: { code }
        });
        if (resp.data) {
          // eslint-disable-next-line camelcase
          const { access_token, expires_in, scope, refresh_token } = resp.data;
          commit("SET_ACCESS_TOKEN", access_token);
          commit("SET_EXPIRES_IN", expires_in);
          commit("SET_SCOPE", scope);
          commit("SET_REFRESH_TOKEN", refresh_token);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  },
  plugins: [
    VuexWebExtensions({
      persistentStates: [
        "access_token",
        "refresh_token",
        "scope",
        "loadingStore"
      ],
      syncActions: false
    })
  ]
});
