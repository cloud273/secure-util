import { AESUtil, EcdsaUtil } from './index'

const randomInput = (): string => {
  const characters =
    '0123456789abcdefghijklmnopqrstuvwxyz"`~!@#$%^&*()_+-=[]{}|;:,./<>?'
  let result = ''
  for (let i = 0; i < 4096; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters.charAt(randomIndex)
  }
  return result
}

const testAes = (): boolean => {
  const input = randomInput()
  const encrypted = AESUtil.encrypt(input, 'key')
  const origin = AESUtil.decrypt(encrypted, 'key')
  // console.log(
  //   `
  //   testAES:
  //   input = ${input}
  //   encrypted = ${encrypted}
  //   origin = ${origin}

  // `,
  // )
  return input === origin
}

const testEcdsa = (): boolean => {
  const input = randomInput()
  const keyPair = EcdsaUtil.generateKeyPair()
  const signature = EcdsaUtil.signMessage(input, keyPair.privateKey)
  const verifySignature = EcdsaUtil.verifySignature(
    input,
    signature,
    keyPair.publicKey,
  )
  // console.log(
  //   `
  //   testEcdsa:
  //   input = ${input}
  //   keyPair = ${JSON.stringify(keyPair)}
  //   signature = ${signature}
  //   verifySignature = ${verifySignature}
  // `,
  // )
  return verifySignature
}

const test = (end: number, start: number = 1) => {
  if (start <= end) {
    console.log(`Test ${start}: ${testAes() && testEcdsa()}`)
    // console.log(AESUtils.computeHmac(randomInput(), 'key'))
    test(end, start + 1)
  }
}
test(10)
