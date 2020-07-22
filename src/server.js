'use strict'

const http = require('http');
const path = require('path');
const chalk = require('chalk');

const openUrl = require('./utils/openUrl');
const mergeConfig = require('./utils/mergeConfig');
const main = require('./main');

class Server {
  constructor(config) {
    this.config = mergeConfig(config);
  }

  start() {
    const server = http.createServer((req, res) => {
      let filePath = path.join(this.config.root, req.url);
      if (this.config.server) {
        filePath = filePath.split('?')[0];
        if (req.url === '/') filePath = `${filePath}${this.config.main}`;
      }
      main(req, res, filePath, this.config);
    });
    const serverCb = () => {
      const addr = `http://${this.config.hostname}:${this.config.port}`;
      const local = `http://localhost:${this.config.port}`;
      console.log(`\n${chalk.whiteBright('[wherever]')} | Server started at ${chalk.green(addr)}`);
      console.log(`           | Server started at ${chalk.green(local)}\n`);
      if (this.config.open) openUrl(addr);
    }
    server.listen(this.config.port, serverCb);
  }
}

module.exports = Server;