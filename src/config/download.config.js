'use strict'

module.exports = function ({
  filename,
  size,
}) {
  return {
    'Content-Type': 'application/octet-stream',
    'Content-Disposition': `attachment; filename=${filename}`,
    'Content-Length': size,
  }
}