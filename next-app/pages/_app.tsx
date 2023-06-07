import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { RainbowKitProvider, getDefaultWallets, darkTheme } from '@rainbow-me/rainbowkit';
import {configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { Chain } from '@wagmi/core'
import Header from '../components/Header';
import Navbar from '../components/Navbar';
 
export const optimism: Chain = {
  id: 420,
  name: 'Optimism Goerli Testnet',
  network: 'Op Goerli',
  nativeCurrency: {
    decimals: 18,
    name: 'OPEther',
    symbol: 'oETH',
  },
  rpcUrls: {
    default: { http: ['https://endpoints.omniatech.io/v1/op/goerli/public'] },
  },
  blockExplorers: {
    etherscan: { name: '', url: 'https://optimism.io' },
    default: { name: 'FilFox', url: 'https://optimism.io' },
  },
  //contracts: {
  //  multicall3: {
  //    address: '0xca11bde05977b3631167028862be2a173976ca11',
  //    blockCreated: 11907934,
  //  },
  //},
}

const { chains, provider } = configureChains(
  [optimism], 
  [
    jsonRpcProvider({ rpc: () => ({ http: "https://endpoints.omniatech.io/v1/op/goerli/public" }) }),  //<<<< New RPC Provider
    publicProvider(),
    // No need to alchemy
  ]
);

 const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider 
        theme={darkTheme({
          accentColor: '#4E5F69',
          overlayBlur: 'large',
        })}
        chains={chains}>
        
        <Header/>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
