import { AESUtil, EcdsaUtil, Ed25519Util } from './index'

const randomInput = (length: number = 128): string => {
  const characters =
    '0123456789abcdefghijklmnopqrstuvwxyz"`~!@#$%^&*()_+-=[]{}|;:,./<>?'
  let result = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters.charAt(randomIndex)
  }
  return result
}

const testAes = (random: boolean, log: boolean): boolean => {
  const input = random ? randomInput() : 'input'
  const passphrase = random ? randomInput() : 'key'
  const encrypted = AESUtil.encrypt(input, passphrase)
  const origin = AESUtil.decrypt(encrypted, passphrase)
  if (log) {
    console.log(
      `-------------------------AES------------------------
    input = ${input}
    passphrase = ${passphrase}
    encrypted = ${encrypted}
    isPass = ${input === origin}`,
    )
  }
  return input === origin
}

const testEd25519 = (random: boolean, log: boolean): boolean => {
  const input = random ? randomInput() : 'input'
  const keyPair = random
    ? Ed25519Util.generateKeyPair()
    : {
        privateKey:
          '60c73ca3245185119ba2f84682aef2afe9fabdf2ca090c8ba7e36bd2c65b09b2',
        publicKey:
          '341407b5c98ca46137a75c59b9dbe7675f0d34ca61f6602f4550a85ed0329f1e',
      }
  const signature = Ed25519Util.signMessage(input, keyPair.privateKey)
  const verifySignature = Ed25519Util.verifySignature(
    input,
    signature,
    keyPair.publicKey,
  )
  if (log) {
    console.log(
      `-------------------------ED25519------------------------
    input = ${input}
    keyPair = ${JSON.stringify(keyPair)}
    signature = ${signature}
    verifySignature = ${verifySignature}`,
    )
  }
  return verifySignature
}

const testEcdsa = (random: boolean, log: boolean): boolean => {
  const input = random ? randomInput() : 'input'
  const keyPair = random
    ? EcdsaUtil.generateKeyPair()
    : {
        privateKey:
          '530f8afbc74536b9a963b4f1c4cb738bcea7403d4d606b6e074ec5d3baf39d18',
        publicKey:
          '04ad3c1460f9fd72d2d5096d658c2d702d69e676852991db6489ef55bca2c7273cc56114abb5fd57a9b215c95b0e478b6781f559fef4ba7303dda5a9f4e7fd01f2',
      }
  const signature = EcdsaUtil.signMessage(input, keyPair.privateKey)
  const verifySignature = EcdsaUtil.verifySignature(
    input,
    signature,
    keyPair.publicKey,
  )
  if (log) {
    console.log(
      `-------------------------ECDSA------------------------
    input = ${input}
    keyPair = ${JSON.stringify(keyPair)}
    signature = ${signature}
    verifySignature = ${verifySignature}`,
    )
  }
  return verifySignature
}

const test = (
  random: boolean,
  log: boolean,
  end: number,
  start: number = 1,
) => {
  if (start <= end) {
    console.log(
      `Test ${start}: ${
        testAes(random, log) &&
        testEcdsa(random, log) &&
        testEd25519(random, log)
      }`,
    )
    test(random, log, end, start + 1)
  }
}
test(true, false, 1000)
