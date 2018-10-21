const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;  // 程序使用promisify()转换基于回调函数的方法fs.readFile()成一个返回promise的一个函数
const stat = promisify(fs.stat);  // fs.Stats 对象提供了一个文件的信息
const readdir = promisify(fs.readdir);  // fs.readdir 读取一个目录的内容
const Handlebars = require('handlebars');

const mime = require('./mime');
const isFresh = require('./cache');
const range = require('./range');
const compress = require('./compress');

const tplPath = path.join(__dirname, '../template/dir.tpl');
const source = fs.readFileSync(tplPath, 'utf-8');
const template = Handlebars.compile(source);

module.exports = async function (req, res, filePath, config) {
  try {
    const stats = await stat(filePath);
    if (stats.isFile()) {  // 判断路径指向是否为文件
      const contentType = mime(filePath);  // 获取文件类型识别
      res.setHeader('Content-Type', `${contentType}; charset=utf-8`);

      if (isFresh(stats, req, res)) {
        res.statusCode = 304;
        res.end();
        return;
      }

      let rs;
      const {
        code,
        start,
        end
      } = range(stats.size, req, res);  // 判断是否断点续连，若否则 code = 200，start & end 为空

      if (code === 200) {
        res.statusCode = 200;
        rs = fs.createReadStream(filePath);  // 创建一个读取操作的数据流，用于大型文本文件
      } else {
        res.statusCode = 206;
        rs = fs.createReadStream(filePath, {
          start,
          end
        });
      }

      if (filePath.match(config.compress)) {
        rs = compress(rs, req, res);
      }
      rs.pipe(res);
    } else if (stats.isDirectory()) {  // 判断路径指向是否为文件目录，若无缓存则之间添加缓存
      const files = await readdir(filePath);
      res.statusCode = 200;

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      const dir = path.relative(config.root, filePath); // 该方法返回第二个路径相对于第一个路径的相对路径
      const data = {
        files: files.map(value => {
          return {
            file: value,
            icon: mime(value)
          };
        }),
        title: path.basename(filePath),
        dir: dir ? `/${dir}`: ''
      };
      res.end(template(data));
    }
  } catch (err) {
    console.error(err);
    res.statusCode = 404;
    res.end(`${filePath} is not a directory or file!\n ${err}`);
  }
};
