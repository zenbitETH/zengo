import * as React from "react";

export default function Form1 (props: any) {
    const {proposal, setProposal} = props;        

    const handleNameChange = (event: any) => {
        const updatedProposal = {...proposal, name: event.target.value as string};
        setProposal(updatedProposal);
      };
    const handleTypeChange = (event: any) => {
        const updatedProposal = {...proposal, type: event.target.value as string};
        setProposal(updatedProposal);
      };
    const handleDescriptionChange = (event: any) => {
        const updatedProposal = {...proposal, description: event.target.value as string};
        setProposal(updatedProposal);
      };

    return(
        <div className='p-3 gap-5 grid'>
            <div>
                <div className='formLabel'>Título de la propuesta</div>
        
                <input type='text' placeholder='¿Qué quieres proponer?' className='input' onChange={handleNameChange}></input>
        
            </div>
            <div>
                <div className='formLabel'>Tipo de propuesta</div>
                <select className='drop' defaultValue="" onChange={handleTypeChange}>
                    <option className='formLabel' value="" selected>Selecciona una categoria</option>
                    <option>🗳️ Mejora en la administración pública</option>
                    <option>🌳 Evento presencial</option>
                    <option>💻 Evento en linea</option>
                    <option>⚠️ Reporte de seguridad</option>
                    <option>👷 Solicitud de mantenimiento</option>
                    <option>⚙️ Añadir función a zengo</option>
                </select>
            </div>
            <div className='row-span-2 w-full mx-auto h-52'>
                <div className='formLabel'>Descripción</div>
                <textarea placeholder='Describe tu propuesta' className='p-3 pb-5 text-black w-full mx-auto rounded-dd placeholder:italic h-full border-color1-500' onChange={handleDescriptionChange}></textarea>
            </div>
        </div>
    )
}