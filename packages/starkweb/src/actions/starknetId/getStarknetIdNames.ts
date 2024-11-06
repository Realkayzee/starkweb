import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { StarknetChainId } from '../../constants/starknet.js'
import { compile } from '../../strk-utils/calldata/compile.js'
import { getSelectorFromName } from '../../strk-utils/hash/selector.js'
import type { Account } from '../../types/account.js'
import type { Chain } from '../../types/chain.js'
import type { StarknetIdContracts } from '../../types/starknetId.js'
import type { Prettify } from '../../types/utils.js'
import {
  getIdentityContract,
  getMulticallContract,
  getNamingContract,
} from '../../utils/starknetId/utils.js'
import { decodeDomain } from '../../utils/starknetId/utils.js'

export type GetStarknetIdNamesParameters = Prettify<{
  /** Addresses to get the names for. */
  addresses: string[]
  /** Optional multicall contract address. */
  multicallContract?: string
}>

export type GetStarknetIdNamesReturnType = string[]

export type GetStarknetIdNamesErrorType = Error

export async function getStarknetIdNames<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  { addresses, multicallContract }: GetStarknetIdNamesParameters,
): Promise<GetStarknetIdNamesReturnType> {
  const chainId = client.chain?.id as unknown as StarknetChainId
  if (!chainId) {
    throw new Error('Chain ID is required')
  }
  let StarknetIdContract!: StarknetIdContracts
  StarknetIdContract = StarknetIdContract ?? {
    identity: getIdentityContract(chainId),
    naming: getNamingContract(chainId),
  }

  const multicallAddress = multicallContract ?? getMulticallContract(chainId)

  if (!StarknetIdContract.naming || !multicallAddress) {
    throw new Error(`Contract addresses not found for chain ID: ${chainId}`)
  }

  try {
    const calldata = getStarknamesCalldata(addresses, StarknetIdContract.naming)
    const result = await client.request({
      method: 'starknet_call',
      params: {
        request: {
          contract_address: multicallAddress,
          entry_point_selector: getSelectorFromName('aggregate'),
          calldata: compile([calldata]),
        },
        block_id: 'latest',
      },
    })

    if (Array.isArray(result)) {
      return result.map((hexDomain: any) => {
        const decimalDomain = hexDomain
          .map((element: string) => BigInt(element))
          .slice(1)
        return decodeDomain(decimalDomain)
      })
    }

    throw new Error('Invalid response from contract call')
  } catch (error) {
    throw new Error(`Could not get Starknet names: ${error}`)
  }
}

function getStarknamesCalldata(
  addresses: string[],
  namingContract: string,
): any[] {
  return addresses.map((address) => ({
    to: namingContract,
    selector: getSelectorFromName('address_to_domain'),
    calldata: compile([address]),
  }))
}
