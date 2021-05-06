# wherever


[![npm version](https://badge.fury.io/js/wherever.svg)](https://badge.fury.io/js/wherever)
[![npm downloads](https://img.shields.io/npm/dm/wherever.svg?style=flat-square)](http://npm-stat.com/charts.html?package=wherever)

Tiny static web server.

## 安装

```bash
npm install -g wherever
```

## 使用

```bash
wherever --help
```

```text
wherever [options]

选项：
  -p, --port     端口号                                    [数字] [默认值: 3000]
  -r, --root     根目录                                  [字符串] [默认值: "./"]
  -s, --server   静态资源服务器模式                       [布尔] [默认值: false]
  -o, --open     打开网页                                 [布尔] [默认值: false]
  -c, --config   配置文件
      --version  显示版本号                                               [布尔]
      --help     显示帮助信息                                             [布尔]
```

## 配置文件格式

```json
{
  "port": 3000,
  "root": "./",
  "historyApiFallback": "index.html",
  "proxy": {
    "/api": {
      "target": "https://api.github.com",
      "changeOrigin": true,
      "pathRewrite": {
        "^/api": ""
      }
    }
  }
}
```

+ 支持接口代理；
