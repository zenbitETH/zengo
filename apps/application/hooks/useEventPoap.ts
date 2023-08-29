import { useState, useEffect } from "react";
import { IBundler, Bundler } from "@biconomy/bundler";
import {
  BiconomySmartAccount,
  BiconomySmartAccountConfig,
  DEFAULT_ENTRYPOINT_ADDRESS,
} from "@biconomy/account";
import {
  IPaymaster,
  BiconomyPaymaster,
  IHybridPaymaster,
  SponsorUserOperationDto,
  PaymasterMode,
} from "@biconomy/paymaster";
import { Wallet, providers, ethers } from "ethers";
import { CHAIN } from "@/const/chains";

const provider = new providers.JsonRpcProvider(
  "https://rpc.ankr.com/optimism_testnet"
);
const wallet = new Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY || "", provider);

const bundler: IBundler = new Bundler({
  bundlerUrl: "https://bundler.biconomy.io/api/v2/420/abc",
  chainId: CHAIN.chainId, // ChainId.OPTIMISM_GOERLI_TESTNET,
  entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
});

const paymaster = new BiconomyPaymaster({
  paymasterUrl: `https://paymaster.biconomy.io/api/v1/420/${process.env.NEXT_PUBLIC_BICONOMY_PAYMASTER_KEY}`, // you can get this value from biconomy dashboard. https://dashboard.biconomy.io
});

const biconomySmartAccountConfig: BiconomySmartAccountConfig = {
  signer: wallet,
  chainId: CHAIN.chainId, // ChainId.OPTIMISM_GOERLI_TESTNET,
  bundler: bundler,
  paymaster: paymaster,
};

export function useEventPoap() {
  const [isOnline, setIsOnline] = useState(true);

  const createAccount = async () => {
    let biconomySmartAccount = new BiconomySmartAccount(
      biconomySmartAccountConfig
    );
    biconomySmartAccount = await biconomySmartAccount.init();
    console.log("owner: ", biconomySmartAccount.owner);
    console.log(
      "address: ",
      await biconomySmartAccount.getSmartAccountAddress()
    );
    return biconomySmartAccount;
  };

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }

    // window.addEventListener("online", handleOnline);
    // window.addEventListener("offline", handleOffline);

    return () => {
      //   window.removeEventListener("online", handleOnline);
      //   window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}
