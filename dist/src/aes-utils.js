"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AESUtils = void 0;
const crypto_1 = require("crypto");
class AESUtils {
    static encrypt(plainText, passphrase, ivHex = '879db4a13f4b69b363f7fe987f44c030') {
        const iv = Buffer.from(ivHex, 'hex');
        const key = (0, crypto_1.scryptSync)(passphrase, 'salt', 32);
        const cipher = (0, crypto_1.createCipheriv)('aes-256-cbc', Buffer.from(key), iv);
        let encryptedText = cipher.update(plainText, 'utf-8', 'hex');
        encryptedText += cipher.final('hex');
        return encryptedText;
    }
    static decrypt(encryptedText, passphrase, ivHex = '879db4a13f4b69b363f7fe987f44c030') {
        const iv = Buffer.from(ivHex, 'hex');
        const key = (0, crypto_1.scryptSync)(passphrase, 'salt', 32);
        const decipher = (0, crypto_1.createDecipheriv)('aes-256-cbc', Buffer.from(key), iv);
        let decryptedText = decipher.update(encryptedText, 'hex', 'utf-8');
        decryptedText += decipher.final('utf-8');
        return decryptedText;
    }
    static computeHmac(data, key) {
        const hmac = (0, crypto_1.createHmac)('sha256', key);
        hmac.update(data);
        const digest = hmac.digest('hex');
        return digest;
    }
}
exports.AESUtils = AESUtils;
