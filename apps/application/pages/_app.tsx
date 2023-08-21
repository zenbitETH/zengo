import "../styles/globals.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";
import { NewProposalContextProvider } from "@/contexts/NewProposalContext";
import { CHAIN } from "@/const/chains";
import Layout from "@/components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      // Set active chain for app
      activeChain={CHAIN}
      supportedChains={[CHAIN]}
      // Auth (SIWE) configuration
      // authConfig={{
      //   domain: process.env.NEXT_PUBLIC_AUTH_DOMAIN || "evmkit.com", // Your website domain
      //   authUrl: "/api/auth", // API Route (default is - pages/api/auth/[...thirdweb].ts)
      // }}
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENTID}
    >
      <NewProposalContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NewProposalContextProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
