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
      <div className='md:mx-20 gap-3 font-bau md:h-[30rem] h-[20rem] grid items-center py-5'>
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
      <div className='m-10'>
        <Image 
        src={car1}
        width={1920}
        height={1080}
        alt='descripción'/>
      </div>
      )}
      {activeSection.id === 3 && (
      <div className='m-10'>
      <Image 
        src={car2}
        width={1920}
        height={1080}
        alt='Usuarios'/>
      </div>
      )}
       {activeSection.id === 4 && (
      <div className='m-10'>
        <Image 
          src={car3}
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
        className="absolute left-0 top-1/2 transform
         -translate-y-1/2 bg-gray-200 hover:text-white
          hover:bg-cit text-2xl m-auto h-12 w-12 px-2
          rounded-full shadow-md items-center grid text-center"
        onClick={goToPrevious}
      >
        ⏴
      </button>
      <button
        className="absolute right-0 top-1/2 transform
         -translate-y-1/2 bg-gray-200 hover:text-white
          hover:bg-mod text-2xl  m-auto h-12 w-12 px-2
          rounded-full shadow-md items-center grid text-center"
        onClick={goToNext}
      >
        ⏵
      </button>
    </div>
  );
};

export default Carousel;