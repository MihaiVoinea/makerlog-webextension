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

      await store.restored;

      // Get user & tasks after login
      await store.dispatch("getUser");
      await store.dispatch("getTasks");

      browser.tabs.create({});
      browser.tabs.remove(tabId);
    }
  }
});

let rws;
const setupRws = () => {
  // eslint-disable-next-line no-console
  console.log("setupRws() called");
  rws = new ReconnectingWebSocket(
    `wss://api.getmakerlog.com/stream/?token=${store.state.access_token}`
  );
  // eslint-disable-next-line no-console
  rws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    switch (data.type) {
      case "task.created":
        store.commit("ADD_TASK", data.payload);
        break;
      default:
        console.log("rws other event catched", data.payload);
        break;
    }
  };
};

const setup = async () => {
  axios.defaults.baseURL = config.makerlogApiUrl;

  await store.restored;
  if (store.getters.isLoggedIn) {
    // Set Bearer token in axios headers
    axios.defaults.headers.common.Authorization = `Bearer ${store.state.access_token}`;

    setupRws();

    // Add a response interceptor to refresh token when access_token expires
    axios.interceptors.response.use(
      (r) => r,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest.retry) {
          originalRequest.retry = true;

          const resp = await store.dispatch("refreshToken");
          if (resp.status === 200) {
            axios.defaults.headers.common.Authorization = `Bearer ${store.state.access_token}`;

            // Close the old connection
            rws.close();
            // Create a new connection with the new access_token
            setupRws();

            // Set the new access_token for the failed request and send the request again
            originalRequest.headers.Authorization = `Bearer ${store.state.access_token}`;
            return axios(originalRequest);
          }
        }
        return Promise.reject(error);
      }
    );

    // Reload user when background.js runs for the first time
    store.dispatch("getUser");

    // Load tasks when background.js runs for the first time
    store.dispatch("getTasks");
  }
};

setup();
