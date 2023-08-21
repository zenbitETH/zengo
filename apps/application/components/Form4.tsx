import { useNewProposalState } from "@/contexts/NewProposalContext";
import Map from "./Map";
import { MediaRenderer } from "@thirdweb-dev/react";

export default function Form4() {
  const { proposalInfo, evidence } = useNewProposalState();

  return (
    <div className="px-3 gap-3 text-white">
      <div className="h-full rounded-dd grid gap-3">
        <div className="text-left font-bau ">
          <div className="text-3 text-2xl text-center">
            {proposalInfo.title || "Título de la propuesta"}
          </div>
          <div className="italic text-center text-xl">
            {proposalInfo.type || "Tipo de propuesta"}
          </div>
          <div className="text-justify py-1 font-exo break-all text-lg">
            {proposalInfo.description || "Este es el ejemplo de una propuesta"}
          </div>

          <div id="map-parent" className="grid h-52 relative">
            <Map />
          </div>
        </div>

        <div className="rounded-dd h-fit grid xl:grid-cols-2 gap-3">
          <div className="text-left font-bau text-lg">
            <div>Evidencia del {evidence.date || "20/06/2023"}</div>
            <div className="text-justify pt-3 font-exo">
              {evidence.description ||
                "Aquí va la descrición de tu propuesta  "}
            </div>
          </div>
          <div className="h-full bg-gray-300/60 rounded-med grid items-center text-white text-sm">
            {/* <Image
              src={file}
              width={1920}
              height={1080}
              alt="Carousel Button"
              className="rounded-med"
            /> */}
            {/* <MediaRenderer src="https://312a375fe5a190a748d40e21aff95e99.ipfscdn.io/ipfs/bafybeidr3w6y5fzqncerc6pgdfttu5lfmkvbbhpiuwvl4nnszhtwdo3pgi/" /> */}
            <MediaRenderer src={evidence.ipfsUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}
