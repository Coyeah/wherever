const interfaces = require('os').networkInterfaces();  // 在开发环境中获取局域网中的本机iP地址

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

module.exports = ipAdress;
