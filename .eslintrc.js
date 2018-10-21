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
    },    "no-unused-vars": [2, {
        // 允许声明未使用变量
        "vars": "local",
        // 参数不检查
        "args": "none"
    }],
    // 最大空行100
    "no-multiple-empty-lines": [0, { "max": 100 }],
    "no-mixed-spaces-and-tabs": [0],
    //未定义变量不能使用
    "no-undef": 0,
    //一行结束后面不要有空格
    "no-trailing-spaces": 1,
    //强制驼峰法命名
    "camelcase": 2,
    //对象字面量项尾不能有逗号
    "comma-dangle": [2, "never"],
    //this别名
    "consistent-this": [2, "that"],
  }
};
