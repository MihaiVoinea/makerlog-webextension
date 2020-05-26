/* eslint-disable no-undef */
import browser from "webextension-polyfill";
import ReconnectingWebSocket from "reconnecting-websocket";
import axios from "axios";
import store from "./store";
import config from "./config";

browser.runtime.onInstalled.addListener(() => {
  browser.tabs.create({});
});

let rws;
const setupRws = () => {
  // eslint-disable-next-line no-console
  console.log("setupRws() called");
  if (rws) rws.close();
  rws = new ReconnectingWebSocket(
    `wss://api.getmakerlog.com/stream/?token=${store.state.token}`
  );
  // eslint-disable-next-line no-console
  rws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    switch (data.type) {
      case "task.created":
        store.commit("ADD_TASK", data.payload);
        break;
      case "task.deleted":
        store.commit("DELETE_TASK", data.payload);
        break;
      case "task.updated":
        store.commit("UPDATE_TASK", data.payload);
        break;
      default:
        // eslint-disable-next-line no-console
        console.log("rws other event catched", data.payload);
        break;
    }
  };
};

const setup = async () => {
  axios.defaults.baseURL = config.makerlogApiUrl;

  await store.restored;
  if (store.getters.isLoggedIn) {
    // Set token in axios headers
    axios.defaults.headers.common.Authorization = `Token ${store.state.token}`;

    setupRws();

    // Reload user when background.js runs for the first time
    store.dispatch("getUser");

    // Load tasks when background.js runs for the first time
    store.dispatch("getTasks");
  }
};

setup();
