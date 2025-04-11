import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "./ParallaxBanner.css";

const ParallaxBanner = () => {
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "media"));
        const images = querySnapshot.docs.map((doc) => doc.data());

        // Find the image where category is 'parallax'
        const matchedImage = images.find((img) => img.category.toLowerCase() === "parallax");

        if (matchedImage) {
          setBackgroundImage(matchedImage.url);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div
      className="parallax-container"
      style={{
        backgroundImage: `url(${backgroundImage || "https://images.unsplash.com/photo-1606159068539-43f36b99d1b2?q=80&w=2059&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpg"})`,
      }}
    >
      <div className="parallax-content">
        <h1 className="parallax-title">Your Security, Reinvented</h1>
        <p className="parallax-description">
          Experience unparalleled protection with our innovative cybersecurity solutions. Stay safe, stay secure.
          Whether you're protecting your personal devices, securing your business, or safeguarding your family's online presence, we have you covered.
        </p>
        <p className="parallax-subdescription">
          Our cutting-edge technology ensures real-time threat detection, seamless performance, and unmatched privacy protection. Take the next step towards a safer digital future today.
        </p>
        <button className="parallax-button" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}>
          Explore Products
        </button>
      </div>
    </div>
  );
};

export default ParallaxBanner;
