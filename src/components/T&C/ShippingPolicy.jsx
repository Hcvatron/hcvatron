import React,{useEffect} from 'react';
import { useLocalContext } from '../../context/LocalContext';

const ShippingPolicy = () => {
  const { webinfo } = useLocalContext();

  useEffect(()=>{
    document.title = `Shipping Policy | ${webinfo.name}`;
  })


  return (
    <div className='shipping-policy terms comp'>
      <div className="policy-box">
        <h1>Shipping Policy</h1>
        <p>Thank you for choosing {webinfo.name} for your antivirus needs. We are dedicated to providing you with a smooth experience and ensuring that your digital products reach you promptly. Please take a moment to review the details of our shipping policy below.</p>
        
        <h2>Digital Product Delivery</h2>
        
        <h3>Delivery Method</h3>
        <p>Upon completing your purchase, the digital license key(s) for your antivirus product will be sent to the email address you provided during checkout. You can expect to receive an email with your license key(s) shortly after your payment has been confirmed.</p>
        
        <h3>Delivery Timeframe</h3>
        <p>We strive to deliver your digital license key(s) as quickly as possible. Typically, you should receive your key(s) within a few minutes of completing your purchase. However, during peak times or in exceptional circumstances, please allow up to 24 hours for delivery.</p>
        
        <h3>Email Delivery</h3>
        <p>Your license key(s) will be sent to the email address associated with your order. Please ensure that this email address is correct and accessible. If you do not receive the email within the expected timeframe, kindly check your spam or junk folder. If you still do not see it, please contact our customer support team for assistance.</p>
        
        <h3>License Key Activation</h3>
        <p>The email containing your license key(s) will also include instructions for activation. Please follow these instructions carefully to activate your key(s) and access your product(s) or service(s).</p>
        
        <h2>Refunds and Returns</h2>
        <p>Given the nature of digital products, we generally do not offer refunds or returns for license keys once they have been delivered. However, exceptions may be made in accordance with our refund policy. If you have any issues, please refer to our Return & Refund Policy or reach out to our support team for assistance.</p>
        
        <h2>Customer Support</h2>
        <p>If you have any questions or encounter any issues with your license key(s) or the activation process, our customer support team is here to assist you. Please feel free to contact us at <a href={`mailto:${webinfo.email}`}>{webinfo.email}</a> for prompt assistance.</p>
        
        <p>By purchasing digital products from {webinfo.name}, you agree to adhere to our shipping policy for license keys. Should you have any concerns or need further clarification, please do not hesitate to reach out to us.</p>
        
        <h2>Contact Information</h2>
        <p>{webinfo.name}<br />
           Email: <a href={`mailto:${webinfo.email}`}>{webinfo.email}</a><br />
           Website: <a href={`https://www.${webinfo.name}.com`} target="_blank" rel="noopener noreferrer">www.{webinfo.name}.com</a>
        </p>
      </div>
    </div>
  );
};

export default ShippingPolicy;
