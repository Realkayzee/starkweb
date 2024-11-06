import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Abi } from '../../strk-types/abi.js'
import type { BlockTag } from '../../strk-types/lib.js'
import { calldataToHex, compile } from '../../strk-utils/calldata/compile.js'
import { getSelectorFromName } from '../../strk-utils/hash/selector.js'
import type { Chain } from '../../types/chain.js'
import type { Hash } from '../../types/misc.js'
import { type CallParameters, call } from './call.js'

export type PrimaryReadContractParameters = {
  address: string
  abi: Abi
  functionName: string
  args?: any[]
}

export type SecondaryReadContractParameters =
  | {
      blockHash?: Hash | undefined
      blockNumber?: undefined
      blockTag?: undefined
    }
  | {
      blockHash?: undefined
      blockNumber?: number | undefined
      blockTag?: undefined
    }
  | {
      blockHash?: undefined
      blockNumber?: undefined
      blockTag?: BlockTag | undefined
    }
  | {
      blockHash?: Hash | undefined
      blockNumber?: number | undefined
      blockTag?: BlockTag | undefined
    }

export type ReadContractParameters = PrimaryReadContractParameters &
  SecondaryReadContractParameters

export type ReadContractReturnTypes = any
export type ReadContractErrorType = any

export async function readContract<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  parameters: ReadContractParameters,
): Promise<ReadContractReturnTypes | ReadContractErrorType> {
  const { address, functionName, args, blockHash, blockNumber, blockTag } =
    parameters
  const calldata: string[] = args ? compile(args) : []

  const txCall: CallParameters = {
    contract_address: address,
    entry_point_selector: getSelectorFromName(functionName),
    calldata: calldataToHex(calldata),
    block_hash: blockHash,
    block_number: blockNumber,
    block_tag: blockTag,
  }

  return call(client, txCall)
}
