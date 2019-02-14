const yargs = require('yargs');
const Server = require('./app');

const argv = yargs
  .usage('wherever [options]')
  .option('p', {
    alias: 'port',
    describe: '端口号',
    default: 3000
  })
  .option('h', {
    alias: 'hostname',
    describe: '服务器IP地址',
    default: '127.0.0.1',
  })
  .option('r', {
    alias: 'root',
    describe: '根目录',
    default: process.cwd(),
  })
  .version()
  .alias('v', 'version')
  .help()
  .argv;

const server = new Server(argv);
server.start();
