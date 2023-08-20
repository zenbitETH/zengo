import { ConnectWallet } from "@thirdweb-dev/react";

export default function Header() {
  return (
    <header className="header">
      <div className="wrap">
        <ConnectWallet />
      </div>
    </header>
  );
}
