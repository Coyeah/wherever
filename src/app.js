'use strict'

const http = require('http');
const path = require('path');
const chalk = require('chalk');

const conf = require('./config/defaultConfig');
const route = require('./helper/route');
const upload = require('./helper/upload');
const openUrl = require('./helper/openUrl');
const ipAdress = require('./config/ipAdress');

class Server {
  constructor(config) {
    this.conf = Object.assign({}, conf, config);
  }

  start() {
    const server = http.createServer((req, res) => {
      let filePath = path.join(this.conf.root, req.url);
      if (this.conf.upload) {
        upload(req, res, filePath, this.conf);
      } else {
        if (this.conf.server) {
          filePath = filePath.split('?')[0];
          if (req.url === '/') filePath = `${filePath}index.html`;
        }
        route(req, res, filePath, this.conf);
      }
    });
    const serverCb = () => {
      const addr = `http://${this.conf.hostname || ipAdress}:${this.conf.port}`;
      const local = `http://localhost:${this.conf.port}`
      console.log(`\n${chalk.whiteBright('[wherever]')} | Server started at ${chalk.green(addr)}`);
      console.log(`           | Server started at ${chalk.green(local)}\n`)
      if (this.conf.open) openUrl(addr);
    };
    if (!!this.conf.hostname) {
      server.listen(this.conf.port, this.conf.hostname, serverCb);
    } else {
      server.listen(this.conf.port, serverCb);
    }
  }
}

module.exports = Server;
