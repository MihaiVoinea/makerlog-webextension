/* eslint-disable no-undef */
import store from "./store";

const browser = require("webextension-polyfill");

const launchNewTab = () => {
  browser.tabs.create({});
};

browser.runtime.onInstalled.addListener(launchNewTab);

browser.tabs.onUpdated.addListener((tabId, changeInfo) => {
  const { url } = changeInfo;
  if (
    url &&
    url
      .toLowerCase()
      .startsWith(
        "https://makerlog-homepage.netlify.app/.netlify/functions/callback?code="
      )
  ) {
    // Old code to get the 'code' param
    // const code = url.match(
    // /(?<=(https\:\/\/makerlog\-homepage\.netlify\.app\/\.netlify\/functions\/callback\?code\=)).*$/i
    // )[0];

    // Convert the 'url' string to an URL object.
    const urlObject = new URL(url);
    // Get the 'code' param
    const code = urlObject.searchParams.get("code");

    console.log(code);
  }
});
