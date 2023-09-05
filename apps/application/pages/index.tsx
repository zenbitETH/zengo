import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex items-center justify-center pt-[25%]">
      <Link href="/onboarding">
        <button type="button" className="homeBT">
          Iniciar Onboarding
        </button>
      </Link>
      <button type="button" className="homeBT">
        Testing: Unirse al stream
      </button>
    </div>
  );
};

export default Home;
