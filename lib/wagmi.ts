import { http, createConfig } from 'wagmi'
import { mantle, mantleTestnet } from 'wagmi/chains'
import { coinbaseWallet, metaMask } from "wagmi/connectors";
import { type Chain } from 'viem'

export const config = createConfig({
    chains: [mantleTestnet, mantle],
    connectors: [metaMask(), coinbaseWallet()],
    transports: {
        [mantle.id]: http(),
        [mantleTestnet.id]: http(),
    },
})

