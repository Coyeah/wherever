'use strict';

const Server = require('./server');
const config = require('../wherever.config.json');

const server = new Server(config);
server.start();
