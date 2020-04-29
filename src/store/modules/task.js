/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import axios from "axios";

export default {
  state: {
    tasks: undefined,
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
    SET_TASKS(state, { results, previous, next }) {
      state.tasks = results;
      state.next = next;
      state.prev = previous;
    },
    ADD_TASK(state, newTask) {
      state.tasks.unshift(newTask);
    },
    DELETE_TASK(state, deleteTask) {
      state.tasks = state.tasks.filter((task) => task.id !== deleteTask.id);
    },
    UPDATE_TASK(state, updateTask) {
      state.tasks = state.tasks.map((task) =>
        task.id === updateTask.id ? updateTask : task
      );
    },
  },
};
