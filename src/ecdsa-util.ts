import * as elliptic from 'elliptic'
import { KeyPair } from './model'

export class EcdsaUtil {
  public static generateKeyPair(): KeyPair {
    const ec = new elliptic.ec('secp256k1')
    const keyPair = ec.genKeyPair()
    const publicKey = keyPair.getPublic('hex')
    const privateKey = keyPair.getPrivate('hex')
    return {
      privateKey: privateKey,
      publicKey: publicKey,
    }
  }

  public static verifySignature(
    message: string,
    signature: string,
    publicKey: string,
  ): boolean {
    const ec = new elliptic.ec('secp256k1')
    const keyPair = ec.keyFromPublic(publicKey, 'hex')
    const isSignatureValid = keyPair.verify(message, signature)
    return isSignatureValid
  }

  public static signMessage(message: string, privateKey: string): string {
    const ec = new elliptic.ec('secp256k1')
    const keyPair = ec.keyFromPrivate(privateKey, 'hex')
    const signature = keyPair.sign(message)
    return signature.toDER('hex')
  }
}
