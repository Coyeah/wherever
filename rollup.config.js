// rollup.config.js

const commonObject = {
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
}

module.exports = [{
    input: "src/main.js",
    output: {
        file: "lib/main.js",
        format: "cjs",
        exports: "auto"
    },
    ...commonObject,
}, {

    input: "src/argv.js",
    output: {
        file: "lib/argv.js",
        format: "cjs",
        exports: "auto"
    },
    ...commonObject,
}];