import path from "path";
import fs from "fs";

import express from "express";
import chalk from "chalk";
import ejs from "ejs";
import mime from "mime-types";
import { createProxyMiddleware } from "http-proxy-middleware";

import icon from "./common/icon";
import { CWD, defaultConfig, template } from "./common/config";
import { readJsonFile, tryTo, openUrl } from "./utils/tools";
import { isFresh } from "./utils/cache";
import range from "./utils/range";
import compress from "./utils/compress";

export default class Server {
    static defaultConfig = defaultConfig;

    constructor(argv = {}) {
        const { 
            port = defaultConfig.port, 
            root = defaultConfig.root, 
            config: configRoot, 
            open = false, 
            server = false 
        } = argv;
        const customConfig = readJsonFile(configRoot);

        this.config = Object.assign(
            {},
            defaultConfig,
            {
                root,
                port,
                open,
                server,
            },
            customConfig
        );
        this.config.absoluteRoot = path.resolve(CWD, this.config.root);
        this.app = express();
    }

    start() {
        this.reqLog();
        this.proxyHandler();
        this.methodGet();
        // this.methodPost();
        this.listen();
    }

    reqLog() {
        this.app.use(function (req, res, next) {
            console.info(
                chalk.whiteBright("[wherever]"),
                `${chalk.greenBright(`[${req.method}]`)}`,
                req.url
            );
            next();
        });
    }

    proxyHandler() {
        const { proxy } = this.config;
        if (proxy && proxy.toString() === "[object Object]") {
            Object.keys(proxy).map(key => {
                this.app.use(
                    key,
                    createProxyMiddleware(proxy[key].target, proxy[key])
                );
            })
        }
    }

    fileHandler(req, res, params) {
        const { targetPath, stat } = params;
        const contentType = mime.lookup(targetPath) || "text/plain"; // 获取文件类型识别
        res.setHeader("Content-Type", `${contentType}; charset=utf-8`);
        // 是否有缓存
        if (isFresh(stat, req, res)) {
            res.statusCode = 304;
            res.end();
            return;
        }

        // 请求返回文件，文档流形式
        let rs;
        const { code, start, end } = range(stat.size, req, res); // 判断是否断点续连，若否则 code = 200，start & end 为空
        if (code === 200) {
            res.statusCode = 200;
            rs = fs.createReadStream(targetPath); // 创建一个读取操作的数据流，用于大型文本文件
        } else {
            res.statusCode = 206;
            rs = fs.createReadStream(targetPath, {
                start,
                end,
            });
        }
        if (!!targetPath.match(this.config.compress)) {
            rs = compress(rs, req, res);
        }
        rs.pipe(res);
    }

    notFound(res) {
        res.statusCode = 404;
        res.end();
    }

    listen() {
        this.app.listen(this.config.port, () => {
            const addr = `http://${this.config.hostname}:${this.config.port}`;
            const local = `http://localhost:${this.config.port}`;

            console.info();
            console.info(
                chalk.whiteBright("[wherever]"),
                "|",
                `Server started at ${chalk.green(addr)}`
            );
            console.info(
                "          ",
                "|",
                `Server started at ${chalk.green(local)}`
            );
            console.info();
            if (this.config.open) openUrl(addr);
        });
    }

    getStat(targetPath) {
        return new Promise((resolve, reject) => {
            const res = tryTo(() => fs.statSync(targetPath), null);
            if (res) {
                resolve(res);
            } else {
                reject();
            }
        });
    }

    getFolderList(targetPath) {
        const _dirList = fs.readdirSync(targetPath);
        const dirList = [];
        for (let value of _dirList) {
            dirList.push(
                this
                    .getStat(path.join(targetPath, value))
                    .then(stat => [stat, value])
            );
        }
        return Promise
            .all(dirList)
            .then(list => list.filter(i => !!i).map(([stat, value]) => ({
                filename: value,
                isFile: stat.isFile(),
                isDirectory: stat.isDirectory(),
            })));
    }

    methodGet() {
        const { absoluteRoot, server, historyApiFallback } = this.config;
        this.app.get("*", (req, res) => {
            const currentPath = path.resolve(absoluteRoot, req.url.slice(1));
            this.getStat(currentPath)
                .then((stat) => {
                    if (stat.isFile()) {
                        return this.fileHandler(req, res, {
                            targetPath: currentPath,
                            stat,
                        });
                    } else if (!server && stat.isDirectory()) {
                        const dir = path.relative(absoluteRoot, currentPath);
                        const data = [{
                            filename: "/",
                            path: "/",
                            icon: icon.back,
                        }];
                        if (dir) {
                            data.push({
                                filename: "../",
                                path:
                                    "/" + path.relative(absoluteRoot, path.resolve(currentPath, "../")),
                                icon: icon.back,
                            })
                        }

                        return this.getFolderList(currentPath)
                            .then((folderList) => {

                                const files = data;
                                folderList.forEach(i => {
                                    i.path = `${dir ? `/${dir}` : ""}/${i.filename}`;
                                    i.icon = i.isFile ? icon.file : icon.folder;
                                    files.push(i);
                                });

                                res.statusCode = 200;
                                res.setHeader("Content-Type", "text/html; charset=utf-8");
                                res.end(
                                    ejs.render(template, {
                                        files,
                                        title: "/" + dir,
                                    })
                                );
                            });
                    } else if (server && stat.isDirectory()) {
                        // 服务器模式，404 情况跳转到默认页面；
                        const defaultServerPath = path.resolve(absoluteRoot, historyApiFallback);
                        return this.getStat(defaultServerPath).then(s => {
                            s.isFile() && this.fileHandler(req, res, {
                                targetPath: defaultServerPath,
                                stat: s,
                            });
                        })
                    }

                    return Promise.reject();
                })
                .catch((e) => {
                    if (e instanceof Error) {
                        console.error(
                            chalk.redBright("[wherever]"),
                            e.name + ": ", e.message
                        );
                    }
                    this.notFound(res);
                });
        });
    }
    
    // methodPost() {
    //     const { absoluteRoot } = this.config;
    //     this.app.post("*", (req, res) => {
    //         const currentPath = path.resolve(absoluteRoot, req.url.slice(1));
    //         this.getStat(currentPath)
    //             .then(stat => {
    //                 if (stat.isDirectory()) {
    //                     return this.getFolderList(currentPath).then(list => {
    //                         res.send(list);
    //                         res.statusCode = 200;
    //                         res.setHeader("Content-Type", "application/json; charset=utf-8");
    //                         res.end();
    //                     });
    //                 }
    //                 return Promise.reject();
    //             })
    //             .catch(() => {
    //                 this.notFound(res);
    //             });
    //     });
    // }
}
