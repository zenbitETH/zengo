import Link from 'next/link'
import Image from 'next/image'
import icon1 from '../assets/Proposal.svg'
import icon2 from '../assets/Dashboard.svg'
import icon3 from '../assets/Leaderboard.svg'
import icon4 from '../assets/Profile.svg'

export default function Navbar() {
    return (
        <nav className='-'>
          
        <div className="navbar text-center">
        <Link href='/newProposal'>
            <a className='imageBG'>
              <Image
                src={icon1}
                width={45}
                height={45}
                className=" cursor-pointer"
                alt='New proposal'
              />
            </a>
          </Link>
          <Link href='/daoProposals'>
            <a className='imageBG'>
              <Image
                src={icon2}
                width={45}
                height={45}
                className=" cursor-pointer"
                alt='All proposals'
              />
            </a>
          </Link>
          <Link href='/fondeoPlural'>
            <a className='imageBG'>
              <Image
                src={icon3}
                width={45}
                height={45}
                className=" cursor-pointer"
                alt='Profile'
              />  
            </a>
          </Link>
          <Link href='/seguimiento'>
            <a className='imageBG'>
              <Image
                src={icon4}
                width={45}
                height={45}
                className=" cursor-pointer"
                alt='Profile'
              />  
            </a>
          </Link>
        </div>
    </nav>
    )
}