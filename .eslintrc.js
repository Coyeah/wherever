module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "commonjs": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 6
  },
  "parser": "babel-eslint",
  "rules": {
    "no-console": ["error", {
      allow: ["warn", "error", "info"]
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
