import React,{useEffect} from 'react';
// import './Refund.css';
import { useLocalContext } from '../../context/LocalContext';

const Refund = () => {
  const { webinfo } = useLocalContext();

  useEffect(()=>{
    document.title = `Refund and Return Policy | ${webinfo.name}`;
  })


  return (
    <div className='refund terms'>
      <div className="refundbox">
        <h1>Return & Refund Policy</h1>
        <p>Thank you for choosing {webinfo.name} for your antivirus needs. We are dedicated to ensuring your complete satisfaction with our products and services. Below, you'll find our Return & Refund Policy, which outlines our terms and conditions for returns and refunds.</p>
        
        <h2>1. Returns</h2>
        
        <h3>1.1 Defective or Damaged Products</h3>
        <p>If you receive a product that is defective or damaged, please reach out to our customer support team within 5 days of receiving your order at <a href={`mailto:${webinfo.email}`}>{webinfo.email}</a>. Our team is here to help and will guide you through the return process, including providing a Return Merchandise Authorization (RMA) number if needed. Please avoid returning the product without prior authorization.</p>
        
        <h3>1.2 Non-Defective Products</h3>
        <p>We gladly accept returns for non-defective products under the following conditions:</p>
        <ul>
          <li>The product must remain unopened, unused, and in its original packaging.</li>
          <li>Return requests must be made within 7 days of receiving your order.</li>
          <li>The cost of return shipping is the responsibility of the customer.</li>
        </ul>
        
        <h3>1.3 Return Process</h3>
        <p>To initiate a return, please follow these steps:</p>
        <ol>
          <li>Contact our customer support team at <a href={`mailto:${webinfo.email}`}>{webinfo.email}</a> to request an RMA number.</li>
          <li>Carefully package the product in its original packaging, including all accessories and documentation.</li>
          <li>Clearly write the RMA number on the outside of the package.</li>
          <li>Send the product to the address provided by our customer support team.</li>
        </ol>
        
        <h3>1.4 Inspection and Approval</h3>
        <p>Once we receive your returned product, we will conduct a thorough inspection to confirm it meets our return criteria. If the product qualifies, we will process a refund or replacement according to your preference.</p>
        
        <h2>2. Refunds</h2>
        
        <h3>2.1 Refund Methods</h3>
        <p>Refunds are available through the following methods:</p>
        <ul>
          <li><strong>Original Payment Method:</strong> If you used a credit card, debit card, or another electronic payment method for your purchase, the refund will be credited back to that original payment method.</li>
          <li><strong>Store Credit:</strong> Alternatively, you may opt to receive a refund in the form of store credit, which can be used for future purchases on our website.</li>
        </ul>
        
        <h3>2.2 Processing Time</h3>
        <p>Refunds will be processed within [X] business days of receiving the returned product. Please note that the time it takes for the refund to appear on your bank or credit card statement may vary depending on your financial institution.</p>
        
        <h2>3. Contact Information</h2>
        <p>If you have any questions or need assistance regarding our Return & Refund Policy, please don’t hesitate to contact us:</p>
        <p>{webinfo.name}<br />
           Email: <a href={`mailto:${webinfo.email}`}>{webinfo.email}</a><br />
           Website: <a href={`https://www.${webinfo.name}.com`} target="_blank" rel="noopener noreferrer">www.{webinfo.name}.com</a>
        </p>
        
        <h2>4. Policy Changes</h2>
        <p>We may update or modify this Return & Refund Policy from time to time. Any changes will be posted on our website, and the revised policy will apply to all purchases made after the effective date of the updated policy.</p>
        
        <p>By making a purchase from {webinfo.name}, you agree to the terms and conditions outlined in this Return & Refund Policy.</p>
        
        <h2>Need Assistance?</h2>
        <p>If you need any help with refunds or have related questions, please feel free to call us at:</p>
        <a href={`tel:${webinfo.phone}`}>{webinfo.phone}</a>
      </div>
    </div>
  );
};

export default Refund;
