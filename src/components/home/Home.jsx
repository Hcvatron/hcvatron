import React,{useEffect} from 'react';
import { useLocalContext } from '../../context/LocalContext';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';
import Hero from '../Hero/Hero'
import Blogs from '../blogs/Blogs';
import Brands from '../categories/Antivirus/Brands/Brands';
import Disclaimer from '../T&C/Disclaimer';
import BestSeller from '../categories/Antivirus/BestSeller/BestSeller';
import TopSeller from '../categories/Antivirus/TopSeller/TopSeller';
import ParallaxBanner from '../Banner/ParallaxBanner';
import CarouselComponent from '../Carousel/CarouselComponent';
import AboutServices from '../aboutServices/AboutServices';
import OnlineAntivirusInfo from '../OnlineAntivirusInfo/OnlineAntivirusInfo';
import Categories from '../categories/Antivirus/Categories';
import PrinterBrands from '../categories/Printer/Brands/PrinterBrands';
import RoutersBrands from '../categories/Routers/Brands/RoutersBrands';
import Prcategories from '../categories/Printer/Prcategories';
import Rcategories from '../categories/Routers/Rcategories';
import Wcategories from '../categories/Windows/Wcategories';


const Home = () => {

  const { webinfo } = useLocalContext();
   useEffect(()=>{
      document.title = `Home | ${webinfo.name} `;
    })

  return (
    <>
      <div className='comp home' style={{ width: '100%' }}>
       <Hero />
       {/* <Hero2 /> */}
       {/* <CarouselComponent /> */}
       <AboutServices />
       <Blogs />
       <Categories />
       <Wcategories />
       <Prcategories />
       <Rcategories />
   
      {/* <Slider /> */}
      </div>
      <ParallaxBanner />
      <WhyChooseUs />
      <OnlineAntivirusInfo />
      <BestSeller />
      <TopSeller />
      <Brands />
      <PrinterBrands />
      <RoutersBrands />
      <Disclaimer />
    </>
  );
};

export default Home;
