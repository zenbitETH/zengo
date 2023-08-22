import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";

import { useState, useEffect } from "react";
import { useAddress } from "@thirdweb-dev/react";

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  const [walletIsConnected, setWalletIsConnected] = useState(false);
  const address = useAddress();

  useEffect(() => {
    if (address) {
      setWalletIsConnected(true);
    }
  }, [address]);

  return (
    <>
      {walletIsConnected ? <Navbar /> : null}
      <Header />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
