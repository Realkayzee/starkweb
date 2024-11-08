// import {
//   ChainDisconnectedError,
//   type EIP1193Parameters,
//   type EIP1193Provider,
//   type EIP1193RequestFn,
//   ProviderDisconnectedError,
//   type TransportConfig,
//   type WalletRpcSchema,
//   createTransport,
//   hexToNumber,
//   numberToHex,
//   withRetry,
//   withTimeout,
// } from 'strkjs'

import { createTransport, type TransportConfig } from '../../clients/transports/createTransport.js'
import type { Connector, Transport } from '../createConfig.js'
// import type { EIP1193Parameters, EIP1193RequestFn } from '../../types/eip1193.js'
import { ChainDisconnectedError, ProviderDisconnectedError } from '../../errors/rpc.js'
import type { WalletRpcSchema } from '../../types/snip1193.js'
import { numberToHex } from '../../utils/encoding/toHex.js'
import { hexToNumber } from '../../utils/encoding/fromHex.js'
import { withRetry } from '../../utils/promise/withRetry.js'
import { withTimeout } from '../../utils/promise/withTimeout.js'
import type { SNIP1193Parameters, SNIP1193Provider, SNIP1193RequestFn } from '../../types/snip1193.js'

export type ConnectorTransportConfig = {
  /** The key of the transport. */
  key?: TransportConfig['key'] | undefined
  /** The name of the transport. */
  name?: TransportConfig['name'] | undefined
  /** The max number of times to retry. */
  retryCount?: TransportConfig['retryCount'] | undefined
  /** The base delay (in ms) between retries. */
  retryDelay?: TransportConfig['retryDelay'] | undefined
}

export type ConnectorTransport = Transport

export function unstable_connector(
  connector: Pick<Connector, 'type'>,
  config: ConnectorTransportConfig = {},
): Transport {
  const { type } = connector
  const { key = 'connector', name = 'Connector', retryDelay } = config

  return (parameters) => {
    const { chain, connectors } = parameters
    const retryCount = config.retryCount ?? parameters.retryCount

    const request: SNIP1193RequestFn = async ({ method, params }) => {
      const connector = connectors?.getState().find((c: { type: string }) => c.type === type)
      if (!connector)
        throw new ProviderDisconnectedError(
          new Error(
            `Could not find connector of type "${type}" in \`connectors\` passed to \`createConfig\`.`,
          ),
        )

      const provider = (await connector.getProvider({
        chainId: numberToHex(chain?.id as number),
      })) as SNIP1193Provider | undefined
      if (!provider)
        throw new ProviderDisconnectedError(
          new Error('Provider is disconnected.'),
        )

      // We are applying a retry & timeout strategy here as some injected wallets (e.g. MetaMask) fail to
      // immediately resolve a JSON-RPC request on page load.
      const chainId = hexToNumber(
        await withRetry(() =>
            withTimeout(() => provider.request({ type: 'starknet_chainId' }), {
            timeout: 100,
          }),
        ),
      )
      if (chain && chainId !== chain.id)
        throw new ChainDisconnectedError(
          new Error(
            `The current chain of the connector (id: ${chainId}) does not match the target chain for the request (id: ${chain.id} – ${chain.name}).`,
          ),
        )

      const body = { method, params } as SNIP1193Parameters<WalletRpcSchema>
      return provider.request(body)
    }

    return createTransport({
      key,
      name,
      request,
      retryCount,
      retryDelay,
      type: 'connector',
    })
  }
}
