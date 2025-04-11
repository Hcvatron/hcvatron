import React from "react";
import "./Disclaimer.css";
import { useLocalContext } from "../../context/LocalContext";

const Disclaimer = () => {
  const { webinfo } = useLocalContext();

  return (
    <section className="disclaimer-section">
      <div className="disclaimer-container">
        <p className="disclaimer-text">
          <strong>Disclaimer:</strong> {webinfo.name} states that all trademarks, brand names, and product names mentioned are the property of their respective owners. We use third-party trademarks and logos for informational purposes only and do not imply endorsement by the respective brands.
        </p>
        <p className="disclaimer-text">
          {webinfo.name} operates as an independent reseller and provides support exclusively for products purchased through our platform. For official support, please contact the respective brand directly.
        </p>
        <p className="disclaimer-text">
          We adhere to fair trade practices and comply with FTC’s Mail, Internet, or Telephone Order Merchandise Rule for consumer protection. 
        </p>
        <p className="disclaimer-text">
          By using our services, you agree that {webinfo.name} is not responsible for third-party product issues, including performance or compatibility. Contact our support team for assistance related to your purchase.
        </p>
      </div>
    </section>
  );
};

export default Disclaimer;
