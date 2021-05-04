import { readFileSync } from 'fs';
import { networkInterfaces } from 'os'; // 在开发环境中获取局域网中的本机iP地址
import path from 'path';

const interfaces = networkInterfaces();

let ipAdress = '';
for (let key in interfaces) {
    let iface = interfaces[key];
    for (let i = 0; i < iface.length; i++) {
        let alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
            ipAdress = alias.address;
        }
    }
}

export const readConfig = (ownPath) => {
    const target = path.resolve(process.cwd(), ownPath);
    let result = {};
    try {
        result = readFileSync(target, 'utf-8');
        result = JSON.parse(result);
    } catch (e) {
    }
    return result;
}

export const defaultConfig = {
    main: 'index.html',
    hostname: ipAdress || '127.0.0.1',
    port: 3000,
    root: './',
    compress: /\.(html|js|css|md)/,
    historyApiFallback: 'index.html',
}