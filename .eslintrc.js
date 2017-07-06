// ESLint configuration
// http://eslint.org/docs/user-guide/configuring
module.exports = {
    parser: 'babel-eslint',

    globals: {
      __DEV__: true,
    },

    env: {
      browser: false,
    },

    rules: {
      // `js`common extension

      // Not supporting nested package.json yet
      // https://github.com/benmosher/eslint-plugin-import/issues/458
      'import/no-extraneous-dependencies': 'off',
      'no-console': [
        'error',
        {
          allow: ['warn', 'error', 'info'],
        },
      ],
    },
  };
