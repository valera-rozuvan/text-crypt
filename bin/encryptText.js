"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptText = void 0;
var crypto = __importStar(require("crypto"));
function encryptText(encryptionDetails, text) {
    var _a = encryptionDetails.split(':'), algorithm = _a[0], secretKeyRaw = _a[1], ivRaw = _a[2];
    var secretKey = crypto.createHash('sha256').update(String(secretKeyRaw)).digest('base64').substr(0, 32);
    var iv = Buffer.from(ivRaw, 'hex');
    var cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    var encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return encrypted.toString('hex');
}
exports.encryptText = encryptText;
