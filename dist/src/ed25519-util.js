"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ed25519Util = void 0;
const ed25519_1 = require("@noble/curves/ed25519");
const utils_1 = require("@noble/hashes/utils");
class Ed25519Util {
    static generateKeyPair() {
        const privKey = ed25519_1.ed25519.utils.randomPrivateKey();
        const pubKey = ed25519_1.ed25519.getPublicKey(privKey);
        return {
            privateKey: (0, utils_1.bytesToHex)(privKey),
            publicKey: (0, utils_1.bytesToHex)(pubKey),
        };
    }
    static verifySignature(message, signature, publicKey) {
        return ed25519_1.ed25519.verify((0, utils_1.hexToBytes)(signature), (0, utils_1.utf8ToBytes)(message), (0, utils_1.hexToBytes)(publicKey));
    }
    static signMessage(message, privateKey) {
        const signature = ed25519_1.ed25519.sign((0, utils_1.utf8ToBytes)(message), (0, utils_1.hexToBytes)(privateKey));
        return (0, utils_1.bytesToHex)(signature);
    }
}
exports.Ed25519Util = Ed25519Util;
