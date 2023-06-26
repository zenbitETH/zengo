import React, { useState } from 'react';
import Image from 'next/image';
import car1 from '../assets/car1.png'
import car2 from '../assets/car2.png'
import car3 from '../assets/car3.png'
import car4 from '../assets/car4.png'


interface Section {
  id: number;
  title: string;
}

const sections: Section[] = [
  { id: 1, title: 'Home' },
  { id: 2, title: 'Problem' },
  { id: 3, title: 'Zengo Model' },
  { id: 4, title: 'Zengo Roles' },
  { id: 5, title: 'Verification' },
];

const Carousel: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(sections[0]);

  const goToPrevious = () => {
    const currentIndex = sections.findIndex((section) => section.id === activeSection.id);
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1]);
    }
  };

  const goToNext = () => {
    const currentIndex = sections.findIndex((section) => section.id === activeSection.id);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1]);
    }
  };


  return (
    <div className="overflow-hidden text-center h-screen grid items-center xl:mx-28 relative">
      {activeSection.id === 1 && (
      <div className='md:mx-20 gap-3 font-bau md:h-[30rem] h-[16rem] md:h-[40rem] grid items-center py-5 px-3'>
        <iframe
          className="w-full h-full rounded-dd"
          src="https://www.youtube.com/embed/G7e5jdp9mhc"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="YouTube video player"
        />
      </div>
      )}
      {activeSection.id === 2 && (
      <div className='mx-3 py-24 gap-5 h-full grid items-center grid-cols-2 text-white font-exo overflow-y-auto '>
        <div className='bg-black/20 rounded-dd h-full p-5 col-span-2 md:col-span-1'>
          <div className='text-3xl font-bau text-left mb-3'>Descripción General</div>
          <div className='text-sm md:text-base text-justify '>
            Zengo: Presupuesto descentralizado es una aplicación colaborativa que impulsa la transparencia en la gobernanza urbana
            mediante el uso de software de código abierto y tecnologías descentralizadas. Nuestra plataforma permite la participación 
            ciudadana a través del registro de propuestas que abordan las necesidades reales de la comunidad, y cuenta con un presupuesto 
            descentralizado que se asigna a dichas propuestas por votación plural.
            <br/><br/>
            En zengo, valoramos dar voz a los ciudadanos en la toma de decisiones sobre el presupuesto público. Nuestra plataforma web 
            participativa y transparente facilita la generación, verificación, financiamiento, seguimiento y gestión de propuestas públicas, 
            donde ciudadanos, representantes gubernamentales y otros actores colaboran para abordar y resolver las necesidades en los espacios
            públicos.
            <br/><br/>
            Nuestra misión es promover la transparencia y fortalecer la participación ciudadana en la asignación y uso de los recursos públicos, 
            empoderando a los ciudadanos y promoviendo una gestión pública equitativa y eficiente, basada en las necesidades reales de los espacios
            urbanos.
            <br/><br/>
            Como visión, aspiramos a ser un referente en la transformación de la gestión pública, impulsando la transparencia, 
            la participación ciudadana y la rendición de cuentas en la asignación y uso del presupuesto descentralizado como un bien público
            de gobernanza urbana. Nuestro objetivo es promover una gestión pública que refleje los valores de transparencia, participación 
            ciudadana, equidad, colaboración y mejora de la calidad de vida de la comunidad.
          </div>
        </div>
        <div className='h-full grid grid-rows-2 gap-5 col-span-2 md:col-span-1'>
          <div className='bg-black/20 rounded-dd h-full p-5 '>
            <div className='text-3xl font-bau text-left mb-2'>Usuarios zengo</div>
            <div className='text-sm md:text-base text-justify pb-3'>
              En zengo, los usuarios tienen la posibilidad de adoptar uno de los tres roles 
              disponibles en la aplicación, cada uno de los cuales contribuye en distintas etapas de los ciclos de gobernanza 
              y cuenta con funciones específicas (consulta página 3).
            </div>
            <div className=''>
              <Image src={car1} height={150} width={640} alt='Usuarios zengo'></Image>
            </div>
          </div>
          <div className='bg-black/20 rounded-dd h-full p-5'>
            <div className='text-3xl font-bau text-left mb-3'>Modelo zengo</div>
            <div className='text-sm md:text-base text-justify mb-2'>
              En zengo, seguimos un enfoque de ciclos de gobernanza abiertos, en los cuales ciudadanos y representantes de los sectores 
              público y privado colaboran en las cuatro etapas que componen cada ciclo (consulta página 4)
            </div>
            <div className=''>
              <Image src={car2} height={150} width={640} alt='Usuarios zengo'></Image>
            </div>
          </div>
        </div>
      </div>
      )}
      {activeSection.id === 3 && (
      <div className='m-10'>
      <Image 
        src={car3}
        width={1920}
        height={1080}
        alt='Usuarios'/>
      </div>
      )}
       {activeSection.id === 4 && (
      <div className='m-10'>
        <Image 
          src={car4}
          width={1920}
          height={1080}
          alt='Modelo Zengo'/>
      </div>
      )}
       {activeSection.id === 5 && (
      <div className='m-10'>
        <Image 
          src={car4}
          width={1920}
          height={1080}
          alt='Modelo Zengo'/>
      </div>
      )}
      <button
        className="carBT left-3"
        onClick={goToPrevious}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"> <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/> </svg>
      </button>
      <button
        className="carBT right-3"
        onClick={goToNext}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"   viewBox="0 0 16 16"> <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/> </svg>
      </button>
    </div>
  );
};

export default Carousel;