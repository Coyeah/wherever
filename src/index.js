"use strict";

import yargs from "yargs";
import { defaultConfig } from "./common/config";
import Server from './server';

const argv = yargs
    .usage("wherever [options]")
    .option("p", {
        alias: "port",
        describe: "端口号",
        type: "number",
        default: defaultConfig.port,
    })
    .option("r", {
        alias: "root",
        describe: "根目录",
        type: "string",
        default: defaultConfig.root,
    })
    .option("s", {
        alias: "server",
        describe: "静态资源服务器模式",
        type: "boolean",
        default: false,
    })
    .option("o", {
        alias: "open",
        describe: "打开网址",
        type: "boolean",
        default: false,
    })
    .option("c", {
        alias: "config",
        describe: "配置文件",
    })
    .version()
    .help().argv;

(function () {
    const s = new Server(argv);
    s.start();
})();
