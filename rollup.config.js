// rollup.config.js
module.exports = {
    input: "src/index.js",
    output: {
        file: "lib/index.js",
        format: "cjs",
    },
    plugins: [require("rollup-plugin-terser").terser()],
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
    ],
};
