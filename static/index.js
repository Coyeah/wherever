"use strict";

const argv = require("./argv");
const Server = require("./main");

(function () {
    const s = new Server(argv);
    s.start();
})();

