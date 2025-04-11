import React from "react";
import "./Brands.css";

const Brands = () => {
  const brandLogos = [
    {
      id: 1,
      name: "McAfee",
      logo: "https://res.cloudinary.com/dcf3mojai/image/upload/v1737531060/McAfee-Logo_ueh5ul.png",
      description: "Advanced security solutions to protect your digital life.",
    },
    {
      id: 2,
      name: "Norton",
      logo: "https://res.cloudinary.com/dcf3mojai/image/upload/v1737749617/images_hwx6b7.png",
      description: "Trusted antivirus software for decades.",
    },
    {
      id: 3,
      name: "Webroot",
      logo: "https://res.cloudinary.com/dcf3mojai/image/upload/v1738063553/Webroot-logo-global-icon-color_1200x600-840x420_sqwoix.webp", 
      description: "Cloud-based antivirus with lightning-fast performance and minimal impact.",
    },
    {
      id: 4,
      name: "Kaspersky",
      logo: "https://res.cloudinary.com/dcf3mojai/image/upload/v1737748961/kaspersky-rebranding-in-details-1_usbqpc.jpg",
      description: "Global leader in malware and ransomware protection.",
    },
    {
      id: 5,
      name: "Avast",
      logo: "https://res.cloudinary.com/dcf3mojai/image/upload/v1737748247/2560px-Avast_logo_2021.svg_ecuhnk.png",
      description: "Powerful free and premium security tools.",
    },
    {
      id: 6,
      name: "AVG",
      logo: "https://res.cloudinary.com/dcf3mojai/image/upload/v1737748597/AVG-Logo_eepdxp.jpg",
      description: "Affordable antivirus solutions with top-notch features.",
    },
    {
      id: 7,
      name: "Bitdefender",
      logo: "https://res.cloudinary.com/dcf3mojai/image/upload/v1737748913/04rk8yqu2cixbmdjvdlqrnz-28-1595951943-fit-scale-size-1028x578_fyjpmu.png",
      description: "Award-winning cybersecurity for all devices.",
    },
    {
      id: 8,
      name: "TotalAV",
      logo: "https://res.cloudinary.com/dcf3mojai/image/upload/v1737749048/403534-security-suites-totalav-internet-security-10019614_xwy8i3.png",
      description: "Comprehensive security for personal and business use.",
    },
    {
      id: 9,
      name: "Avira",
      logo: "https://res.cloudinary.com/dcf3mojai/image/upload/v1738567802/Avira_logo_udx5be.svg",
      description: "AI-driven security with built-in VPN and system optimization.",
    },
    {
      id: 10,
      name: "BullGuard",
      logo: "https://res.cloudinary.com/dcf3mojai/image/upload/v1738567888/bullguard-logo_uerusx.png",
      description: "Triple-layered protection with an advanced firewall and Game Booster.",
    },
    {
      id: 11,
      name: "PC Matic",
      logo: "https://res.cloudinary.com/dcf3mojai/image/upload/v1738340692/pc_matic-logo_uossrg.png",
      description: "Whitelisting-based antivirus with automated PC optimization.",
    },
    {
      id: 12,
      name: "Trend Micro",
      logo: "https://res.cloudinary.com/dcf3mojai/image/upload/v1738567995/Trend_Micro_Logo_2023_adnhlu.png",
      description: "AI-powered malware protection with multi-layered security.",
    },
   
];


  return (
    <section className="brands-section">
      <div className="brands-header">
        <h2 className="brands-title">Trusted by Industry Leaders</h2>
        <p className="brands-description">
          Explore our partnerships with the world's most trusted cybersecurity brands.
        </p>
      </div>
      <div className="brands-grid">
        {brandLogos.map((brand) => (
          <div key={brand.id} className={`brand-card  ${brand.name}`}>
            <img src={brand.logo} alt={brand.name} className="brand-logo" />
            <h3 className="brand-name">{brand.name}</h3>
            <p className="brand-description">{brand.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Brands;
