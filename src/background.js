/* eslint-disable no-undef */
import browser from "webextension-polyfill";
import store from "./store";

const launchNewTab = () => {
  browser.tabs.create({});
};

browser.runtime.onInstalled.addListener(launchNewTab);

browser.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  const { url } = changeInfo;
  if (
    url &&
    url
      .toLowerCase()
      .startsWith(
        "https://makerlog-webextension.netlify.app/.netlify/functions/callback?code="
      )
  ) {
    // Old code to get the 'code' param
    // const code = url.match(
    // /(?<=(https\:\/\/makerlog\-webextension\.netlify\.app\/\.netlify\/functions\/callback\?code\=)).*$/i
    // )[0];
    if (!store.getters.isLoggedIn) {
      // Convert the 'url' string to an URL object.
      const urlObject = new URL(url);
      // Get the 'code' param
      const code = urlObject.searchParams.get("code");
      await store.dispatch("auth", code);
      browser.tabs.create({});
      browser.tabs.remove(tabId);
    } else {
      browser.tabs.create({});
      browser.tabs.remove(tabId);
    }
  }
});
