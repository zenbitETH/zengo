import { useStorageUpload } from "@thirdweb-dev/react";
import { useState } from "react";

export default function Form3(props: any) {
  const { proposal, setProposal } = props;
  const [file, setFile] = useState<File>();

  const { mutateAsync: upload } = useStorageUpload();

  const uploadToIpfs = async () => {
    const uploadUrl = await upload({
      data: [file],
      options: { uploadWithGatewayUrl: false, uploadWithoutDirectory: true },
    });
    alert(uploadUrl);
    console.log({ uploadUrl });
    handleEvidenceForm(uploadUrl[0]);
  };

  const handleDateChange = (event: any) => {
    const updatedProposal = {
      ...proposal,
      evidence: { ...proposal.evidence, date: event.target.value as string },
    };
    setProposal(updatedProposal);
  };

  const handleDescriptionChange = (event: any) => {
    const updatedProposal = {
      ...proposal,
      evidence: {
        ...proposal.evidence,
        description: event.target.value as string,
      },
    };
    setProposal(updatedProposal);
  };

  const handleEvidenceForm = (urlIpfs: string) => {
    const updatedProposal = {
      ...proposal,
      evidence: {
        ...proposal.evidence,
        evidenceForm: urlIpfs,
      },
    };
    setProposal(updatedProposal);
  };

  return (
    <div className="p-3 gap-5 grid grid-cols-2">
      <div className="col-span-2">
        <div className="formLabel">Fecha de la evidencia</div>
        <input
          type="date"
          placeholder="¿De que fecha es tu evidencia?"
          className="placeholder:italic px-6 py-3 text-black w-full border-color1-500 mx-auto rounded-dd"
          onChange={handleDateChange}
        />
      </div>
      <div className="col-span-2">
        <div className="formLabel">Descripción de la evidencia</div>
        <input
          type="text"
          placeholder="Escribe algunos detalles sobre la evidencia"
          className="placeholder:italic px-6 py-3 text-black w-full border-color1-500 mx-auto rounded-dd"
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="h-72 col-span-2">
        <div className="formLabel">Sube tu evidencia</div>
        <div className="flex justify-center items-center w-full h-full pb-10">
          <label className="formFile">
            <div className="flex flex-col justify-center items-center pt-5 pb-6 font-exo">
              <svg
                aria-hidden="true"
                className="mb-3 w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm  text-white ">
                <span className="font-semibold ">
                  Toca para elegir tu archivo
                </span>{" "}
                o arrastralo y suelta aquí
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              // onChange={handleEvidenceForm}
              onChange={(e) => setFile(e.target.files![0])}
            />
          </label>
        </div>
        <button type="button" disabled={!file} onClick={uploadToIpfs}>
          Subir
        </button>
      </div>
    </div>
  );
}
