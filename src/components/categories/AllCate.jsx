import React, { useEffect } from 'react';
import './AllCate.css';
import BestSeller from './Antivirus/BestSeller/BestSeller';
import TopSeller from './Antivirus/TopSeller/TopSeller';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';
import Brands from './Antivirus/Brands/Brands';
import Categories from './Antivirus/Categories';
import { useLocalContext } from '../../context/LocalContext';
import Wcategories from './Windows/Wcategories';
import Prcategories from './Printer/Prcategories';


const AllCate = () => {

  const {webinfo} = useLocalContext();

  useEffect(()=>{
    document.title  = `All Categories | ${webinfo.name} `
  })

  return (
    <div className="allcate">
      <div className="cate-head">
        <h2>Explore the Collection</h2>
      </div>
      <div className="">
        <Categories />
        <Wcategories />
        <Prcategories />
         <BestSeller />
         <TopSeller />
         <WhyChooseUs />
      </div>
    </div>
  );
};

export default AllCate;
