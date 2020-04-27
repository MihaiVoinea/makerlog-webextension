<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
:root {
  --c-bg: #f6f6f6;
  --c-main: #00a676;
  --c-main-light: #47e0a0;

  --c-border: #dbdbdb;
  --c-border-light: #b5b5b5;
  --c-border-lightest: #dbdbdb;
}

body {
  background: var(--c-bg);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    Helvetica, sans-serif;
}
/* latin */
@font-face {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  src: local("Poppins Bold"), local("Poppins-Bold"),
    url("./assets/fonts/Poppins/Poppins-Bold.woff2") format("woff2"),
    url("./assets/fonts/Poppins/Poppins-Bold.ttf") format("truetype");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}
</style>
