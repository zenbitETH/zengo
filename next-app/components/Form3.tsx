import * as React from "react";

export default function Form3 (props: any) {
    const {proposal, setProposal} = props;
    
    const handleDateChange = (event: any) => {
        const updatedProposal = {...proposal, evidence: {...proposal.evidence, date: event.target.value as string}};
        setProposal(updatedProposal);
    };

    const handleDescriptionChange = (event: any) => {
        const updatedProposal = {...proposal, evidence: {...proposal.evidence, description: event.target.value as string}};
        setProposal(updatedProposal);
      };
      
    const handleEvidenceForm = (event: any) => {
        const updatedProposal = {...proposal, evidence: {...proposal.evidence, evidenceForm: event.target.value as string}};
        setProposal(updatedProposal);
      };

    return(
        <div className='p-3 gap-5 grid grid-cols-2'>
            
            <div className="col-span-2">
                <div className='formLabel'>Fecha de la evidencia</div>

                <input type='date' placeholder='¿De que fecha es tu evidencia?' className='placeholder:italic px-6 py-3 text-black w-full border-color1-500 mx-auto rounded-dd' onChange={handleDateChange}></input>

            </div>
            <div className="col-span-2">
                <div className='formLabel'>Descripción de la evidencia</div>
                <input type='text' placeholder='Escribe algunos detalles sobre la evidencia' className='placeholder:italic px-6 py-3 text-black w-full border-color1-500 mx-auto rounded-dd' onChange={handleDescriptionChange}></input>
            </div>
            <div className='h-72 col-span-2'>
                <div className='formLabel'>Sube tu evidencia</div>
                <div className="flex justify-center items-center w-full h-full pb-10">
                    <label className="formFile">
                        <div className="flex flex-col justify-center items-center pt-5 pb-6">
                            <svg aria-hidden="true" className="mb-3 w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p className="mb-2 text-sm  text-white "><span className="font-semibold">Toca para elegir tu archivo</span> o arrastralo y suelta aquí</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" onChange={handleEvidenceForm} />
                    </label>
                </div>
            </div>

        </div>
    )
}