/* eslint-disable no-undef */
import store from "./store";

global.browser = require("webextension-polyfill");

const launchNewTab = () => {
  browser.tabs.create({ url: "about:newtab" });
};

browser.runtime.onInstalled.addListener(launchNewTab);

browser.browserAction.onClicked.addListener(launchNewTab);

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const url = { changeInfo };
  if (url) {
    // Do something when the url changes
    if (
      url
        .toLowerCase()
        .startsWith(
          "https://makerlog-homepage.netlify.app/.netlify/functions/callback?code="
        )
    ) {
      /*
      const code = url.match(
        /(?<=(https\:\/\/makerlog-homepage\.netlify\.app\/\.netlify\/functions\/callback\?code\=)).*$/i
      )[0];
      */
      const urlParams = new URLSearchParams(url);
      const code = urlParams.get("code");
      console.log(code);
      if (code) store.dispatch("auth", { code });
    }
  }
});
