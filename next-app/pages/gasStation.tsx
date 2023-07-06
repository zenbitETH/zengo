import React, { useState } from 'react';
import Image from 'next/image';
import poap from '../assets/poaptest.png'

export default function GasStation() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="from-cit to-mod bg-gradient-to-t h-screen grid items-center text-center mx-auto">
             
            <div className="grid grid-cols-2 gap-3 px-32 py-20 h-full text-white font-bau">
                <div className="bg-black/20 rounded-dd h-full p-3 grid items-center">
                    <div className="text-3xl">1. Obtén el POAP que certifica tu participación:</div>
                    <div className="mx-32 grid">
                        <div className="text-xl font-exo pb-5">Ingresa la palabra secreta del evento:</div>
                        <input type='text' placeholder='Escribe la palabra una vez que termine el evento' className='input font-exo text-xl'></input>
                    </div>
                    <div className="homeBT mt-5 w-fit mx-auto" onClick={handleOpenModal}>Obtener POAP</div>
                    {isModalOpen && (
                    <div className="modal-background">
                        <div className="modal bg-white/30 ">
                            <button className='closeBT' onClick={handleCloseModal}>x</button>
                            <div className='grid gap-6 p-3'>
                                <div>
                                    <Image src={poap} height={250} width={250} alt='onboarding POAP'
                                    className='rounded-full animate-pulse' /*animate-none after POAP is claimed*//>
                                </div>
                                <div className='text-2xl font-bau'>Tu poap va en camino</div>
                                <div className='text-xl animate-pulse'  /*animate-none and "Tu dirección 0x123abc recibio el POAP que certifica <br/>tu asistencia al evento de intrroducción a Zengo" after POAP is claimed*/>
                                    cargando...
                                </div>
                            </div>
                        </div>
                    </div>
                    )}

                </div>
                <div className="bg-black/20 rounded-dd h-full p-3 grid items-center ">
                    <div className="text-3xl">2 Obtén gas con tu POAP del evento</div>
                    <div className="text-6xl animate-pulse font-exo"> No cuentas con el POAP</div>
                    <div className="homeBT mt-10 w-fit mx-auto" >Obtener gas</div>
                </div> 
            </div>
        </div>
    )
}