const ipAdress = require('./ipAdress');

module.exports = {
  main: 'index.html',
  hostname: ipAdress || '127.0.0.1',
  port: 3000,
  root: process.cwd(),  // process.cwd() 当前Node.js进程执行时的工作目录
  compress: /\.(html|js|css|md)/,
  cache: {
    maxAge: 600,
    expires: true,
    cacheControl: true,
    lastModified: true,
    etag: true,
  }
};
