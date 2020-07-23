'use strict';

const yargs = require('yargs');
const Server = require('./server');

const argv = yargs
  .usage('wherever [options]')
  .option('p', {
    alias: 'port',
    describe: '端口号',
    default: 3000,
  })
  // .option('n', {
  //   alias: 'hostname',
  //   describe: '服务器IP地址',
  // })
  .option('r', {
    alias: 'root',
    describe: '根目录',
    default: process.cwd(),
  })
  .option('s', {
    alias: 'server',
    describe: '静态资源服务器模式',
    type: 'boolean',
    default: false,
  })
  .option('o', {
    alias: 'open',
    describe: '打开网址',
    type: 'boolean',
    default: false,
  })
  .option('d', {
    alias: 'download',
    describe: '文件下载模式',
    type: 'boolean',
    default: false,
  })
  .option('c', {
    alias: 'config',
    describe: '配置文件',
  })
  .alias('v', 'version')
  .version()
  .help().argv;

const server = new Server(argv);
server.start();
