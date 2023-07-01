import React, { useState } from 'react';

export default function Ceremony() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="bg-mod text-center h-full grid items-center py-20 relative">
            <div className="fixed top-7 left-1/2 -translate-x-1/2 text-2xl font-bau text-white">Moderadores</div>
            <div className="modBT" onClick={handleOpenModal}>Registrarse</div>

            {isModalOpen && (
                <div className="modal-background ">
                    <div className="modal bg-mod/70 ">
                        <button className='closeBT' onClick={handleCloseModal}>x</button>
                        <form className='grid gap-6 text-left'>
                            <label className='formLabel' htmlFor="tipo-de-moderador">Registro moderadores Zengo</label>
                            <div>
                                <label className='formLabel' htmlFor="tipo-de-moderador">Tipo de moderador:</label>
                                <select className='drop' id="tipo-de-moderador" name="tipo-de-moderador">
                                    <option value="organizaciones-civiles">Organizaciones Civiles</option>
                                    <option value="sector-privado">Sector Privado</option>
                                    <option value="academia">Academia</option>
                                    <option value="gobierno">Gobierno</option>
                                    <option value="moderador-abierto">Moderador abierto</option>
                                </select>
                            </div>
                            <div>
                                <label className='formLabel' htmlFor="puesto">Puesto:</label>
                                <input className='input' type="text" id="puesto" name="puesto" />
                            </div>
                            
                            <div>
                                <label className='formLabel' htmlFor="organizacion">Organización:</label>
                                <input className='input' type="text" id="organizacion" name="organizacion" />
                            </div>

                            <input className='homeBT mx-auto mt-5' type="submit" value="Registrarse" />
                        </form>
                        
                    </div>
                </div>
            )}
            <div className="card1">
                <div className="rounded-dd p-3 text-white bg-black/20 relative">
                    <div className="text-xl pb-3">Organizaciones Civiles</div> 
                    <div className="modGrid">
                        <div className="modInfo">
                            <div>1.</div>
                            <div className="col-span-5">Representante</div>
                            <div className="col-span-6">Gobierno de Nuevo Leon</div>
                        </div>
                    </div>
                </div>
                <div className="rounded-dd p-3 text-white bg-black/20">
                    <div className="text-xl pb-3">Sector Privado</div> 

                </div>
                <div className="rounded-dd p-3 text-white bg-black/20">
                    <div className="text-xl pb-3">Academia</div> 
                </div>
                <div className="rounded-dd p-3 text-white bg-black/20">
                    <div className="text-xl pb-3">Gobierno</div> 
                </div>
                <div className="rounded-dd p-3 text-white bg-black/20">
                    <div className="text-xl pb-3">Moderador Abierto</div> 
                </div>
            </div>
            
        </div>
    )
}