import { pedersen } from '@scure/starknet'
// Calculate hashes for v0 - v2 transactions
import {
  type StarknetChainId,
  TransactionHashPrefix,
} from '../../../strk-types/constants.js'
import type { BigNumberish, RawCalldata } from '../../../strk-types/lib.js'
import { toBigInt } from '../../../strk-utils/num.js'
import { getSelector } from '../selector.js'

export function computeHashOnElements(data: BigNumberish[]): string {
  return [...data, data.length]
    .reduce(
      (x: BigNumberish, y: BigNumberish) => pedersen(toBigInt(x), toBigInt(y)),
      0,
    )
    .toString()
}

export function calculateTransactionHashCommon(
  txHashPrefix: TransactionHashPrefix,
  version: BigNumberish,
  contractAddress: BigNumberish,
  entryPointSelector: BigNumberish,
  calldata: RawCalldata,
  maxFee: BigNumberish,
  chainId: StarknetChainId,
  additionalData: BigNumberish[] = [],
): string {
  const calldataHash = computeHashOnElements(calldata)
  const dataToHash = [
    txHashPrefix,
    version,
    contractAddress,
    entryPointSelector,
    calldataHash,
    maxFee,
    chainId,
    ...additionalData,
  ]
  return computeHashOnElements(dataToHash)
}

export function calculateDeclareTransactionHash(
  classHash: string,
  senderAddress: BigNumberish,
  version: BigNumberish,
  maxFee: BigNumberish,
  chainId: StarknetChainId,
  nonce: BigNumberish,
  compiledClassHash?: string,
): string {
  return calculateTransactionHashCommon(
    TransactionHashPrefix.DECLARE,
    version,
    senderAddress,
    0,
    [classHash],
    maxFee,
    chainId,
    [nonce, ...(compiledClassHash ? [compiledClassHash] : [])],
  )
}

export function calculateDeployAccountTransactionHash(
  contractAddress: BigNumberish,
  classHash: BigNumberish,
  constructorCalldata: RawCalldata,
  salt: BigNumberish,
  version: BigNumberish,
  maxFee: BigNumberish,
  chainId: StarknetChainId,
  nonce: BigNumberish,
) {
  const calldata = [classHash, salt, ...constructorCalldata]

  return calculateTransactionHashCommon(
    TransactionHashPrefix.DEPLOY_ACCOUNT,
    version,
    contractAddress,
    0,
    calldata,
    maxFee,
    chainId,
    [nonce],
  )
}

export function calculateTransactionHash(
  contractAddress: BigNumberish,
  version: BigNumberish,
  calldata: RawCalldata,
  maxFee: BigNumberish,
  chainId: StarknetChainId,
  nonce: BigNumberish,
): string {
  return calculateTransactionHashCommon(
    TransactionHashPrefix.INVOKE,
    version,
    contractAddress,
    0,
    calldata,
    maxFee,
    chainId,
    [nonce],
  )
}

export function calculateL2MessageTxHash(
  l1FromAddress: BigNumberish,
  l2ToAddress: BigNumberish,
  l2Selector: string | BigNumberish,
  l2Calldata: RawCalldata,
  l2ChainId: StarknetChainId,
  l1Nonce: BigNumberish,
): string {
  const payload = [l1FromAddress, ...l2Calldata]
  return calculateTransactionHashCommon(
    TransactionHashPrefix.L1_HANDLER,
    0,
    l2ToAddress,
    getSelector(l2Selector),
    payload,
    0,
    l2ChainId,
    [l1Nonce],
  )
}
