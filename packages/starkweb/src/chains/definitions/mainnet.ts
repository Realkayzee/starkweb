import { defineChain } from '../../utils/chain/defineChain.js'

export const mainnet = /*#__PURE__*/ defineChain({
  id: 1,
  name: 'Starknet',
  nativeCurrency: {
    name: 'Stark',
    symbol: 'STRK',
    decimals: 18,
    address:
      '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
  },
  rpcUrls: {
    voyager: {
      http: ['https://rpc.voyager.online'],
      webSocket: ['wss://rpc.voyager.online'],
    },
    alchemy: {
      http: ['https://starknet-mainnet.g.alchemy.com/v2'],
      webSocket: ['wss://starknet-mainnet.g.alchemy.com/v2'],
    },
    infura: {
      http: ['https://starknet-mainnet.infura.io/v3'],
      webSocket: ['wss://starknet-mainnet.infura.io/ws/v3'],
    },
    default: {
      http: ['https://free-rpc.nethermind.io/mainnet-juno'],
    },
    public: {
      http: ['https://free-rpc.nethermind.io/mainnet-juno'],
    },
  },
  blockExplorers: {
    starkcompass: {
      name: 'Stark Compass',
      url: 'https://goerli.starkcompass.com',
    },
    voyager: {
      name: 'Voyager',
      url: 'https://goerli.voyager.online',
    },
    starkscan: {
      name: 'Stark Scan',
      url: 'https://goerli.starkscan.co',
    },
    default: {
      name: 'Stark Compass',
      url: 'https://goerli.starkcompass.com',
    },
  },
  chain_id: '0x534e5f4d41494e',
})
