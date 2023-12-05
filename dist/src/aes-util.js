"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AESUtil = void 0;
var crypto_1 = require("crypto");
var AESUtil = /** @class */ (function () {
    function AESUtil() {
    }
    AESUtil.encrypt = function (plainText, passphrase, ivHex) {
        if (ivHex === void 0) { ivHex = '879db4a13f4b69b363f7fe987f44c030'; }
        var iv = Buffer.from(ivHex, 'hex');
        var key = (0, crypto_1.scryptSync)(passphrase, 'salt', 32);
        var cipher = (0, crypto_1.createCipheriv)('aes-256-cbc', Buffer.from(key), iv);
        var encryptedText = cipher.update(plainText, 'utf-8', 'base64');
        encryptedText += cipher.final('base64');
        return encryptedText;
    };
    AESUtil.decrypt = function (encryptedText, passphrase, ivHex) {
        if (ivHex === void 0) { ivHex = '879db4a13f4b69b363f7fe987f44c030'; }
        var iv = Buffer.from(ivHex, 'hex');
        var key = (0, crypto_1.scryptSync)(passphrase, 'salt', 32);
        var decipher = (0, crypto_1.createDecipheriv)('aes-256-cbc', Buffer.from(key), iv);
        var decryptedText = decipher.update(encryptedText, 'base64', 'utf-8');
        decryptedText += decipher.final('utf-8');
        return decryptedText;
    };
    AESUtil.computeHmac = function (data, key) {
        var hmac = (0, crypto_1.createHmac)('sha256', key);
        hmac.update(data);
        var digest = hmac.digest('base64');
        return digest;
    };
    return AESUtil;
}());
exports.AESUtil = AESUtil;
