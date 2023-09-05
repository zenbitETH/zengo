import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";

import { useGlobalCycleStageState } from "@/contexts/GlobalStageCycleContext";

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  const { walletIsConnected } = useGlobalCycleStageState();

  return (
    <div className="from-cit to-mod bg-gradient-to-t h-screen">
      {/*walletIsConnected ? <Navbar /> : null*/}
      <Header />
      <main className="h-[calc(100vh-6rem)]">{props.children}</main>
    </div>
  );
};

export default Layout;
