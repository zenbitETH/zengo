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
 
export const filecoin: Chain = {
  id: 3141,
  name: 'Filecoin - Hyperspace testnet',
  network: 'filecoin',
  nativeCurrency: {
    decimals: 18,
    name: 'Filecon',
    symbol: 'tFIL',
  },
  rpcUrls: {
    default: { http: ['https://api.hyperspace.node.glif.io/rpc/v1'] },
  },
  blockExplorers: {
    etherscan: { name: 'Filfox', url: 'https://hyperspace.filfox.info/en' },
    default: { name: 'FilFox', url: 'https://hyperspace.filfox.info/en' },
  },
  //contracts: {
  //  multicall3: {
  //    address: '0xca11bde05977b3631167028862be2a173976ca11',
  //    blockCreated: 11907934,
  //  },
  //},
}

const { chains, provider } = configureChains(
  [filecoin], 
  [
    jsonRpcProvider({ rpc: () => ({ http: "https://api.hyperspace.node.glif.io/rpc/v1" }) }),  //<<<< New RPC Provider
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
        <Navbar/>
        <Header/>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
