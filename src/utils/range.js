module.exports = (totalSize, req, res) => {
  const range = req.headers['range']; // Range 断点续连
  if (!range) {
    return { code: 200 };
  }

  // Range: bytes=[first byte pos]-[last byte pos]
  const sizes = range.match(/bytes=(\d*)-(\d*)/);
  const end = sizes[2] || totalSize - 1;
  const start = sizes[1] || totalSize - end;

  if (start > end || start < 0 || end > totalSize) {
    return { code: 200 };
  }

  res.setHeader('Accept-Rangs', 'bytes');
  res.setHeader('Content-Type', `bytes ${start}-${end}/${totalSize}`);
  res.setHeader('Content-Length', end - start);
  return {
    code: 206,
    start: parseInt(start),
    end: parseInt(end),
  };
};
