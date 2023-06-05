import React, { useState } from 'react';
import Image from 'next/image'
import car1 from '../assets/Carousel1.png'
import car2 from '../assets/Carousel2.png'
import car3 from '../assets/Carousel3.png'
import car4 from '../assets/Carousel4.png'
import car5 from '../assets/Carousel5.png'
import car6 from '../assets/Carousel6.png'
import prev from '../assets/prev.svg'
import next from '../assets/next.svg'
import foot from '../assets/footer.png'


const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const images = [
    car1,
    car2,
    car3,
    car4,
    car5,
    car6
  ];

  return (
    <div className="overflow-hidden text-center h-full grid items-center mx-36">
      <div className='relative'>
        <button
          className="carButton left-0"
          onClick={handlePrevious}
        >
          <Image
          className=''
          src={prev}
          width={25}
          height={25}
          alt="Carousel Button"
          />
        </button>
        <button
          className="carButton right-0"
          onClick={handleNext}
        >
          <Image
          className=''
          src={next}
          width={25}
          height={25}
          alt="Carousel Button"
          />
        </button>
        <Image
          className="w-full z-0 h-64 object-cover "
          src={images[currentIndex]}
          width={1920}
          height={1080}
          alt="Carousel Image"
        />
      </div>
      <div className='fixed bottom-5 max-w-2xl fixed left-1/2 -translate-x-1/2'>
        <Image
          src={foot}
          width={800}
          height={101}
          alt="Carousel Image"
        />
        
      </div>
    </div>
  );
};

export default Carousel;