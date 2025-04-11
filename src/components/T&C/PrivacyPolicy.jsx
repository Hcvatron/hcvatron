import React,{useEffect} from 'react';
import { useLocalContext } from '../../context/LocalContext';
import './Terms.css';

const PrivacyPolicy = () => {
  const { webinfo } = useLocalContext();

  useEffect(()=>{
    document.title = `Privacy Policy | ${webinfo.name}`;
  })


  return (
    <div className="privacy-policy terms comp">
      <h1>Privacy Policy</h1>
      <p>Welcome to {webinfo.name}! We sincerely value your privacy and are committed to safeguarding your personal information. This Privacy Policy details how we collect, use, and protect your information when you visit our website, <a href={`https://www.${webinfo.name}.com/`} target="_blank" rel="noopener noreferrer">{webinfo.name}</a>.</p>
      
      <h2>1. Information We Collect</h2>
      <p>To enhance your experience with us, we collect the following types of information:</p>
      <ul>
        <li><strong>Personal Information:</strong> When you make a purchase, create an account, or subscribe to our newsletter, we may collect personal details such as your name, email address, billing address, phone number, and payment information.</li>
        <li><strong>Technical Information:</strong> We gather technical data such as your IP address, browser type, operating system, referring URLs, and the pages you visit on our website.</li>
        <li><strong>Usage Information:</strong> We monitor how you interact with our website, including the pages you view, the links you click, and other actions you take, to improve your experience.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li><strong>Provide Services:</strong> Process your orders, manage your account, and offer you support in a timely manner.</li>
        <li><strong>Improve Our Website:</strong> Analyze technical and usage data to enhance the functionality and overall user experience of our website.</li>
        <li><strong>Communicate With You:</strong> Send you updates, newsletters, and promotional materials that may interest you. You can opt out of these communications at any time.</li>
        <li><strong>Ensure Security:</strong> Protect our website and users from fraud, abuse, and other potential security risks.</li>
      </ul>

      <h2>3. Sharing Your Information</h2>
      <p>We are committed to not selling or renting your personal information. However, we may share your information under the following circumstances:</p>
      <ul>
        <li><strong>Service Providers:</strong> Share with trusted partners who assist us in operating our website, processing payments, and providing services.</li>
        <li><strong>Legal Requirements:</strong> Disclose your information when required by law or in response to legal processes, such as a court order or subpoena.</li>
        <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new owner, ensuring continued protection.</li>
      </ul>

      <h2>4. Cookies and Tracking Technologies</h2>
      <p>We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small text files placed on your device to remember your preferences and understand how you use our site. You can manage your cookie preferences through your browser settings.</p>

      <h2>5. Data Security</h2>
      <p>We implement robust security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. While we strive to ensure the security of your data, please be aware that no method of transmission over the Internet or electronic storage is entirely secure.</p>

      <h2>6. Your Rights</h2>
      <p>You have the right to access, update, and delete your personal information. If you wish to exercise these rights, please contact us at info@{webinfo.name}, and we will respond to your request as promptly as possible.</p>

      <h2>7. Children’s Privacy</h2>
      <p>Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected information from a child under 13, please inform us immediately so we can take appropriate action.</p>

      <h2>8. Changes to This Privacy Policy</h2>
      <p>We may update this Privacy Policy occasionally to reflect changes in our practices or legal requirements. We will inform you of any significant changes by posting the revised policy on our website with an updated effective date.</p>

      <h2>9. Contact Us</h2>
      <p>If you have any questions or concerns regarding this Privacy Policy, please do not hesitate to reach out to us:</p>
      <p>{webinfo.name}<br />
         Email: {webinfo.email}<br />
         Website: <a href={`https://www.${webinfo.name}.com/`} target="_blank" rel="noopener noreferrer">www.{webinfo.name}.com</a>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
