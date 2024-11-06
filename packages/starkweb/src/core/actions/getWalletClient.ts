// TODO: Remove this once we have a walletActions
// @ts-ignore
import { type Account, type WalletClient, walletActions } from '../../clients/walletClient.js'

import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import {
  type GetConnectorClientErrorType,
  type GetConnectorClientParameters,
  getConnectorClient,
} from './getConnectorClient.js'

export type GetWalletClientParameters = GetConnectorClientParameters

export type GetWalletClientReturnType = WalletClient

export type GetWalletClientErrorType =
  // getConnectorClient()
  | GetConnectorClientErrorType
  // base
  | BaseErrorType
  | ErrorType

export async function getWalletClient<
  config extends Config,
  chainId extends config['chains'][number]['chain_id'],
>(
  config: config,
  parameters: GetWalletClientParameters = {},
): Promise<GetWalletClientReturnType> {
  const client = await getConnectorClient(config, parameters)
  // @ts-ignore
  return client.extend(walletActions) as unknown as GetWalletClientReturnType<
    config,
    chainId
  >
}
