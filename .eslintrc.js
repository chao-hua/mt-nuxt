module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:vue/recommended'
  ],
  // 校验 .vue 文件
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 0,
    'space-before-function-paren': 0,
    'object-shorthand': 0,
    'vue/html-self-closing': 0,
    'unicorn/prefer-includes' : 0
  }
}
