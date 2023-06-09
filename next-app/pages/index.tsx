import { useAccount } from "wagmi";
import type { NextPage } from 'next';
import Carousel from '../components/Carousel';
import Ceremony from "../components/Ceremony";


const Home: NextPage = () => {
const { isConnected } = useAccount();
  return (
    <div className='from-cit to-mod bg-gradient-to-t h-screen'>
      {!isConnected && <Carousel/>}
      {isConnected && (
        <Ceremony/>
      )}
    </div>

  );
};

export default Home;
