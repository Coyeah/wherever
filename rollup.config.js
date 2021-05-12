// rollup.config.js
module.exports = {
    input: "src/Server.js",
    output: {
        file: "lib/Server.js",
        format: "cjs",
        exports: "auto"
    },
    plugins: [require("rollup-plugin-terser").terser()],
    external: [
        "fs",
        "path",
        "chalk",
        "ejs",
        "mime-types",
        "express",
        "http-proxy-middleware",
        "os",
        "child_process",
        "zlib",
    ],
};