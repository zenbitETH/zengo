import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";

import { ScanModal } from "./ScanModal";

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  return (
    <div className="from-cit to-mod bg-gradient-to-t h-screen">
      {/*walletIsConnected ? <Navbar /> : null*/}
      <Header />
      <main className="h-[calc(100vh-5rem)] relative">{props.children}</main>
      <ScanModal />
    </div>
  );
};

export default Layout;
