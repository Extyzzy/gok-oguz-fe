module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  extends: ['next/core-web-vitals', 'prettier'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['.'],
      },
      alias: {
        map: [['@/components', './src/app/components']],
      },
    },
    react: {
      version: 'detect',
    },
  },
  plugins: ['react'],
  rules: {
    'import/prefer-default-export': 'off',
    'prefer-promise-reject-errors': 'off',
    'react/destructuring-assignment': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/no-unstable-nested-components': ['warn', { allowAsProps: true }],
  },
}
