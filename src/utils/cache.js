const cache = {
    maxAge: 600,
    expires: true,
    cacheControl: true,
    lastModified: true,
    etag: true,
};

export function refreshRes(stats, res) {
    const { maxAge, expires, cacheControl, lastModified, etag } = cache;

    if (expires) {
        // 服务器告诉浏览器缓存数据的过期时间
        res.setHeader('Expires', new Date(Date.now() + maxAge * 1000).toUTCString());
    }

    if (cacheControl) {
        // 服务器告诉浏览器一个过期的相对时间
        res.setHeader('Cache-Control', `public, max-age=${maxAge}`);
    }

    if (lastModified) {
        // 值为该文件的最近修改时间
        res.setHeader('Last-Modified', stats.mtime.toUTCString());
    }

    if (etag) {
        // 唯一标识符ETag
        res.setHeader('ETag', `${stats.size}-${stats.mtime.toUTCString()}`);
    }
}

export function isFresh(stats, req, res) {
    refreshRes(stats, res);

    const lastModified = req.headers['if-modified-since'];
    const etag = req.headers['is-none-match'];

    if (!lastModified && !etag) return false;

    if (lastModified && lastModified !== res.getHeader('Last-Modified')) return false;

    if (etag && etag !== res.getHeader('ETag')) return false;

    return true;
};
