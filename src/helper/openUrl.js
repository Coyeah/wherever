const {exec} = require('child_process');

module.exports = url => {
  // process.platform 标识 Node.js 进程运行其上的操作系统平台
  switch (process.platform) {
    case 'darvin': {
      exec(`open ${url}`);
      break;
    }
    case 'win32': {
      exec(`start ${url}`);
      break;
    }
  }
};
