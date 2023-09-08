import { ConnectWallet } from "@thirdweb-dev/react";
import React from "react";

const WalletButton = () => {
  return (
    <ConnectWallet
      className="homeBT"
      btnTitle="Acceder"
      detailsBtn={() => {
        return <button className="homeBT"> Cuenta </button>;
      }}
      auth={{
        loginOptional: true,
      }}
    />
  );
};

export default WalletButton;
