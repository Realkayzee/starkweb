import type { Abi, FunctionAbi } from './abi'

type ExtractFunctions<T> = T extends { type: 'function' }
  ? T
  : T extends { type: 'interface'; items: infer Items }
    ? Items extends FunctionAbi[]
      ? Items[number]
      : never
    : never

export type ContractFunctions<TAbi extends Abi> = {
  [K in ExtractFunctions<TAbi[number]> as K['name']]: K
}
