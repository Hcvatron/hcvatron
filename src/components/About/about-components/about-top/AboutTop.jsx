import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './AboutTop.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faHeadset, faFingerprint } from '@fortawesome/free-solid-svg-icons';

const AboutTop = () => {
  return (
    <div className='aboutTop'>
      <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} interval={5000} className='carousel-width'>
        {/* Slide 1 */}
        <div className='aboutTop__container'>
          <div className='aboutTop__content'>
            <div className='aboutTop__text'>
              <h4>HCVatron For Cyber Security</h4>
              <h1>Your Shield Against Digital Threats.</h1>
              <p>Protect your online presence with our top-of-the-line antivirus solutions tailored for your needs.</p>
              <button className='aboutTop__button'>Explore Products</button>
            </div>
            <div className='aboutTop__image'>
              <img src='https://github.com/applessupport/imp_files/blob/main/img/1000020398-removebg-preview.png?raw=true' alt='Antivirus Protection' />
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className='aboutTop__container'>
          <div className='aboutTop__content'>
            <div className='aboutTop__text'>
              <h4>Secure Your Digital Life</h4>
              <h1>Advanced Protection for All Devices.</h1>
              <p>Our comprehensive security solutions ensure safety across all your devices, keeping your data safe.</p>
              <button className='aboutTop__button'>Learn More</button>
            </div>
            <div className='aboutTop__image'>
              <img style={{width:"80%",marginTop:"-2rem"}} src='https://github.com/applessupport/imp_files/blob/main/img/1000020401-removebg-preview.png?raw=true' alt='Cybersecurity Solutions' />
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className='aboutTop__container'>
          <div className='aboutTop__content'>
            <div className='aboutTop__text'>
              <h4>Innovative Cybersecurity Solutions</h4>
              <h1>Stay Ahead of Threats.</h1>
              <p>With real-time updates and proactive monitoring, we help you stay one step ahead of cyber threats.</p>
              <button className='aboutTop__button'>Shop Now</button>
            </div>
            <div className='aboutTop__image'>
            <img style={{width:"80%",marginTop:"-6rem"}} src='https://github.com/applessupport/imp_files/blob/main/img/1000020400-removebg-preview.png?raw=true' alt='Device Security' />
            </div>
          </div>
        </div>
      </Carousel>

      <div className='aboutBot__container'>
        <div className='aboutBot__services'>
          <div className='aboutBot__service'>
            <FontAwesomeIcon icon={faShieldAlt} size="3x" />
            <h3>Latest Antivirus Shield</h3>
            <p>Our products protect against viruses, malware, and online threats, ensuring your peace of mind.</p>
          </div>
          <div className='aboutBot__service'>
            <FontAwesomeIcon icon={faHeadset} size="3x" />
            <h3>Customer-Centric Support</h3>
            <p>Our dedicated support team is here to assist you 24/7 with any issues or queries.</p>
          </div>
          <div className='aboutBot__service'>
            <FontAwesomeIcon icon={faFingerprint} size="3x" />
            <h3>Secure Online Transactions</h3>
            <p>Shop with confidence knowing your payment information is protected with our advanced security features.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTop;
