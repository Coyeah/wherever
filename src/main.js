'use strict';

const fs = require('fs'); // File System[https://nodejs.org/api/fs.html]
const path = require('path');
const promisify = require('util').promisify; // 程序使用 promisify() 转换基于回调函数的方法 fs.readFile() 成一个返回promise的一个函数
const stat = promisify(fs.stat); // fs.Stats 对象提供了一个文件的信息
const readdir = promisify(fs.readdir); // fs.readdir 读取一个目录的内容

const Handlebars = require('handlebars');
const mime = require('mime-types');

const createDownloadConfig = require('./config/download.config');
const range = require('./utils/range');
const compress = require('./utils/compress');
const isFresh = require('./utils/cache');
const handleProxy = require('./utils/proxy');

const tplPath = path.join(__dirname, './template/dir.tpl');
const source = fs.readFileSync(tplPath, 'utf-8');
const template = Handlebars.compile(source);

async function main(req, res, options) {
  const { filePath, parse, config, proxy } = options;

  // 处理存在代理情况
  let isDone = !!proxy && handleProxy(req, res, options);
  if (isDone) return;

  try {
    const stats = await stat(filePath);
    if (stats.isFile()) {
      if (config.download) {
        // 文件下载模式
        const downloadConfig = createDownloadConfig({
          filename: filePath.split('\\').pop(),
          size: stats.size,
        });
        Object.keys(downloadConfig).map((key) => {
          res.setHeader(key, downloadConfig[key]);
        });
        fs.createReadStream(filePath).pipe(res);
        return;
      }

      const contentType = mime.lookup(filePath); // 获取文件类型识别
      res.setHeader('Content-Type', `${contentType}; charset=utf-8`);

      if (isFresh(stats, req, res)) {
        // 是否有缓存
        res.statusCode = 304;
        res.end();
        return;
      }

      // 请求返回文件，文档流形式
      let rs;
      const { code, start, end } = range(stats.size, req, res); // 判断是否断点续连，若否则 code = 200，start & end 为空

      if (code === 200) {
        res.statusCode = 200;
        rs = fs.createReadStream(filePath); // 创建一个读取操作的数据流，用于大型文本文件
      } else {
        res.statusCode = 206;
        rs = fs.createReadStream(filePath, {
          start,
          end,
        });
      }

      if (filePath.match(config.compress)) {
        rs = compress(rs, req, res);
      }
      rs.pipe(res);
    } else if (stats.isDirectory()) {
      // 判断路径指向是否为文件目录，若无缓存则之间添加缓存
      const files = await readdir(filePath);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');

      const dir = path.relative(config.root, filePath);
      let fileData = [];
      for (let i = 0; i < files.length; ++i) {
        const value = files[i];
        const target = await stat(path.join(filePath, value));
        fileData.push({
          file: value,
          icon: target.isFile() ? 'file-text-o' : 'folder-o',
        });
      }

      const data = {
        files: fileData,
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : '',
      };
      res.end(template(data));
    } else {
      throw Error();
    }
  } catch (err) {
    if (
      config.server &&
      filePath !== 'index.html' &&
      req.headers.accept.indexOf('text/html') >= 0 &&
      req.method === 'GET'
    ) {
      main(req, res, {
        ...options,
        filePath: config.historyApiFallback,
      });
    } else {
      console.error(err);
      res.statusCode = 404;
      res.end(`${filePath} is not a directory or file! \n ${err}`);
    }
  }
}

module.exports = main;
