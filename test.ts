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
          '2669ef4e064cfaf78fd1d18354861a68a5120798358a1316b4179819f90c1ab8',
        publicKey:
          '6edcfb33abdc4130109d190f2c36b6a770d4e2ebd3a969bc0d788b6f391bb124',
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
    // console.log(
    //   `Test: ${Ed25519Util.verifySignature(
    //     'test',
    //     'a0c926a583bb62e6d83e3f6e7afa186af35b58c452896f95dddaa3e161cc7075972aefa1476cc4f554237495bd6a8f94118dc20d0728fb5e6443a4357dae460e',
    //     '55cfeb3c1b053aed29291ee38483f22f78844010ea975e66c94f3724e7689114',
    //   )}`,
    // )
    test(random, log, end, start + 1)
  }
}
test(false, true, 1)
