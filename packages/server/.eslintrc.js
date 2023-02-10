module.exports = {
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    indent: ['error', 4],
    eqeqeq: 'off',
    camelcase: [0, { properties: 'never' }],
    'no-console': process.env.ENV === 'production' ? 'error' : 'off',
    'func-names': 'off',
    'consistent-return': 'off',
    'max-classes-per-file': 'off',
    'import/prefer-default-export': 'off',
    'key-spacing': ['error', { align: 'colon' }],
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'default-case': 'off',
    'no-underscore-dangle': 'off',
    'brace-style': 'off',
    'no-nested-ternary': 'off',
    'no-await-in-loop': 'off',
    'no-restricted-syntax': 'off',
    'no-loop-func': 'off',
    'no-async-promise-executor': 'off',
    'guard-for-in': 'off',
    'no-promise-executor-return': 'off',
    'default-param-last': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'object-curly-spacing': [
      2,
      'always',
      {
        objectsInObjects: true,
        arraysInObjects: true
      }
    ],
    'array-bracket-spacing': [
      'error',
      'always',
      {
        objectsInArrays: false,
        arraysInArrays: true
      }
    ],
    'import/extensions': [
      'error',
      'always',
      {
        pattern: {
          ts: 'never'
        }
      }
    ]
  },
  plugins: ['@typescript-eslint'],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['tsconfig.json']
      }
    }
  },
  env: {
    node: true,
    es6: true,
    mocha: true
  }
};
