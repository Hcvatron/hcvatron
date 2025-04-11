import React, { useEffect } from 'react'
import './About.css'
import AboutTop from './about-components/about-top/AboutTop';
import AboutBot from './about-components/about-bot/AboutBot';
import AboutMission from './about-components/about-mission/AboutMission';
import AboutTeam from './about-components/about-team/AboutTeam';
import AboutValues from './about-components/about-values/AboutValues';
import AboutJourney from './about-components/about-journey/AboutJourney';
import AboutChart from './about-components/about-chart/AboutChart';
// import Banner from '../Home/Banner/Banner'

const About = () => {

    useEffect(()=>{
        document.title = "About | Hc Vatron";
    })

  return (
    <div className='about'>
     <AboutTop />
     <AboutBot />
     <AboutMission />
     <AboutTeam />
     <AboutValues />
     <AboutJourney />
     <AboutChart />
     {/* <Banner /> */}
    </div>
  )
}

export default About