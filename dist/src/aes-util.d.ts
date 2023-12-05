export declare class AESUtil {
    static encrypt(plainText: string, passphrase: string, ivHex?: string): string;
    static decrypt(encryptedText: string, passphrase: string, ivHex?: string): string;
    static computeHmac(data: string, key: string): string;
}
