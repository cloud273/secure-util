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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EtherUtils = void 0;
const ethUtil = __importStar(require("ethereumjs-util"));
const ethereumjs_wallet_1 = __importDefault(require("ethereumjs-wallet"));
class EtherUtils {
    static generateKeyPair() {
        const wallet = ethereumjs_wallet_1.default.generate();
        const publicKey = wallet.getPublicKeyString();
        const privateKey = wallet.getPrivateKeyString();
        const address = wallet.getAddressString();
        return {
            privateKey: privateKey,
            publicKey: publicKey,
            address: address,
        };
    }
    static remove0xIfNeedHex(hex) {
        return hex.startsWith('0x') ? hex.slice(2) : hex;
    }
    static add0xIfNeedHex(hex) {
        return hex.startsWith('0x') ? hex : `0x${hex}`;
    }
    static verifySignature(message, signature, publicKey) {
        const messageHash = ethUtil.keccak256(Buffer.from(message));
        const ecdsaSignature = ethUtil.fromRpcSig(signature);
        const recoveredPublicKey = ethUtil.ecrecover(messageHash, ecdsaSignature.v, ecdsaSignature.r, ecdsaSignature.s);
        return (ethUtil.bufferToHex(recoveredPublicKey) === this.add0xIfNeedHex(publicKey));
    }
    static signMessage(message, privateKey) {
        const privateKeyBuffer = Buffer.from(this.remove0xIfNeedHex(privateKey), 'hex');
        const messageHash = ethUtil.keccak256(Buffer.from(message));
        const signature = ethUtil.ecsign(messageHash, privateKeyBuffer);
        return ethUtil.toRpcSig(signature.v, signature.r, signature.s);
    }
}
exports.EtherUtils = EtherUtils;
