"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcdsaUtil = void 0;
const secp256k1_1 = require("@noble/curves/secp256k1");
const utils_1 = require("@noble/hashes/utils");
class EcdsaUtil {
    static generateKeyPair() {
        const privKey = secp256k1_1.secp256k1.utils.randomPrivateKey();
        const pubKey = secp256k1_1.secp256k1.getPublicKey(privKey);
        return {
            privateKey: (0, utils_1.bytesToHex)(privKey),
            publicKey: (0, utils_1.bytesToHex)(pubKey),
        };
    }
    static verifySignature(message, signature, publicKey) {
        const signatureBytes = secp256k1_1.secp256k1.Signature.fromDER(signature);
        return secp256k1_1.secp256k1.verify(signatureBytes, (0, utils_1.utf8ToBytes)(message), (0, utils_1.hexToBytes)(publicKey));
    }
    static signMessage(message, privateKey) {
        const signature = secp256k1_1.secp256k1.sign((0, utils_1.utf8ToBytes)(message), (0, utils_1.hexToBytes)(privateKey));
        return signature.toDERHex();
    }
}
exports.EcdsaUtil = EcdsaUtil;
