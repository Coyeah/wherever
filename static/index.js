"use strict";

const getArgv = require("./argv");
const Server = require("./main");

(function () {
    // const argv = getArgv();
    const s = new Server();
    s.start();
})();

