import type {
  EDataAvailabilityMode,
  ETransactionVersion,
  ResourceBounds,
} from '@starknet-io/types-js'
import type {
  AllowArray,
  BigNumberish,
  BlockIdentifier,
  Call,
  DeclareContractPayload,
  DeployAccountContractPayload,
  TransactionType,
  UniversalDeployerContractPayload,
  V3TransactionDetails,
} from './lib.js'
import type {
  DeclareTransactionReceiptResponse,
  EstimateFeeResponse,
} from './provider.js'

export interface EstimateFee extends EstimateFeeResponse {}

export type EstimateFeeBulk = EstimateFee[]

// TODO: This is too wide generic with optional params
export type AccountInvocationsFactoryDetails = {
  versions: `${ETransactionVersion}`[]
  nonce?: BigNumberish
  blockIdentifier?: BlockIdentifier
  skipValidate?: boolean
} & Partial<V3TransactionDetails>

export interface UniversalDetails {
  nonce?: BigNumberish
  blockIdentifier?: BlockIdentifier
  maxFee?: BigNumberish // ignored on estimate
  tip?: BigNumberish
  paymasterData?: BigNumberish[]
  accountDeploymentData?: BigNumberish[]
  nonceDataAvailabilityMode?: EDataAvailabilityMode
  feeDataAvailabilityMode?: EDataAvailabilityMode
  version?: BigNumberish
  resourceBounds?: ResourceBounds // ignored on estimate
  skipValidate?: boolean // ignored on non-estimate
}

export interface EstimateFeeDetails extends UniversalDetails {}

export interface DeployContractResponse {
  contract_address: string
  transaction_hash: string
}

export type MultiDeployContractResponse = {
  contract_address: string[]
  transaction_hash: string
}

export type DeployContractUDCResponse = {
  contract_address: string
  transaction_hash: string
  address: string
  deployer: string
  unique: string
  classHash: string
  calldata_len: string
  calldata: string[]
  salt: string
}

export type DeclareDeployUDCResponse = {
  declare: {
    class_hash: BigNumberish
  } & Partial<DeclareTransactionReceiptResponse>
  deploy: DeployContractUDCResponse
}

export type SimulateTransactionDetails = {
  nonce?: BigNumberish
  blockIdentifier?: BlockIdentifier
  skipValidate?: boolean
  skipExecute?: boolean
} & Partial<V3TransactionDetails>

export type EstimateFeeAction =
  | {
      type: typeof TransactionType.INVOKE
      payload: AllowArray<Call>
    }
  | {
      type: typeof TransactionType.DECLARE
      payload: DeclareContractPayload
    }
  | {
      type: typeof TransactionType.DEPLOY_ACCOUNT
      payload: DeployAccountContractPayload
    }
  | {
      type: typeof TransactionType.DEPLOY
      payload: UniversalDeployerContractPayload
    }

export type StarkProfile = {
  name?: string
  profilePicture?: string
  discord?: string
  twitter?: string
  github?: string
  proofOfPersonhood?: boolean
}
