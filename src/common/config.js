import path from "path";
import { readFileSync } from "fs";
import getIpAdress from "../utils/ipAdress";

export const defaultConfig = {
    main: "index.html",
    hostname: getIpAdress() || "127.0.0.1",
    port: 3000,
    root: "./",
    compress: /\.(html|js|css|md)/,
    historyApiFallback: "index.html",
};

export const CWD = process.cwd();

export const template = readFileSync(
    path.join(__dirname, "./dir.ejs"),
    "utf-8"
);
