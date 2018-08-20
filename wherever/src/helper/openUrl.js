const {exec} = require('child_process');

module.exports = url => {
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
}
