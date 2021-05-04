// rollup.config.js
const terser = require("rollup-plugin-terser").terser;

module.exports = {
    input: "src/index.js",
    output: {
        file: "lib/index.js",
        format: "cjs",
    },
    plugins: [terser()],
    external: [
        "yargs",
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
    ], // <-- suppresses the warning
};
