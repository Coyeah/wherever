'use strict';

module.exports = function (req, res, options) {
  const {
    parse: { pathname = '' },
    proxy,
    config,
  } = options;
  const { proxy: proxyConfig } = config;
  const proxyConfigKeys = Object.keys(proxyConfig);
  for (let i = 0; i < proxyConfigKeys.length; i++) {
    const key = proxyConfigKeys[i];
    const { target, pathRewrite = {} } = proxyConfig[key];
    if (pathname.startsWith(key)) {
      Object.keys(pathRewrite).map((k) => {
        req.url = req.url.replace(new RegExp(k), pathRewrite[k]);
      });
      proxy.web(req, res, {
        target,
      });
      return true;
    }
  }
  return false;
};
