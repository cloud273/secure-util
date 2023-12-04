import {
  createCipheriv,
  createDecipheriv,
  createHmac,
  scryptSync,
} from 'crypto'

export class AESUtils {
  public static encrypt(
    plainText: string,
    passphrase: string,
    ivHex = '879db4a13f4b69b363f7fe987f44c030',
  ): string {
    const iv = Buffer.from(ivHex, 'hex')
    const key = scryptSync(passphrase, 'salt', 32)
    const cipher = createCipheriv('aes-256-cbc', Buffer.from(key), iv)
    let encryptedText = cipher.update(plainText, 'utf-8', 'hex')
    encryptedText += cipher.final('hex')
    return encryptedText
  }

  public static decrypt(
    encryptedText: string,
    passphrase: string,
    ivHex = '879db4a13f4b69b363f7fe987f44c030',
  ): string {
    const iv = Buffer.from(ivHex, 'hex')
    const key = scryptSync(passphrase, 'salt', 32)
    const decipher = createDecipheriv('aes-256-cbc', Buffer.from(key), iv)
    let decryptedText = decipher.update(encryptedText, 'hex', 'utf-8')
    decryptedText += decipher.final('utf-8')
    return decryptedText
  }

  public static computeHmac(data: string, key: string): string {
    const hmac = createHmac('sha256', key)
    hmac.update(data)
    const digest = hmac.digest('hex')
    return digest
  }
}
