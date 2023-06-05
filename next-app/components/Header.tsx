import Image from 'next/image'
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import SPTM from "../assets/SpaceTimeDAO.svg"

export default function Header() {
    return (
        <div className="header">
          <div className="wrap">
          <Link href="/" className="grid items-center">
            <Image 
                src={SPTM} 
                height={50} 
                width={250}
                alt="Spacetime DAO"/>
          </Link>
            <div className=''>
              <ConnectButton/>
            </div>
          </div>
        </div>
    )
}