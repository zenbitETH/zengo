import {
  ConnectWallet,
  useConnectionStatus,
  useLogin,
  useNetworkMismatch,
  useSwitchChain,
  useUser,
} from "@thirdweb-dev/react";
import Link from "next/link";
import Image from "next/image";
import retroPGF3 from "../public/retroPGF3.svg";

import { useState, useEffect, useRef } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { CHAIN } from "@/const/chains";

export default function Header() {
  const isMismatched = useNetworkMismatch();
  const switchChain = useSwitchChain();

  const [walletIsConnected, setWalletIsConnected] = useState(false);
  const address = useAddress();

  useEffect(() => {
    if (address) {
      setWalletIsConnected(true);
    }
  }, [address]);

  const { login } = useLogin();
  const { user, isLoggedIn } = useUser();
  const connectionStatus = useConnectionStatus();

  // login right after connection
  const loginAttempted = useRef(false);

  useEffect(() => {
    if (loginAttempted.current) {
      return;
    }
    if (connectionStatus === "connected" && !isLoggedIn) {
      loginAttempted.current = true;
      login();
    }
  }, [connectionStatus, isLoggedIn, login]);

  return (
    <header className="header">
      {walletIsConnected ? null : (
        <div className="fixed z-10 font-exo top-0 left-0 w-full bg-white text-op hover:bg-gradient-to-r hover:from-white hover:via-op/50 hover:to-op hover:text-white rounded-b-3xl text-center py-3 cursor-pointer">
          <Link href="https://round3.optimism.io/projects/0xa0e0d386a862f8f1ee625bf5837bfb8ef5a8201d70c459efbe9172602ff3d831">
            <div className="grid grid-cols-6 items-center max-w-md xl:max-w-lg mx-auto ">
              <Image
                src={retroPGF3}
                alt="retroPGF3"
                height={50}
                width={50}
                className=""
              />
              <div className="w-full h-full col-span-5">
                <span className="font-bold text-2xl animate-pulse">
                  {" "}
                  OP RetroPGF 3 is live!{" "}
                </span>{" "}
                <br />
                <span className="text-xs xl:text-sm">
                  {" "}
                  If you are a Badgeholder, please consider voting for us here!
                </span>
              </div>
            </div>
          </Link>
        </div>
      )}
      <div className="wrap fixed bottom-7 left-1/2 -translate-x-1/2">
        {!isMismatched ? (
          <ConnectWallet
            className="homeBT"
            btnTitle="Acceder"
            detailsBtn={() => {
              return <button className="homeBT"> Cuenta </button>;
            }}
            auth={{
              loginOptional: false,
            }}
          />
        ) : (
          <button onClick={() => switchChain(CHAIN.chainId)} className="homeBT">
            <span>{`Switch to ${CHAIN.name}`}</span>
          </button>
        )}
      </div>
    </header>
  );
}
