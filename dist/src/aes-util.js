"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AESUtil = void 0;
const CryptoJS = require("crypto-js");
class AESUtil {
    static encrypt(plainText, passphrase) {
        return CryptoJS.AES.encrypt(plainText, passphrase).toString();
    }
    static decrypt(encryptedText, passphrase) {
        const bytes = CryptoJS.AES.decrypt(encryptedText, passphrase);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
}
exports.AESUtil = AESUtil;
