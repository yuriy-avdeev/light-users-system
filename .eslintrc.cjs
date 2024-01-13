// eslint-disable-next-line no-undef
require('@rushstack/eslint-patch/modern-module-resolution')

// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
}
