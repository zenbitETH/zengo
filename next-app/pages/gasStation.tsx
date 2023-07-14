import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import poap from '../assets/poaptest.png'
import { useAccount } from 'wagmi';
import axios from 'axios';



// poap api key: 0yYbM2ktD4SPSsFu1TXidinC7Q2ACRN9LmkWSQQGX2T809jdVYsoGiHmNSr0a4dBEafZ7hcMUz6IXrQUhx7cjHo46MWP5pTS3jBwfJeOW00h70EeA0JU6XQ7fx3v1QD7 

export default function GasStation() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModal2Open, setIsModal2Open] = useState(false);
    const [secretWord, setSecretWord] = useState("");
    const { address } = useAccount();

    useEffect(() => {
        console.log(secretWord)
    }, [address, secretWord])
    

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenModal2 = () => {
        setIsModal2Open(true);

    };

    const handleCloseModal2 = () => {
        setIsModal2Open(false);
    };

    const claimPoap = () => {
        // step 1: getting qr hash
        const options = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5qQTNOalpGUWpkRE9ESTNRa0V3UlVSRE9VVkVNRVUxT1VVd1JrSTNNRGs1TlRORVFqUTNSUSJ9.eyJpc3MiOiJodHRwczovL2F1dGguYWNjb3VudHMucG9hcC54eXovIiwic3ViIjoic3MybGNiM1Vmd1pKT0NNVkxTZmlERUNkckd0YThVWmhAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYXBpLnBvYXAudGVjaCIsImlhdCI6MTY4OTI2MzUzNCwiZXhwIjoxNjg5MzQ5OTM0LCJhenAiOiJzczJsY2IzVWZ3WkpPQ01WTFNmaURFQ2RyR3RhOFVaaCIsInNjb3BlIjoibWludCIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsInBlcm1pc3Npb25zIjpbIm1pbnQiXX0.h5fPE-CRAU9f2avL-YWH4AQBi_aTRnxjTBewE4DDaPClC6uuc9_u3GZZzyPlCnWuJnt7sLDo8xG1aWjZHmcH9HDeLNUVRSwLMz8-1DLvxhvpYr2fvVwXzVDNNWprGWM5L2xYFehSnTto20EV4uUK-XoLdCrSqmXGTYXbf_ZxAYFGXXmtuWapj3tJxujpTXztJKaSHTi8veNbQv3DLWVC9-7JghSYT-t6Xip8xY8g6WNRdawE_X-SwAu-9swasvBrFBkv1jqfNVOJrz6OmQXcIDP5H-bd4m2fCYcYCG88NG0z0HdcHilkctqOQwPsshMKhkiYO4xtmyDxgBELWpUD6A',
              'x-api-key': '0yYbM2ktD4SPSsFu1TXidinC7Q2ACRN9LmkWSQQGX2T809jdVYsoGiHmNSr0a4dBEafZ7hcMUz6IXrQUhx7cjHo46MWP5pTS3jBwfJeOW00h70EeA0JU6XQ7fx3v1QD7'
            },
            body: JSON.stringify({secret_code: '859707'})
          };
          
          fetch('https://api.poap.tech/event/141409/qr-codes', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }

    return (
        <div className="from-cit to-mod bg-gradient-to-t h-screen grid items-center text-center mx-auto">
             
            <div className="grid 2xl:grid-cols-2 gap-3 px-3 xl:px-32 py-20 h-full text-white font-bau">
                <div className="bg-black/20 rounded-dd h-full p-3 grid items-center">
                    <div className="text-3xl">1. Obtén el POAP que certifica tu participación:</div>
                    <div className="md:mx-32 mx-3 grid">
                        <div className="text-xl font-exo pb-5">Ingresa la palabra secreta del evento:</div>
                        <input type='text' placeholder='Escribe la palabra una vez que termine el evento' className='input font-exo text-xl' onChange={e => setSecretWord(e.target.value)}></input>
                    </div>
                    <div className="homeBT mt-5 w-fit mx-auto" onClick={claimPoap}>Obtener POAP</div>
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
                    <div className="homeBT mt-10 w-fit mx-auto" onClick={handleOpenModal2}>Obtener gas</div>
                    {isModal2Open && (
                    <div className="modal-background">
                        <div className="modal bg-white/30 ">
                            <button className='closeBT' onClick={handleCloseModal2}>x</button>
                            <div className='grid gap-6 p-10'>
                                <div className='text-2xl font-bau'>Tu ETH va en camino</div>
                                <span className='text-8xl animate-pulse'>🔥</span>
                                <div className='text-xl animate-pulse' /*animate-none and "Tu dirección 0x123abc recibio 0.001 ETH para el gas de tus interacciones en Zengo" after gas is claimed*/>
                                    cargando...
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                </div> 
            </div>
        </div>
    )
}