'use strict';

const http = require('http');
const path = require('path');
const chalk = require('chalk');
const url = require('url');

const httpProxy = require('http-proxy');

const openUrl = require('./utils/openUrl');
const mergeConfig = require('./utils/mergeConfig');
const main = require('./main');

class Server {
  constructor(config) {
    this.config = mergeConfig(config);
    if (!!this.config.proxy) this.proxy = httpProxy.createProxyServer();
  }

  start() {
    const server = http.createServer((req, res) => {
      const parse = url.parse(req.url);
      let filePath = parse.pathname;
      if (this.config.server) {
        if (filePath === '/') filePath = `${filePath}${this.config.main}`;
      }
      filePath = path.join(this.config.root, filePath);

      console.log(`${chalk.greenBright(`[ ${req.method} ]`)}`, req.url);
      main(req, res, {
        ...this,
        filePath,
        parse,
      });
    });
    const serverCb = () => {
      const addr = `http://${this.config.hostname}:${this.config.port}`;
      const local = `http://localhost:${this.config.port}`;
      console.log(`\n${chalk.whiteBright('[wherever]')} | Server started at ${chalk.green(addr)}`);
      console.log(`           | Server started at ${chalk.green(local)}\n`);
      if (this.config.open) openUrl(addr);
    };
    server.listen(this.config.port, serverCb);
  }
}

module.exports = Server;
