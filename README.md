# wherever

Tiny NodeJS Static Web Server.

一个微型静态服务器（基于 NodeJS 原生）。

## 安装

```bash
npm install -g wherever
```

## 使用

```text
wherever [options]

选项：
  -p, --port     端口号                                    [数字] [默认值: 3000]
  -r, --root     根目录                                  [字符串] [默认值: "./"]
  -s, --server   静态资源服务器模式                       [布尔] [默认值: false]
  -o, --open     打开网址                                 [布尔] [默认值: false]
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
