import type { PADDED_FELT, PADDED_TXN_HASH } from '@starknet-io/types-js'
import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Account } from '../../types/account.js'
import type { Chain } from '../../types/chain.js'
import type { API_VERSION, DECLARE_TXN } from '../../types/components.js'

export type AddDeclareTransactionParameters = {
  declare_transaction: DECLARE_TXN
  api_version?: API_VERSION
}

export type AddDeclareTransactionReturnType = {
  transaction_hash: PADDED_TXN_HASH
  class_hash: PADDED_FELT
}

export type AddDeclareTransactionErrorType = {
  code: number
  message: string
}

export async function addDeclareTransaction<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  { declare_transaction, api_version }: AddDeclareTransactionParameters,
): Promise<AddDeclareTransactionReturnType | AddDeclareTransactionErrorType> {
  return await client.request({
    method: 'wallet_addDeclareTransaction',
    params: {
      declare_transaction,
      api_version,
    },
  })
}
