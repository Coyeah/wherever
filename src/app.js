'use strict'

const http = require('http');
const path = require('path');
const chalk = require('chalk');

const conf = require('./config/defaultConfig');
const route = require('./helper/route');
const openUrl = require('./helper/openUrl');

class Server {
  constructor(config) {
    this.conf = Object.assign({}, conf, config);
  }

  start() {
    const server = http.createServer((req, res) => {
      let filePath = path.join(this.conf.root, req.url);
      if (this.conf.server) {
        filePath = filePath.split('?')[0];
      }
      route(req, res, filePath, this.conf);
    });

    server.listen(this.conf.port, this.conf.hostname, () => {
      const addr = `http://${this.conf.hostname}:${this.conf.port}`;
      console.log(`${chalk.whiteBright('[wherever]')} Server started at ${chalk.green(addr)}`);
      if (this.conf.open) {
        openUrl(addr);
      }
    });
  }
}

module.exports = Server;
