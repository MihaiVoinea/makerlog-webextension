/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import axios from "axios";

export default {
  state: {
    tasks: undefined,
    count: undefined,
    next: undefined,
    prev: undefined,
  },
  actions: {
    async getTasks({ rootState, commit }) {
      console.log("getTasks() called");
      try {
        const resp = await axios({
          url: "/tasks",
          params: {
            user: rootState.user.id,
          },
          method: "get",
        });
        if (resp.data) {
          commit("SET_TASKS", resp.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    SET_TASKS(state, { results, count, previous, next }) {
      state.tasks = results;
      state.count = count;
      state.next = next;
      state.prev = previous;
    },
    ADD_TASK(state, newTask) {
      state.tasks.unshift(newTask);
    },
  },
};
