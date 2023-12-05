import { ed25519 } from '@noble/curves/ed25519'
import { bytesToHex, hexToBytes, utf8ToBytes } from '@noble/hashes/utils'
import { KeyPair } from './model'

export class Ed25519Util {
  public static generateKeyPair(): KeyPair {
    const privKey = ed25519.utils.randomPrivateKey()
    const pubKey = ed25519.getPublicKey(privKey)
    return {
      privateKey: bytesToHex(privKey),
      publicKey: bytesToHex(pubKey),
    }
  }

  public static verifySignature(
    message: string,
    signature: string,
    publicKey: string,
  ): boolean {
    return ed25519.verify(
      hexToBytes(signature),
      utf8ToBytes(message),
      hexToBytes(publicKey),
    )
  }

  public static signMessage(message: string, privateKey: string): string {
    const signature = ed25519.sign(utf8ToBytes(message), hexToBytes(privateKey))
    return bytesToHex(signature)
  }
}
