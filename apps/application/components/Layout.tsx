import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";

import { useState, useEffect } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { useGlobalCycleStageState } from "@/contexts/GlobalStageCycleContext";

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  const { walletIsConnected } = useGlobalCycleStageState();

  return (
    <>
      {walletIsConnected ? <Navbar /> : null}
      <Header />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
