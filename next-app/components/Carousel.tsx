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
        className="carBT left-0"
        onClick={goToPrevious}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"> <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/> </svg>
      </button>
      <button
        className="carBT right-0"
        onClick={goToNext}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className='fill-bgd/50 hover:fill-white'  viewBox="0 0 16 16"> <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/> </svg>
      </button>
    </div>
  );
};

export default Carousel;