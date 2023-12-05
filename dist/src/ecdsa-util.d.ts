import { KeyPair } from './model';
export declare class EcdsaUtil {
    static generateKeyPair(): KeyPair;
    static verifySignature(message: string, signature: string, publicKey: string): boolean;
    static signMessage(message: string, privateKey: string): string;
}
