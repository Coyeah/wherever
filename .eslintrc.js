module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "commonjs": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    },
  },
  "parser": "babel-eslint",
  "rules": {
    "no-console": ["error", {
      "allow": ["warn", "error", "info"]
    }],
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      // "unix",
      "windows"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "engines": {
      "node": ">= 6.0.0"
    },
  }
};
