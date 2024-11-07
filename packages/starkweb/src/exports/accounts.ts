export type { Address } from 'abitype'

// biome-ignore lint/performance/noBarrelFile: entrypoint module
export { HDKey } from '@scure/bip32'
export { wordlist as czech } from '@scure/bip39/wordlists/czech'
export { wordlist as english } from '@scure/bip39/wordlists/english'
export { wordlist as french } from '@scure/bip39/wordlists/french'
export { wordlist as italian } from '@scure/bip39/wordlists/italian'
export { wordlist as japanese } from '@scure/bip39/wordlists/japanese'
export { wordlist as korean } from '@scure/bip39/wordlists/korean'
export { wordlist as simplifiedChinese } from '@scure/bip39/wordlists/simplified-chinese'
export { wordlist as spanish } from '@scure/bip39/wordlists/spanish'
export { wordlist as traditionalChinese } from '@scure/bip39/wordlists/traditional-chinese'

export {
  type GenerateMnemonicErrorType,
  generateMnemonic,
} from '../accounts/generateMnemonic.js'
export {
  type GeneratePrivateKeyErrorType,
  generatePrivateKey,
} from '../accounts/generatePrivateKey.js'
export {
  type HDKeyToAccountOptions,
  type HDKeyToAccountErrorType,
  hdKeyToAccount,
} from '../accounts/hdKeyToAccount.js'
export {
  type MnemonicToAccountOptions,
  type MnemonicToAccountErrorType,
  mnemonicToAccount,
} from '../accounts/mnemonicToAccount.js'
export {
  type PrivateKeyToAccountOptions,
  type PrivateKeyToAccountErrorType,
  privateKeyToAccount,
} from '../accounts/privateKeyToAccount.js'
export { type ToAccountErrorType, toAccount } from '../accounts/toAccount.js'
export type {
  Account,
  AccountSource,
  CustomSource,
  HDOptions,
  JsonRpcAccount,
  LocalAccount,
  HDAccount,
  PrivateKeyAccount,
} from '../accounts/types.js'
export {
  type SignErrorType,
  type SignParameters,
  type SignReturnType,
  sign,
} from '../accounts/utils/sign.js'
export {
  type ParseAccountErrorType,
  parseAccount,
} from '../accounts/utils/parseAccount.js'
export {
  type PublicKeyToAddressErrorType,
  publicKeyToAddress,
} from '../accounts/utils/publicKeyToAddress.js'
export {
  type PrivateKeyToAddressErrorType,
  privateKeyToAddress,
} from '../accounts/utils/privateKeyToAddress.js'
