import React from "react";
import "./Brands.css";

const RoutersBrands = () => {
  const brandLogos = [
    {
      id: 1,
      name: "Netgear",
      logo: "https://res.cloudinary.com/dcf3mojai/image/upload/v1740500792/Netgear-Logo.wine_wiehvt.png",
      description: "Advanced networking and WiFi solutions for seamless connectivity.",
    },
    {
      id: 2,
      name: "TP-Link",
      logo: "https://res.cloudinary.com/dcf3mojai/image/upload/v1740500857/TP-Link-Logo.wine_fdplj8.png",
      description: "Reliable routers and networking devices for home and business.",
    },
    {
      id: 3,
      name: "ASUS",
      logo: "https://res.cloudinary.com/dcf3mojai/image/upload/v1740500941/Asus-Logo_pindua.png",
      description: "Powerful networking and gaming routers for superior performance.",
    },
    {
      id: 4,
      name: "D-Link",
      logo: "https://res.cloudinary.com/dcf3mojai/image/upload/v1740500998/D-Link-Logo.wine_b2amaw.svg",
      description: "High-speed internet solutions with cutting-edge security features.",
    },
    {
      id: 5,
      name: "Cisco",
      logo: "https://res.cloudinary.com/dcf3mojai/image/upload/v1740584434/Cisco-logo_mttz72.png",
      description: "Enterprise-grade networking hardware and security solutions.",
    }
  ];

  return (
    <section className="brands-section">
      <div className="brands-header">
      <h2 className="brands-title">Trusted by Leading Networking Brands</h2>
        <p className="brands-description">
          Discover top router brands providing high-speed, secure, and reliable networking solutions for homes and businesses.
        </p>
      </div>
      <div className="brands-grid">
        {brandLogos.map((brand) => (
          <div key={brand.id} className={`brand-card ${brand.name}`}>
            <img src={brand.logo} alt={brand.name} className="brand-logo" />
            <h3 className="brand-name">{brand.name}</h3>
            <p className="brand-description">{brand.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RoutersBrands;
