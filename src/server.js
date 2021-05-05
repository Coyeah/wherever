"use strict";

import {
    statSync,
    readdirSync,
    readFileSync,
    createReadStream
} from 'fs';
import path from 'path';
import chalk from "chalk";
import ejs from "ejs";
import mime from 'mime-types';
import express from 'express';
import {
    createProxyMiddleware
} from 'http-proxy-middleware';

import {
    defaultConfig,
    readConfig
} from "./common/config";
import icon from "./common/icon";
import {
    tryTo,
    openUrl,
} from "./utils/tools";
import {
    isFresh
} from './utils/cache';
import range from './utils/range';
import compress from './utils/compress';

const CWD = process.cwd();
const tplPath = path.join(__dirname, './dir.ejs');
const source = readFileSync(tplPath, 'utf-8');

class Server {
    constructor(argv) {
        const {
            port,
            root,
            config,
            open,
            server,
        } = argv;

        const configFile = config ? readConfig(config) : {};

        this.config = Object.assign({}, defaultConfig, {
            root,
            port,
            open,
            server,
        }, configFile);

        this.config.targetPath = path.resolve(CWD, this.config.root);

        this.app = express();

        this.app.use((req, res, next) => {
            console.info(chalk.whiteBright('[wherever]'), `${chalk.greenBright(`[${req.method}]`)}`, req.url);
            next();
        });
    }
    
    sendFile(req, res, {
        filePath,
        stats,
    }) {
        const contentType = mime.lookup(filePath); // 获取文件类型识别
        res.setHeader('Content-Type', `${contentType}; charset=utf-8`);
        // 是否有缓存
        if (isFresh(stats, req, res)) {
            res.statusCode = 304;
            res.end();
            return;
        }

        // 请求返回文件，文档流形式
        let rs;
        const {
            code,
            start,
            end
        } = range(stats.size, req, res); // 判断是否断点续连，若否则 code = 200，start & end 为空

        if (code === 200) {
            res.statusCode = 200;
            rs = createReadStream(filePath); // 创建一个读取操作的数据流，用于大型文本文件
        } else {
            res.statusCode = 206;
            rs = createReadStream(filePath, {
                start,
                end,
            });
        }

        if (filePath.match(this.config.compress)) {
            rs = compress(rs, req, res);
        }
        rs.pipe(res);
    }

    start() {
        const {
            targetPath,
            proxy,
            historyApiFallback,
            server,
        } = this.config;

        if (proxy && proxy.toString() === '[object Object]') {
            Object.keys(proxy).map(key => {
                this.app.use(key, createProxyMiddleware(proxy[key].target, proxy[key]));
            });
        }

        this.app.get("*", (req, res) => {
            const route = req.url.slice(1);
            const filePath = path.resolve(targetPath, route);
            const stats = tryTo(() => statSync(filePath), null);

            if (!stats) {
                this.notFound(res);
                return;
            }

            if (stats.isFile()) {
                this.sendFile(req, res, {
                    filePath,
                    stats,
                });
                return;
            } else if (!server && stats.isDirectory()) {
                const files = readdirSync(filePath);
                const dir = path.relative(targetPath, filePath);
                const fileData = [];

                if (dir) {
                    fileData.push({
                        file: '../',
                        path: '/' + path.relative(targetPath, path.resolve(filePath, '../')),
                        icon: icon.back
                    });
                }
                for (let i = 0; i < files.length; ++i) {
                    const value = files[i];
                    const target = statSync(path.join(filePath, value));
                    fileData.push({
                        file: value,
                        path: `${dir ? `/${dir}` : ''}/${value}`,
                        icon: target.isFile() ? icon.file : icon.folder,
                    });
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                res.end(ejs.render(source, {
                    files: fileData,
                    title: '/' + dir,
                }));
                return;
            } else if (server && stats.isDirectory()) {
                const p = path.resolve(filePath, historyApiFallback || "index.html");
                const s = tryTo(() => statSync(p), null);
                if (s && s.isFile()) {
                    this.sendFile(req, res, {
                        filePath: p,
                        stats: s,
                    });
                    return;
                }
            }
            this.notFound(res);
        });

        this.listen();
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
            console.info(chalk.whiteBright('[wherever]'), "|", `Server started at ${chalk.green(addr)}`);
            console.info("          ", "|", `Server started at ${chalk.green(local)}`)
            console.info();

            if (this.config.open) openUrl(addr);
        })
    }
}

export default Server;