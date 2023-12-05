"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.EcdsaUtil = void 0;
var elliptic = __importStar(require("elliptic"));
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
