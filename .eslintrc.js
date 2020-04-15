module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["plugin:vue/essential", "airbnb-base", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["prettier", "vue"],
  rules: {
    "prettier/prettier": "error"
  }
};
