import type { NextPage } from 'next';
import Carousel from '../components/Carousel';


const Home: NextPage = () => {
  return (
    <div className='from-cata-300 to-mods-300 bg-gradient-to-br h-screen'>
      <Carousel/>
    </div>

  );
};

export default Home;
