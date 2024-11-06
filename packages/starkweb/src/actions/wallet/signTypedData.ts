import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Account } from '../../types/account.js'
import type { Chain } from '../../types/chain.js'
import type {
  API_VERSION,
  SIGNATURE,
  TYPED_DATA,
} from '../../types/components.js'

export type SignTypedDataParameters = {
  typed_data: TYPED_DATA
  api_version?: API_VERSION
}

export type SignTypedDataReturnType = {
  signature: SIGNATURE
}

export type SignTypedDataErrorType = {
  code: number
  message: string
}

export async function signTypedData<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  { typed_data, api_version }: SignTypedDataParameters,
): Promise<SignTypedDataReturnType | SignTypedDataErrorType> {
  return await client.request({
    method: 'wallet_signTypedData',
    params: {
      ...typed_data,
      api_version,
    },
  })
}
