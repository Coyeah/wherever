const yargs = require('yargs');
const Server = require('./app');

const argv = yargs
  .usage('wherever [options]')
  .option('p', {
    alias: 'port',
    describe: '端口号',
    default: 3000
  })
  .option('n', {
    alias: 'hostname',
    describe: '服务器IP地址',
    default: '127.0.0.1',
  })
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
    demand: true,
  })
  .option('o', {
    alias: 'open',
    describe: '打开网址',
    type: 'boolean',
    default: false,
    demand: true,
  })
  .option('d', {
    alias: 'download',
    describe: '文件下载模式',
    type: 'boolean',
    default: false,
    demand: true,
  })
  .option('i', {
    alias: 'image',
    describe: '图片base64转换模式',
    type: 'boolean',
    default: false,
    demand: true,
  })
  .alias('v', 'version')
  .version()
  .help()
  .argv;

const server = new Server(argv);
server.start();
