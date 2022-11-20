#!/usr/bin/env node

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var arg_1 = __importDefault(require("arg"));
var text_crypt_1 = require("text-crypt");
var APP_NAME = 'text-crypt-cli';
var APP_VERSION = '0.0.1';
var args = arg_1.default({
    // Types
    '--help': Boolean,
    '--version': Boolean,
    '--generate-rnd-iv': Boolean,
    '--encrypt': Boolean,
    '--decrypt': Boolean,
    '--crypt-opts': String,
    '--text': String,
    // Aliases
    '-v': '--version',
    '-h': '--help',
    '-i': '--generate-rnd-iv',
    '-e': '--encrypt',
    '-d': '--decrypt',
    '-o': '--crypt-opts',
    '-t': '--text',
});
function generalHelp() {
    console.log("\n    -h|--help     Shows this information.\n    -v|--version  Shows version.\n\n    -i|--generate-rnd-iv  Generates a random initialization vector.\n    -e|--encrypt          Performs encryption operation.\n    -d|--decrypt          Performs decryption operation.\n\n    -o|--crypt-opts \"string\"  Options to be used for crypto function. See below.\n\n    -t|--text \"string\"  Text that should be encrypted or decrypted.\n  ");
}
function cryptOptsHelp() {
    console.log("\n    Argument '--crypt-opts' expects a string in the format \"{crypt func}:{password str}:{iv str}\".\n    Supported \"{crypt func}\" is 'aes-256-ctr'.\n    Minimum \"{password str}\" length is 1.\n\n    You can pass the '--generate-rnd-iv' argument to generate a random \"{iv str}\".\n\n    Example of a valid '--crypt-opts' string:\n\n      \"aes-256-ctr:NQoJYMIH:7d617955ba28cd5569d226f12518799b\"\n  ");
}
function missingArgHelp(argName) {
    console.log("\n    Please provide '" + argName + "' argument to program.\n  ");
}
var cryptOpts = null;
if (args['--crypt-opts']) {
    cryptOpts = args['--crypt-opts'];
    var opts = cryptOpts.split(':');
    if (!opts || opts.length !== 3 || opts[0] !== 'aes-256-ctr' || (typeof opts[1] === 'string' && opts[1].length === 0)) {
        cryptOptsHelp();
        process.exit();
    }
}
var text = null;
if (args['--text']) {
    text = args['--text'];
}
if (args['--help']) {
    console.log('Help:');
    generalHelp();
    console.log('Details:');
    cryptOptsHelp();
}
else if (args['--version']) {
    console.log("\n    " + APP_NAME + " - v" + APP_VERSION + "\n  ");
}
else if (args['--generate-rnd-iv']) {
    console.log(text_crypt_1.rndIV());
}
else if (args['--encrypt']) {
    if (cryptOpts === null) {
        missingArgHelp('--crypt-opts');
        process.exit();
    }
    else if (text === null) {
        missingArgHelp('--text');
        process.exit();
    }
    console.log(text_crypt_1.encryptText(cryptOpts, text));
}
else if (args['--decrypt']) {
    if (cryptOpts === null) {
        missingArgHelp('--crypt-opts');
        process.exit();
    }
    else if (text === null) {
        missingArgHelp('--text');
        process.exit();
    }
    console.log(text_crypt_1.decryptText(cryptOpts, text));
}
else {
    console.log("\n    Program expects arguments. Try passing '--help'.\n  ");
}
