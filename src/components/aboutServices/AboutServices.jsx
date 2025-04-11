import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faHeadset, faFingerprint } from '@fortawesome/free-solid-svg-icons';
import './AboutServices.css'

const AboutServices = () => {
  return (
    <>
     <div className="categories-header" >
        <div className="head">
          <div></div>
          <h2 className="categories-heading">What We Offer</h2>
        </div>
      </div>
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
  </>
  )
}

export default AboutServices