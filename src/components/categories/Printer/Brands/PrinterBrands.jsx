import React from "react";
// import "./Brands.css";

const PrinterBrands = () => {
  const brandLogos = [
    {
      id: 1,
      name: "HP",
      logo: "https://res.cloudinary.com/dcf3mojai/image/upload/v1738937195/HP-Logo_jkkkni.png",
      description: "Reliable, high-performance printers with cutting-edge security and superior print quality for homes and businesses.",
    },
    {
      id: 2,
      name: "Canon",
      logo: "https://res.cloudinary.com/dcf3mojai/image/upload/v1738937079/Canon-Logo_ucilpk.png",
      description: "Exceptional printing technology with vivid colors and sharp details, ideal for professional and personal use.",
    },
    {
      id: 3,
      name: "Epson",
      logo: "https://res.cloudinary.com/dcf3mojai/image/upload/v1738937126/Epson-Logo_hjzall.png", 
      description: "EcoTank and Inkjet printers designed for efficiency, cost savings, and high-speed printing performance.",
    }
  ];

  return (
    <section className="brands-section">
      <div className="brands-header">
      <h2 className="brands-title">Trusted by Leading Printer Brands</h2>
        <p className="brands-description">
          Our products are trusted by top printer brands known for quality, performance, and reliability.
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

export default PrinterBrands;
