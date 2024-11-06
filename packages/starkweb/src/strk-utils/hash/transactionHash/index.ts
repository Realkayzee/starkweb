import {
  type EDAMode,
  ETransactionVersion,
  type ETransactionVersion2,
  type ETransactionVersion3,
  type ResourceBounds,
} from '@starknet-io/types-js'
import type { StarknetChainId } from '../../../strk-types/constants.js'
import type { BigNumberish, Calldata } from '../../../strk-types/lib.js'
import {
  calculateDeclareTransactionHash as v2calculateDeclareTransactionHash,
  calculateDeployAccountTransactionHash as v2calculateDeployAccountTransactionHash,
  calculateTransactionHash as v2calculateInvokeTransactionHash,
} from './v2.js'
import {
  calculateDeclareTransactionHash as v3calculateDeclareTransactionHash,
  calculateDeployAccountTransactionHash as v3calculateDeployAccountTransactionHash,
  calculateInvokeTransactionHash as v3calculateInvokeTransactionHash,
} from './v3.js'

// biome-ignore lint/performance/noBarrelFile: <explanation>
export { calculateL2MessageTxHash } from './v2.js'

type Version = typeof ETransactionVersion.V3 | typeof ETransactionVersion.F3

type CalcV2InvokeTxHashArgs = {
  senderAddress: BigNumberish
  version: `${ETransactionVersion2}`
  compiledCalldata: Calldata
  maxFee: BigNumberish
  chainId: StarknetChainId
  nonce: BigNumberish
}

type CalcV3InvokeTxHashArgs = {
  senderAddress: BigNumberish
  version: `${ETransactionVersion3}`
  compiledCalldata: Calldata
  chainId: StarknetChainId
  nonce: BigNumberish
  accountDeploymentData: BigNumberish[]
  nonceDataAvailabilityMode: EDAMode
  feeDataAvailabilityMode: EDAMode
  resourceBounds: ResourceBounds
  tip: BigNumberish
  paymasterData: BigNumberish[]
}

type CalcInvokeTxHashArgs = CalcV2InvokeTxHashArgs | CalcV3InvokeTxHashArgs

function isV3InvokeTx(
  args: CalcInvokeTxHashArgs,
): args is CalcV3InvokeTxHashArgs {
  return [ETransactionVersion.V3, ETransactionVersion.F3].includes(
    args.version as Version,
  )
}

export function calculateInvokeTransactionHash(args: CalcInvokeTxHashArgs) {
  if (isV3InvokeTx(args)) {
    return v3calculateInvokeTransactionHash(
      args.senderAddress,
      args.version,
      args.compiledCalldata,
      args.chainId,
      args.nonce,
      args.accountDeploymentData,
      args.nonceDataAvailabilityMode,
      args.feeDataAvailabilityMode,
      args.resourceBounds,
      args.tip,
      args.paymasterData,
    )
  }
  return v2calculateInvokeTransactionHash(
    args.senderAddress,
    args.version,
    args.compiledCalldata,
    args.maxFee,
    args.chainId,
    args.nonce,
  )
}

type CalcV2DeclareTxHashArgs = {
  classHash: string
  senderAddress: BigNumberish
  version: `${ETransactionVersion2}`
  maxFee: BigNumberish
  chainId: StarknetChainId
  nonce: BigNumberish
  compiledClassHash?: string
}

type CalcV3DeclareTxHashArgs = {
  classHash: string
  compiledClassHash: string
  senderAddress: BigNumberish
  version: `${ETransactionVersion3}`
  chainId: StarknetChainId
  nonce: BigNumberish
  accountDeploymentData: BigNumberish[]
  nonceDataAvailabilityMode: EDAMode
  feeDataAvailabilityMode: EDAMode
  resourceBounds: ResourceBounds
  tip: BigNumberish
  paymasterData: BigNumberish[]
}

type CalcDeclareTxHashArgs = CalcV2DeclareTxHashArgs | CalcV3DeclareTxHashArgs

// DECLARE TX HASH
function isV3DeclareTx(
  args: CalcDeclareTxHashArgs,
): args is CalcV3DeclareTxHashArgs {
  return [ETransactionVersion.V3, ETransactionVersion.F3].includes(
    args.version as Version,
  )
}

export function calculateDeclareTransactionHash(args: CalcDeclareTxHashArgs) {
  if (isV3DeclareTx(args)) {
    return v3calculateDeclareTransactionHash(
      args.classHash,
      args.compiledClassHash,
      args.senderAddress,
      args.version,
      args.chainId,
      args.nonce,
      args.accountDeploymentData,
      args.nonceDataAvailabilityMode,
      args.feeDataAvailabilityMode,
      args.resourceBounds,
      args.tip,
      args.paymasterData,
    )
  }

  return v2calculateDeclareTransactionHash(
    args.classHash,
    args.senderAddress,
    args.version,
    args.maxFee,
    args.chainId,
    args.nonce,
    args.compiledClassHash,
  )
}

// DEPLOY ACCOUNT TX HASH

function isV3DeployAccountTx(
  args: CalcDeployAccountTxHashArgs,
): args is CalcV3DeployAccountTxHashArgs {
  return [ETransactionVersion.V3, ETransactionVersion.F3].includes(
    args.version as Version,
  )
}

type CalcV2DeployAccountTxHashArgs = {
  contractAddress: BigNumberish
  classHash: BigNumberish
  constructorCalldata: Calldata
  salt: BigNumberish
  version: `${ETransactionVersion2}`
  maxFee: BigNumberish
  chainId: StarknetChainId
  nonce: BigNumberish
}

type CalcV3DeployAccountTxHashArgs = {
  contractAddress: BigNumberish
  classHash: BigNumberish
  compiledConstructorCalldata: Calldata
  salt: BigNumberish
  version: `${ETransactionVersion3}`
  chainId: StarknetChainId
  nonce: BigNumberish
  nonceDataAvailabilityMode: EDAMode
  feeDataAvailabilityMode: EDAMode
  resourceBounds: ResourceBounds
  tip: BigNumberish
  paymasterData: BigNumberish[]
}

type CalcDeployAccountTxHashArgs =
  | CalcV2DeployAccountTxHashArgs
  | CalcV3DeployAccountTxHashArgs

export function calculateDeployAccountTransactionHash(
  args: CalcDeployAccountTxHashArgs,
) {
  if (isV3DeployAccountTx(args)) {
    return v3calculateDeployAccountTransactionHash(
      args.contractAddress,
      args.classHash,
      args.compiledConstructorCalldata,
      args.salt,
      args.version,
      args.chainId,
      args.nonce,
      args.nonceDataAvailabilityMode,
      args.feeDataAvailabilityMode,
      args.resourceBounds,
      args.tip,
      args.paymasterData,
    )
  }

  return v2calculateDeployAccountTransactionHash(
    args.contractAddress,
    args.classHash,
    args.constructorCalldata,
    args.salt,
    args.version,
    args.maxFee,
    args.chainId,
    args.nonce,
  )
}
