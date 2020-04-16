/* eslint-disable no-undef */
import browser from "webextension-polyfill";
import ReconnectingWebSocket from "reconnecting-websocket";
import axios from "axios";
import store from "./store";
import config from "./config";

browser.runtime.onInstalled.addListener(() => {
  browser.tabs.create({});
});

browser.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  if (store.restored && !store.getters.isLoggedIn) {
    const { url } = changeInfo;
    if (
      url &&
      url
        .toLowerCase()
        .startsWith(
          "https://makerlog-webextension.netlify.app/.netlify/functions/callback?code="
        )
    ) {
      // Convert the 'url' string to an URL object.
      const urlObject = new URL(url);
      // Get the 'code' param
      const code = urlObject.searchParams.get("code");

      await store.dispatch("auth", code);

      browser.tabs.create({});
      browser.tabs.remove(tabId);
    }
  }
});

const setup = async () => {
  axios.defaults.baseURL = config.makerlogApiUrl;

  await store.restored;

  if (store.getters.isLoggedIn) {
    // Set Bearer token in axios headers
    axios.defaults.headers.common.Authorization = `Bearer ${store.state.access_token}`;

    // Reload user when background.js runs for the first time
    store.dispatch("getUser");

    const rws = new ReconnectingWebSocket(
      `wss://api.getmakerlog.com/stream/?token=${store.state.access_token}`
    );
    rws.onmessage = e => console.log(e);
  }
};

setup();
