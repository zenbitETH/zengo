import React, { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import {
  MediaRenderer,
  useContract,
  useContractRead,
  useStorage,
} from "@thirdweb-dev/react";

export default function daoProposals() {
  const [proposalIpfsUrl, setProposalIpfsUrl] = useState("");
  const [dataIpfsDownloaded, setDataIpfsDownloaded] = useState<any>(null); // [
  const { contract } = useContract(
    "0xc1fcf7a7879A0b33a6EB84AeEBB10f30F5e533a2"
  );
  const { data, isLoading } = useContractRead(contract, "proposals", ["0"]);

  const downloadFromIpfs = async () => {
    const file = await fetch(
      "https://312a375fe5a190a748d40e21aff95e99.ipfscdn.io/ipfs/bafybeihtgs3fwu25lgdwshp6ujnk2b2bmw6mdo6q53uo3tvecupzvg3ugy/"
    );
    const ipfsResponse = await file.json();
    console.log({ ipfsResponse });
  };

  useEffect(() => {
    if (data) {
      setProposalIpfsUrl(data.description);
      downloadFromIpfs();
    }
  }, [data]);

  return (
    <Layout>
      <div className="min-h-screen h-full from-cit to-mod bg-gradient-to-t grid items-center py-20 ">
        <div className="card0">
          <div className="propDashboard">
            <Link href="/newProposal">
              <span className="newProp">+ Añadir propuesta</span>
            </Link>
            <div className="propCard relative">
              <div className="bg-white rounded-gen grid grid-cols-6 relative">
                <div className="col-span-4 p-3">
                  <div className="italic">Propuesta #1</div>
                  <div className="font-bold text-2xl">
                    Limpiar el parque Santa Mónica
                  </div>
                  <div className="italic">
                    {" "}
                    <span className="not-italic text-2xl">👷</span>Solicitud de
                    mantenimiento
                  </div>
                  <div className="">hecha el 02/06/2023</div>
                  <div className="">Queretaro, Mexico</div>
                </div>
                <div
                  className="
                                col-span-2                                 
                                border-gray-500/50 
                                rounded-gen grid grid-rows-3"
                >
                  <div
                    className="
                                    grid 
                                    items-center text-center 
                                    font-bold text-xl 
                                    rounded-tr-gen rounded-bl-gen 
                                    bg-cit"
                  >
                    Verificación
                  </div>
                  <div className="text-center grid grid-cols-3 items-center gap-3 mx-auto p-3 w-full divide-x divide-gray-300">
                    <div className="mx-auto">
                      <div className="completed"></div>
                    </div>
                    {/* This will change depending on the proposal stage (pending, currentCit, currentMod, completed) */}
                    <div className="mx-auto flex gap-1 h-full items-center pl-3">
                      <div className="completed"></div>
                      <div className="currentMod"></div>
                      <div className="pending"></div>
                    </div>
                    <div className="mx-auto h-full grid items-center pl-3">
                      <div className="pending"></div>
                    </div>
                  </div>
                  <Link href="/proposal-id-2">
                    <span
                      className="
                                        bg-gray-300 hover:bg-gray-500 
                                        hover:text-white 
                                        cursor-pointer 
                                        grid items-center 
                                        text-xl text-center 
                                        rounded-tl-gen
                                        rounded-br-gen"
                    >
                      Detalles
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            {proposalIpfsUrl ? <MediaRenderer src={proposalIpfsUrl} /> : null}
            {/* <MediaRenderer src="ipfs://QmVkNdKUKBK2o8SgjYSjLQ17sDo7NoXSjwNc8PSUzFF4i6" /> */}
          </div>
          <div className="sortProposals">
            <div className="propBT">Ver todas</div>
            <div className="propBT px-1">Mis propuestas</div>
            <div className="propBT">Por tipo</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
