import { useNewProposalState } from "@/contexts/NewProposalContext";
import * as React from "react";

export default function Form1() {
  const { proposalInfo, setProposalInfo } = useNewProposalState();

  const handleTitleChange = (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    const updatedProposal = {
      ...proposalInfo,
      title: event.currentTarget.value,
    };
    setProposalInfo(updatedProposal);
  };
  const handleTypeChange = (
    event: React.FormEvent<HTMLSelectElement>
  ): void => {
    const updatedProposal = {
      ...proposalInfo,
      type: event.currentTarget.value,
    };
    setProposalInfo(updatedProposal);
  };
  const handleDescriptionChange = (
    event: React.FormEvent<HTMLTextAreaElement>
  ): void => {
    const updatedProposal = {
      ...proposalInfo,
      description: event.currentTarget.value,
    };
    setProposalInfo(updatedProposal);
  };

  return (
    <div className="p-3 gap-5 grid">
      <div>
        <div className="formLabel">Título de la propuesta</div>

        <input
          type="text"
          placeholder="¿Qué quieres proponer?"
          className="input"
          onChange={handleTitleChange}
          value={proposalInfo.title}
        />
      </div>
      <div>
        <div className="formLabel">Tipo de propuesta</div>
        <select
          className="drop"
          // defaultValue=""
          onChange={handleTypeChange}
          value={proposalInfo.type}
        >
          <option className="formLabel" value="">
            Selecciona una categoria
          </option>
          <option value="Mejora en la administración pública">
            🗳️ Mejora en la administración pública
          </option>
          <option value="Evento presencial">🌳 Evento presencial</option>
          <option value="Evento en linea">💻 Evento en linea</option>
          <option value="Reporte de seguridad">⚠️ Reporte de seguridad</option>
          <option value="Solicitud de mantenimiento">
            👷 Solicitud de mantenimiento
          </option>
          <option value="Añadir función a zengo">
            ⚙️ Añadir función a zengo
          </option>
        </select>
      </div>
      <div className="row-span-2 w-full mx-auto h-52">
        <div className="formLabel">Descripción</div>
        <textarea
          placeholder="Describe tu propuesta"
          className="p-3 pb-5 text-black w-full mx-auto rounded-3xl placeholder:italic h-full border-color1-500"
          onChange={handleDescriptionChange}
          value={proposalInfo.description}
        />
      </div>
    </div>
  );
}
