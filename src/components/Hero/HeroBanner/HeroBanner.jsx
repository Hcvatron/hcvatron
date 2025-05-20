import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import './HeroBanner.css';

const HeroBanner = () => {
  const [mode, setMode] = useState('static');
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [carouselBanners, setCarouselBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const ref = doc(db, 'banner_settings', 'Hero');
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setMode(data.mode || 'static');
          setSelectedBanner(data.selectedBanner || null);
          setCarouselBanners(data.carouselBanners || []);
        }
      } catch (err) {
        console.error('Error fetching banner:', err);
      }
    };
    fetchBanner();
  }, []);

  useEffect(() => {
    if (mode === 'carousel' && carouselBanners.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % carouselBanners.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [carouselBanners, mode]);

  const goTo = (index) => setCurrentIndex(index);
  const next = () => setCurrentIndex((prev) => (prev + 1) % carouselBanners.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + carouselBanners.length) % carouselBanners.length);

  const currentBanner =
    mode === 'static'
      ? selectedBanner
      : carouselBanners.length > 0
      ? carouselBanners[currentIndex]
      : null;

  return (
    <div className="hero-banner-wrapper">
      {currentBanner ? (
        <>
          <div className="image-wrapper fade-slide">
            <img
              src={currentBanner.image}
              alt={currentBanner.name}
              className="hero-banner-image"
              key={currentBanner.image}
            />
          </div>

          {mode === 'carousel' && (
            <>
              <button className="nav-arrow left-arrow" onClick={prev}>❮</button>
              <button className="nav-arrow right-arrow" onClick={next}>❯</button>

              <div className="thumbnail-row">
                {carouselBanners.map((thumb, idx) => (
                  <img
                    key={idx}
                    src={thumb.image}
                    alt={thumb.name}
                    onClick={() => goTo(idx)}
                    className={`thumbnail ${idx === currentIndex ? 'active' : ''}`}
                  />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="hero-banner-placeholder">No banner to display</div>
      )}
    </div>
  );
};

export default HeroBanner;
