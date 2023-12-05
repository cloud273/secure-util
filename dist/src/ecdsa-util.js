"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcdsaUtil = void 0;
var elliptic = require("elliptic");
var EcdsaUtil = /** @class */ (function () {
    function EcdsaUtil() {
    }
    EcdsaUtil.generateKeyPair = function () {
        var ec = new elliptic.ec('secp256k1');
        var keyPair = ec.genKeyPair();
        var publicKey = keyPair.getPublic('hex');
        var privateKey = keyPair.getPrivate('hex');
        return {
            privateKey: privateKey,
            publicKey: publicKey,
        };
    };
    EcdsaUtil.verifySignature = function (message, signature, publicKey) {
        var ec = new elliptic.ec('secp256k1');
        var keyPair = ec.keyFromPublic(publicKey, 'hex');
        var isSignatureValid = keyPair.verify(message, signature);
        return isSignatureValid;
    };
    EcdsaUtil.signMessage = function (message, privateKey) {
        var ec = new elliptic.ec('secp256k1');
        var keyPair = ec.keyFromPrivate(privateKey, 'hex');
        var signature = keyPair.sign(message);
        return signature.toDER('hex');
    };
    return EcdsaUtil;
}());
exports.EcdsaUtil = EcdsaUtil;
