import { AESUtils, EtherUtils } from './index'

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
  const encrypted = AESUtils.encrypt(input, 'key')
  const origin = AESUtils.decrypt(encrypted, 'key')
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

const testEther = (): boolean => {
  const input = randomInput()
  const keyPair = EtherUtils.generateKeyPair()
  const signature = EtherUtils.signMessage(input, keyPair.privateKey)
  const verifySignature = EtherUtils.verifySignature(
    input,
    signature,
    keyPair.publicKey,
  )
  // console.log(
  //   `
  //   testEther:
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
    console.log(`Test ${start}: ${testAes() && testEther()}`)
    // console.log(AESUtils.computeHmac(randomInput(), 'key'))
    test(end, start + 1)
  }
}
test(10)
