// eslint-disable-next-line no-undef
require("@rushstack/eslint-patch/modern-module-resolution");

// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "@vue/eslint-config-typescript",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  overrides: [
    {
      rules: {
        "vue/multi-word-component-names": "off",
      },
    },
  ],
};
