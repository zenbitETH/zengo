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
      authConfig={{
        domain:
          process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN ||
          `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`,
        authUrl: "/api/auth",
      }}
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
