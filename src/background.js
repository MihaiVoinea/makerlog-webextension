/* eslint-disable no-undef */
import browser from "webextension-polyfill";
import axios from "axios";
import setupRws from "./rws";
import store from "./store";
import config from "./config";

browser.runtime.onInstalled.addListener(() => {
  browser.tabs.create({});
});

// eslint-disable-next-line import/prefer-default-export
const setup = async () => {
  axios.defaults.baseURL = config.makerlogApiUrl;

  await store.restored;
  if (store.getters.isLoggedIn) {
    // Set token in axios headers
    axios.defaults.headers.common.Authorization = `Token ${store.state.token}`;

    // Reload user when background.js runs for the first time
    await store.dispatch("getUser");

    // Load tasks when background.js runs for the first time
    await store.dispatch("getTasks");

    setupRws();
  }
};

setup();
