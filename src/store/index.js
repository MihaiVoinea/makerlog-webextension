import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    access_token: undefined,
    expires_in: undefined,
    scope: undefined,
    refresh_token: undefined
  },
  getters: {
    isLoggedIn(state) {
      return !!state.access_token;
    }
  }
});
