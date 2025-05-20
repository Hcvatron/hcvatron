import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./CarouselComponent.css";
import { useProduct } from '../../../context/ProductContext';
import { useLocalContext } from '../../../context/LocalContext';
import { useNavigate } from "react-router-dom";

const truncateText = (text) => {
  if (!text) return "";
  const firstStopIndex = text.indexOf(".");
  return firstStopIndex !== -1 ? text.substring(0, firstStopIndex + 1) : text;
};

const CarouselComponent = () => {
  const { products } = useProduct();
  const { webinfo } = useLocalContext();
  const navigate = useNavigate();

  // Collect first product from each category
  const slides = Object.values(products)
    .flatMap((category) => category[0] || [])
    .filter((slide) => slide && slide.name);

  return (
    <div className="carousel-container">
      <Carousel
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={4000}
        stopOnHover={true}
      >
        {slides.map((slide) => (
          <div className="carousel-slide" key={slide.id}>
            <div className="promo-content">
              <h2>{slide.name}</h2>
              <p>{truncateText(slide.desc)}</p>
              <h3 className="price">
                ${slide.discountedPrice} <span className="original-price">${slide.originalPrice}</span>
              </h3>
              <button className="carousel-btn" onClick={() => navigate(slide.route)}>Buy Now →</button>
              <p className="support-text">Need help? Call Support</p>
              <a className="support-link" href={`tel:${webinfo.phonecall}`}>
                {webinfo.phone}
              </a>
            </div>
            <div className="promo-img">
              <img src={slide.img || "default-image.jpg"} alt={slide.name} />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
