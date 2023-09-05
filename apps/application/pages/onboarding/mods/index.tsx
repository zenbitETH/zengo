import Link from "next/link";
import React from "react";

const ModeratorsVideoPage = () => {
  return (
    <div className="overflow-hidden text-center h-screen grid items-center  relative">
      <div className="md:mx-32 gap-3 pt-32 pb-36 font-bau h-full grid items-center px-3 relative">
        <iframe
          className="w-full h-full rounded-2xl"
          src="https://www.youtube.com/embed/Mwr3eJgp4_M"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="YouTube video player"
        />
        <Link href="/onboarding/mods/poap">
          <button className="homeBT fixed bottom-5 left-1/2 -translate-x-1/2">
            Certificar participación
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ModeratorsVideoPage;
