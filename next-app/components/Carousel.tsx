import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../assets/zengo.svg'


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
  { id: 6, title: 'Decentralized Budget' },
  { id: 7, title: 'Following' },
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
    <div className="overflow-hidden text-center h-full grid items-center mx-24 py-24 relative">
      {activeSection.id === 1 && (
      <div className='mx-96 gap-3 font-bau'>
        <Image
          src={logo}
          height={300}
          width={1488}
          alt='zengo logo'
          />
      </div>
      )}
      {activeSection.id === 2 && (
      <div>Problema</div>
      )}
      {activeSection.id === 3 && (
      <div>Modelo Zengo</div>
      )}
       {activeSection.id === 4 && (
      <div>Roles zengo</div>
      )}
       {activeSection.id === 5 && (
      <div>Verificación</div>
      )}
      {activeSection.id === 6 && (
      <div>Presupuesto Descentralizado</div>
      )}
      {activeSection.id === 7 && (
      <div>Seguimiento</div>
      )}
      <button
        className="absolute left-0 top-1/2 transform
         -translate-y-1/2 bg-gray-200 hover:text-white
          hover:bg-red-500 text-2xl m-auto h-12 w-12 px-2
          rounded-full shadow-md items-center grid text-center"
        onClick={goToPrevious}
      >
        ◀
      </button>
      <button
        className="absolute right-0 top-1/2 transform
         -translate-y-1/2 bg-gray-200 hover:text-white
          hover:bg-red-500 text-2xl  m-auto h-12 w-12 px-2
          rounded-full shadow-md items-center grid text-center"
        onClick={goToNext}
      >
        ►
      </button>
    </div>
  );
};

export default Carousel;