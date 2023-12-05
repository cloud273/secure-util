"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AESUtil = void 0;
var CryptoJS = require("crypto-js");
var AESUtil = /** @class */ (function () {
    function AESUtil() {
    }
    AESUtil.encrypt = function (plainText, passphrase) {
        return CryptoJS.AES.encrypt(plainText, passphrase).toString();
    };
    AESUtil.decrypt = function (encryptedText, passphrase) {
        var bytes = CryptoJS.AES.decrypt(encryptedText, passphrase);
        return bytes.toString(CryptoJS.enc.Utf8);
    };
    return AESUtil;
}());
exports.AESUtil = AESUtil;
