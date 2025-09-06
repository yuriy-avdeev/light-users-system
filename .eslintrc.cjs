// eslint-disable-next-line no-undef
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  overrides: [
    {
      rules: {
        'vue/multi-word-component-names': 'off',
        'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 1 }],
        'no-trailing-spaces': 'error',
        'padded-blocks': ['error', 'never'],
        'vue/max-attributes-per-line': [
          'error',
          {
            singleline: 1,
            multiline: {
              max: 1,
              allowFirstLine: false
            }
          }
        ]
      }
    }
  ]
}


