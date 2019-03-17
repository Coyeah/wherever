const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;  // 程序使用 promisify() 转换基于回调函数的方法 fs.readFile() 成一个返回promise的一个函数
const stat = promisify(fs.stat);  // fs.Stats 对象提供了一个文件的信息

const mime = require('./mime');
const isFresh = require('./cache');
const range = require('./range');
const compress = require('./compress');

const tplPath = path.join(__dirname, '../template/upload');

module.exports = async function (req, res, filePath, config) {
  try {
    let uploadPath = path.join(tplPath, req.url).split('?')[0];
    if (req.url === '/') uploadPath += 'index.html';
    if (req.url.indexOf('/upload') === 0 && req.method === 'POST') {
      let chunks = [], size = 0;
      req.on('data', function (datachunk) {
        chunks.push(datachunk);
        size += datachunk.length;
      });
      req.on('end', function () {
        if (!size) {
          res.statusCode = 404;
          res.end();
          return;
        }
        let buffer = Buffer.concat(chunks, size);  // 最终流的内容主体
        let rems = [];  // 新建数组接收出去 \r \n 的数据下标
        // 根据 \r \n 分离数据和报头
        for (let i = 0; i < buffer.length; i++) {
          let n = buffer[i];
          let r = buffer[i + 1];
          // 10 表示 \n & 13 表示 \r
          if (n == 13 && r == 10) {
            rems.push(i);
          }
        }
        // 获取上传的文件信息
        let fileinfo = buffer.slice(rems[0] + 2, rems[1]).toString();
        let filename = fileinfo.match(/filename=".*"/g)[0].split('"')[1];
        // 获取上传的文件数据
        let filedata = buffer.slice(rems[3] + 2, rems[rems.length -2]);
        let address = path.join(config.root ,req.url.slice(7), filename);
        //创建空文件并写入内容
        fs.writeFileSync(address, filedata, {encoding: 'utf8'})
        res.statusCode = 200;
        res.end();
      });
    } else {
      const stats = await stat(uploadPath);
      const contentType = mime(uploadPath);
      res.setHeader('Content-Type', `${contentType}; charset=utf-8`);

      if (isFresh(stats, req, res)) {  // 是否有缓存
        res.statusCode = 304;
        res.end();
        return;
      }

      let rs;
      const { code, start, end } = range(stats.size, req, res);  // 判断是否断点续连，若否则 code = 200，start & end 为空
      if (code === 200) {
        res.statusCode = 200;
        rs = fs.createReadStream(uploadPath);  // 创建一个读取操作的数据流，用于大型文本文件
      } else {
        res.statusCode = 206;
        rs = fs.createReadStream(uploadPath, {
          start,
          end
        });
      }

      if (uploadPath.match(config.compress)) {
        rs = compress(rs, req, res);
      }
      rs.pipe(res);
    }
  } catch (err) {
    console.log('Error >> ', err);
  }
}
