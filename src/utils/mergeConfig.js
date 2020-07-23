'use strict';

const fs = require('fs');
const path = require('path');
const conf = require('../config/wherever.default.config');

module.exports = function (config) {
  const cwd = process.cwd();
  let custom = {};
  if (typeof config.config === 'string') {
    const customConfig = path.join(cwd, config.config);
    if (fs.existsSync(customConfig)) custom = require(customConfig);
  } else {
    const jsConfig = path.join(cwd, 'wherever.config.js');
    const jsonConfig = path.join(cwd, 'wherever.config.json');
    if (fs.existsSync(jsConfig)) custom = require(jsConfig);
    else if (fs.existsSync(jsonConfig)) custom = require(jsonConfig);
  }

  const result = Object.assign({}, conf, config, custom);
  return result;
};
