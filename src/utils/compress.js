'use strict'

const {
  createGzip,
  createDeflate
} = require('zlib'); // zlib 模块提供通过 Gzip 和 Deflate/Inflate 实现的压缩功能

module.exports = (rs, req, res) => {
  const acceptEncoding = req.headers['accept-encoding']; // 获取内容编码方式，即压缩算法
  if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) { // 无压缩方式
    return rs;
  } else if (acceptEncoding.match(/\bgzip\b/)) {
    res.setHeader('Content-Encoding', 'gzip');
    return rs.pipe(createGzip()); // pipe：把当前的可读流和另外一个可写流连接，可读流中的数据会被自动写入可写流中
  } else if (acceptEncoding.match(/\deflate\b/)) {
    res.setHeader('Conten-Encoding', 'deflate');
    return rs.pipe(createDeflate());
  }
};