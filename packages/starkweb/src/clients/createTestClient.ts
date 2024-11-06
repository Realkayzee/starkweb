import type { Address } from 'abitype'

import type { Account } from '../accounts/types.js'
import type { Chain } from '../types/chain.js'
import type { RpcSchema } from '../types/eip1193.js'
import type { Prettify } from '../types/utils.js'
import type { ClientConfig } from './createClient.js'
import type { Transport } from './transports/createTransport.js'

export type TestClientMode = 'anvil' | 'hardhat' | 'ganache'

export type TestClientConfig<
  mode extends TestClientMode = TestClientMode,
  transport extends Transport = Transport,
  chain extends Chain | undefined = Chain | undefined,
  accountOrAddress extends Account | Address | undefined =
    | Account
    | Address
    | undefined,
  rpcSchema extends RpcSchema | undefined = undefined,
> = Prettify<
  Pick<
    ClientConfig<transport, chain, accountOrAddress, rpcSchema>,
    | 'account'
    | 'cacheTime'
    | 'chain'
    | 'key'
    | 'name'
    | 'pollingInterval'
    | 'rpcSchema'
    | 'transport'
  > & {
    /** Mode of the test client. */
    mode: mode | ('anvil' | 'hardhat' | 'ganache') // TODO: Type utility that expands `TestClientMode`
  }
>
