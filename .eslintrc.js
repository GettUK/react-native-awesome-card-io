module.exports = {
  parser: 'babel-eslint',

  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
      modules: true
    }
  },

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb-base'
  ],

  env: {
    browser: true,
    es6: true
  },

  plugins: ['react', 'react-native', 'class-property'],

  rules: {
    'arrow-body-style': [1, 'as-needed'],
    'class-methods-use-this': [2, { exceptMethods: ['render'] }],
    'class-property/class-property-semicolon': [1, 'always'],
    'comma-dangle': [2, 'never'],
    'jsx-quotes': [2, 'prefer-double'],
    'lines-between-class-members': [1, 'always'],
    'max-len': [1, { code: 120, ignorePattern: 'd=\"[^\"]*\"' }],
    'no-shadow': 0,
    'object-curly-newline': 0,
    'prefer-destructuring': 0,
    'react/display-name': 0,

    //temp
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'react/prop-types': 0
  }
};
