import { KeyPair } from './model';
export declare class Ed25519Util {
    static generateKeyPair(): KeyPair;
    static verifySignature(message: string, signature: string, publicKey: string): boolean;
    static signMessage(message: string, privateKey: string): string;
}
