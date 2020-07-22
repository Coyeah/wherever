# wherever

Tiny NodeJS Static Web Server.

一个微型静态服务器（基于 NodeJS 原生）。

## 安装

```bash
npm install wherever -g
```

## 参数的使用

+ -p, --port [string]: 指定端口号
+ -r, --root [string]: 指定根目录
+ -s, --server [boolean]: 静态资源服务器模式
+ -o, --open [boolean]: 启动是否打开网页
+ -d, --download [boolean]: 文件下载模式
+ -c, --config [string]: 指定配置文件

## 配置文件格式

```json
{
  "port": "number",
  "main": "string",
  "root": "string",
}
```

## If

如果你喜欢，请给我一个小小的支持，为我的项目给个星星。 Star it >> [ [github project](https://github.com/Coyeah/wherever) ]

如果有任何问题，感谢指出， [issue](https://github.com/Coyeah/wherever/issues)。
