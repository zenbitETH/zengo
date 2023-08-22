import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="-">
      <div className="navbar text-center">
        <Link href="/newProposal" className="imageBG">
          <Image
            src={"/assets/Proposal.svg"}
            width={45}
            height={45}
            className="mx-auto cursor-pointer"
            alt="New proposal"
          />
        </Link>
        <Link href="/daoProposals" className="imageBG">
          <Image
            src={"/assets/Dashboard.svg"}
            width={45}
            height={45}
            className="mx-auto cursor-pointer"
            alt="All proposals"
          />
        </Link>
        <Link href="/fondeoPlural" className="imageBG">
          <Image
            src={"/assets/Leaderboard.svg"}
            width={45}
            height={45}
            className="mx-auto cursor-pointer"
            alt="Profile"
          />
        </Link>
        <Link href="/seguimiento" className="imageBG">
          <Image
            src={"/assets/Profile.svg"}
            width={45}
            height={45}
            className="mx-auto cursor-pointer"
            alt="Profile"
          />
        </Link>
      </div>
    </nav>
  );
}
