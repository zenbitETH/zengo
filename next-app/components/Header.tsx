import Image from 'next/image'
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import SPTM from "../assets/zengo.svg"
import Navbar from './Navbar';

export default function Header() {
    return (
        <div className="header">
          <div className="wrap">
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  authenticationStatus,
                  mounted,
                }) => {
                  // Note: If your app doesn't use authentication, you
                  // can remove all 'authenticationStatus' checks
                  const ready = mounted && authenticationStatus !== 'loading';
                  const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                      authenticationStatus === 'authenticated');
                    
                  return (
                    <div
                      {...(!ready && {
                        'aria-hidden': true,
                        'style': {
                          opacity: 0,
                          pointerEvents: 'none',
                          userSelect: 'none',
                        },
                      })}
                    >
                      {(() => {
                        if (!connected) {
                          return (
                            <button className='homeBT fixed bottom-5 left-1/2 -translate-x-1/2 animate-pulse' onClick={openConnectModal} type="button">
                              Conectar
                            </button>
                          );
                        }
                      
                        if (chain.unsupported) {
                          return (
                            <button className='homeBT' onClick={openChainModal} type="button">
                              Red incorrecta
                            </button>
                          );
                        }
                      
                        return (
                          <div style={{ display: 'flex', gap: 12 }}>
                            <Navbar/>
                            <div className='homeBT'>Gas</div>
                            <button className='homeBT' onClick={openAccountModal} type="button">
                              Cuenta
                            </button>
                          </div>
                        );
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
          </div>
        </div>
    )
}