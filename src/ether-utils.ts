import * as ethUtil from 'ethereumjs-util'
import Wallet from 'ethereumjs-wallet'
import { KeyPair } from './model'

export class EtherUtils {
  public static generateKeyPair(): KeyPair {
    const wallet = Wallet.generate()
    const publicKey = wallet.getPublicKeyString()
    const privateKey = wallet.getPrivateKeyString()
    const address = wallet.getAddressString()
    return {
      privateKey: privateKey,
      publicKey: publicKey,
      address: address,
    }
  }

  private static remove0xIfNeedHex(hex: string): string {
    return hex.startsWith('0x') ? hex.slice(2) : hex
  }

  private static add0xIfNeedHex(hex: string): string {
    return hex.startsWith('0x') ? hex : `0x${hex}`
  }

  public static verifySignature(
    message: string,
    signature: string,
    publicKey: string,
  ): boolean {
    const messageHash = ethUtil.keccak256(Buffer.from(message))
    const ecdsaSignature = ethUtil.fromRpcSig(signature)
    const recoveredPublicKey = ethUtil.ecrecover(
      messageHash,
      ecdsaSignature.v,
      ecdsaSignature.r,
      ecdsaSignature.s,
    )
    return (
      ethUtil.bufferToHex(recoveredPublicKey) === this.add0xIfNeedHex(publicKey)
    )
  }

  public static signMessage(message: string, privateKey: string): string {
    const privateKeyBuffer = Buffer.from(
      this.remove0xIfNeedHex(privateKey),
      'hex',
    )
    const messageHash = ethUtil.keccak256(Buffer.from(message))
    const signature = ethUtil.ecsign(messageHash, privateKeyBuffer)
    return ethUtil.toRpcSig(signature.v, signature.r, signature.s)
  }
}
