import * as CryptoJS from 'crypto-js'

export class AESUtil {
  public static encrypt(plainText: string, passphrase: string): string {
    return CryptoJS.AES.encrypt(plainText, passphrase).toString()
  }

  public static decrypt(encryptedText: string, passphrase: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedText, passphrase)
    return bytes.toString(CryptoJS.enc.Utf8)
  }
}
