import { secp256k1 } from '@noble/curves/secp256k1'
import { bytesToHex, hexToBytes, utf8ToBytes } from '@noble/hashes/utils'
import { KeyPair } from './model'

export class EcdsaUtil {
  public static generateKeyPair(): KeyPair {
    const privKey = secp256k1.utils.randomPrivateKey()
    const pubKey = secp256k1.getPublicKey(privKey)
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
    const signatureBytes = secp256k1.Signature.fromDER(signature)
    return secp256k1.verify(
      signatureBytes,
      utf8ToBytes(message),
      hexToBytes(publicKey),
    )
  }

  public static signMessage(message: string, privateKey: string): string {
    const signature = secp256k1.sign(
      utf8ToBytes(message),
      hexToBytes(privateKey),
    )
    return signature.toDERHex()
  }
}
