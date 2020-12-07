"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rndIV = void 0;
var randHex_1 = require("./randHex");
function rndIV() {
    return randHex_1.randHex(512);
}
exports.rndIV = rndIV;
