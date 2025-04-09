import { createConfig, http } from 'wagmi';
import {
  monadTestnet,
} from 'wagmi/chains';

export const rpcConfig = createConfig({
  chains: [
    {
      ...monadTestnet,
      rpcUrls: {
        default: {
          http: ['https://testnet-rpc.monad.xyz'],
        },
      },
    },
  ],
  transports: {
    [monadTestnet.id]: http('https://testnet-rpc.monad.xyz'),
  },
});
