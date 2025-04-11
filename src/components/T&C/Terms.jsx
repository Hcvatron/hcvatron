import React,{useEffect} from 'react';
import './Terms.css';
import { useLocalContext } from '../../context/LocalContext';

const Terms = () => {
  const { webinfo } = useLocalContext();

  useEffect(()=>{
    document.title = `Terms and Conditions | ${webinfo.name}`;
  })


  return (
    <div className="terms comp">
      <h1>Terms and Conditions</h1>
      <p>Welcome to {webinfo.name}!</p>
      <p>
        We are delighted to have you visit {webinfo.name}'s website, accessible at <a href={`https://www.${webinfo.name}.com/`} target="_blank" rel="noopener noreferrer">https://www.{webinfo.name}.com/</a>.
      </p>
      <p>
        By accessing and using our website, you agree to comply with these Terms and Conditions. If you have any concerns or do not agree with any part of these terms, please refrain from using our website.
      </p>

      <h2>1. Use of the Site</h2>

      <h3>1.1 Eligibility</h3>
      <p>
        We kindly ask that you ensure you are of legal age in your jurisdiction before using this site. If you are not of legal age, we respectfully request that you do not use this site.
      </p>

      <h3>1.2 Account Security</h3>
      <p>
        To access certain features, you may need to create an account. We trust you to keep your account credentials, including your username and password, secure. You are responsible for all activities under your account. If you suspect any unauthorized use of your account, please notify us right away.
      </p>

      <h2>2. Intellectual Property</h2>
      <p>
        All content, features, and functionality on our site are the exclusive property of {webinfo.name} and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
      </p>

      <h2>3. User-Submitted Content</h2>

      <h3>3.1 Submissions</h3>
      <p>
        If you choose to submit content such as reviews or comments (“User Content”), you grant us a non-exclusive, worldwide, royalty-free, irrevocable, sublicensable, and perpetual license to use, display, reproduce, adapt, modify, distribute, and promote this content in any form or media. We trust that you have the rights to grant this license and that your User Content does not infringe on any third-party rights.
      </p>

      <h3>3.2 Restrictions</h3>
      <p>
        We kindly ask that you refrain from posting any User Content that may be illegal, harmful, or objectionable. We reserve the right to remove any content that does not meet our standards or that we believe is inappropriate.
      </p>

      <h2>4. Limitation of Liability</h2>
      <p>
        {webinfo.name} and its affiliates will not be held responsible for any damages arising from:
      </p>
      <ul>
        <li>Your use of or inability to use the site.</li>
        <li>Unauthorized access to or use of our servers and personal information.</li>
        <li>Any bugs, viruses, or harmful code transmitted to or through our site.</li>
        <li>Errors, inaccuracies, or omissions in content or any resulting loss or damage.</li>
      </ul>

      <h2>5. Changes to Terms</h2>
      <p>
        We may update these Terms and Conditions from time to time. Any changes will be posted here, and the updated terms will apply from the date of posting. We encourage you to review this page periodically.
      </p>

      <h2>6. Contact Information</h2>
      <p>
        If you have any questions or need further information about these Terms and Conditions, please feel free to contact us at:
      </p>
      <p>
        {webinfo.name}<br />
        Email: {webinfo.email}<br />
        Phone: {webinfo.phone}<br />
        Website: <a href={`https://www.${webinfo.name}.com/`} target="_blank" rel="noopener noreferrer">www.{webinfo.name}.com</a>
      </p>
    </div>
  );
};

export default Terms;
